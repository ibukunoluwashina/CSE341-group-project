const request = require('supertest');
const express = require('express');
const router = require('../routes/book');
const bookController = require('../controllers/book');
const { ObjectId } = require('mongodb');

jest.mock('../controllers/book')
jest.mock('../middleware/authenticate', () => ({
    isAuthenticated: (req, res, next) => next(),
}))

const app = express()
app.use(express.json())
    .use('/book', router)

describe('Books Routes', () => {
    describe('GET /book', () => {
        test('Should fetch all books', async () => {
            const mockBooks = [
                {
                    _id: "65cea66ce6964febb18012d4",
                    title: "any book",
                    authorId: "65cea3e097154d2b57a8aa21", genreId: "65cea55297154d2b57a8aa24", publicationYear: 2009,
                    isbn: "anyisbn",
                    isAvailable: true,
                    createdAt: "2024-02 - 16T00:03: 56.665+00:00"
                },
                {
                    _id: "65cea66ce6964febb18012d4",
                    title: "any book",
                    authorId: "65cea3e097154d2b57a8aa21", genreId: "65cea55297154d2b57a8aa24", publicationYear: 2010,
                    isbn: "anyisbn",
                    isAvailable: true,
                    createdAt: "2024-02 - 16T00:03: 56.665+00:00"
                },
            ]
            bookController.getAllBooks.mockImplementation((req, res) => {
                res.status(200).json(mockBooks)
            })

            const response = await request(app).get('/book')
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(mockBooks)
        })
    })

    describe('GET /author/:_id', () => {
        test('Should fetch one book', async () => {
            const mockBook = {
                _id: "65cea66ce6964febb18012d4",
                title: "any book",
                authorId: "65cea3e097154d2b57a8aa21", genreId: "65cea55297154d2b57a8aa24", publicationYear: 2010,
                isbn: "anyisbn",
                isAvailable: true,
                createdAt: "2024-02 - 16T00:03: 56.665+00:00"
            }
            bookController.getSingleBook.mockImplementation((req, res) => res.status(200).json(mockBook));

            const bookId = '65cea66ce6964febb18012d4';
            const response = await request(app).get(`/book/${bookId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockBook);
        });
    })
    describe('POST /book', () => {
        const data = {
            title: "any book",
            authorId: "65cea3e097154d2b57a8aa21",
            genreId: "65cea55297154d2b57a8aa24", publicationYear: 2010,
            isbn: "anyisbn",
            isAvailable: false,
        };

        test('Should create a new book with valid data', async () => {
            bookController.createBook.mockImplementation((req, res) => {
                return res.status(201).json({ ...data });
            });

            const response = await request(app).post('/book').send(data);
            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual({ ...data });
        });
    });

    describe('PUT /book/:_id', () => {
        const validData = {
            _id: "65cea66ce6964febb18012d4",
            title: "any book",
            authorId: "65cea3e097154d2b57a8aa21",
            genreId: "65cea55297154d2b57a8aa24", publicationYear: 2010,
            isbn: "anyisbn",
            isAvailable: false,
        };

        test('Should update a book with valid data', async () => {
            bookController.updateBook.mockImplementation((req, res) => {
                return res.status(200).json({ ...validData });
            });

            const response = await request(app).put(`/book/${validData._id}`).send(validData);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ ...validData });
        });

        test('Should not update if book not found', async () => {
            const bookId = '65cea66ce6964febb18012d4';

            bookController.updateBook.mockImplementation((req, res) => {
                return res.status(404).json({ error: "Book not found" });
            });

            const response = await request(app).put(`/book/${bookId}`).send(validData);
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe('Book not found');
        });

    });

    describe('DELETE /book/:_id', () => {
        test('Should delete a book with a valid _id', async () => {
            const bookId = '65cea66ce6964febb18012d4';
            bookController.deleteBook.mockImplementation((req, res) => {
                return res.status(200).json({ message: 'Book deleted successfully' });
            });

            const response = await request(app).delete(`/book/${bookId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toEqual('Book deleted successfully');
        });

        test('Should not delete if book not found', async () => {
            const bookId = '65cea3e097154d2b57a8aa21';

            bookController.deleteBook.mockImplementation((req, res) => {
                return res.status(404).json({ error: 'Book not found' });
            });

            const response = await request(app).delete(`/book/${bookId}`);
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe('Book not found');
        })
    })
})