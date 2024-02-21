const request = require('supertest');
const express = require('express');
const router = require('../routes/author');
const authorController = require('../controllers/author');
const { ObjectId } = require('mongodb');

jest.mock('../controllers/author')
jest.mock('../middleware/authenticate', () => ({
    isAuthenticated: (req, res, next) => next(),
}))

const app = express()
app.use(express.json())
    .use('/author', router)

describe('Authors Routes', () => {
    describe('GET /author', () => {
        test('Should fetch all authors', async () => {
            const mockAuthors = [
                {
                    _id: "65cea3e097154d2b57a8aa21",
                    userId: "65cea25a0535c115e666444e",
                    booksPublished: 10,
                    createdAt: "2024-02 - 15T23: 53:04.486 +00:00"
                },
                {
                    _id: "65cea3e097154d2b57a8aa22",
                    userId: "65cea25a0535c115e666444e",
                    booksPublished: 10,
                    createdAt: "2024-02 - 15T23: 53:04.486 +00:00"
                },
            ]
            authorController.getAllAuthors.mockImplementation((req, res) => {
                res.status(200).json(mockAuthors)
            })

            const response = await request(app).get('/author')
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(mockAuthors)
        })
    })

    describe('GET /author/:_id', () => {
        test('Should fetch one author', async () => {
            const mockAuthor = {
                _id: "65cea3e097154d2b57a8aa21",
                userId: "65cea25a0535c115e666444e",
                booksPublished: 10,
                createdAt: "2024-02 - 15T23: 53:04.486 +00:00"
            }
            authorController.getSingleAuthor.mockImplementation((req, res) => res.status(200).json(mockAuthor));

            const authorId = '65cea3e097154d2b57a8aa21';
            const response = await request(app).get(`/author/${authorId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockAuthor);
        });
    })
    describe('POST /author', () => {
        const data = {
            userId: "65cea25a0535c115e666444e",
            booksPublished: 14,
        };

        test('Should create a new author with valid data', async () => {
            authorController.creatAuthor.mockImplementation((req, res) => {
                return res.status(201).json({ ...data });
            });

            const response = await request(app).post('/author').send(data);
            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual({ ...data });
        });

        test('Should not create an author with invalid user id', async () => {
            const invalidAuthorData = { ...data, userId: "65cea2" };

            authorController.creatAuthor.mockImplementation((req, res) => {
                return res.status(400).json({ error: 'Invalid User ID' });
            });

            const response = await request(app).post('/author').send(invalidAuthorData);
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe('Invalid User ID');
        });
    });

    describe('PUT /author/:_id', () => {
        const validData = {
            _id: "65cea3e097154d2b57a8aa21",
            userId: "65cea25a0535c115e666444e",
            booksPublished: 24,
        };        

        test('Should update an author with valid data', async () => {            
            authorController.updateAuthor.mockImplementation((req, res) => {
                return res.status(200).json({ ...validData });
            });

            const response = await request(app).put(`/author/${validData._id}`).send(validData);            
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ ...validData });
        });        

        test('Should not update if author not found', async () => {
            const authorId = '65cea25a0535c115e612444e';

            authorController.updateAuthor.mockImplementation((req, res) => {
                return res.status(404).json({ error: "Author not found" });
            });

            const response = await request(app).put(`/author/${authorId}`).send(validData);
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe('Author not found');
        });

    });

    describe('DELETE /author/:_id', () => {
        test('Should delete an author with a valid _id', async () => {
            const authorId = '65cea25a0535c115e666444e';
            authorController.deleteAuthor.mockImplementation((req, res) => {
                return res.status(200).json({ message: 'Author deleted successfully' });
            });

            const response = await request(app).delete(`/author/${authorId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toEqual('Author deleted successfully');
        });

        test('Should not delete if author not found', async () => {
            const authorId = '65cea3e097154d2b57a8aa21';

            authorController.deleteAuthor.mockImplementation((req, res) => {
                return res.status(404).json({ error: 'Author not found' });
            });

            const response = await request(app).delete(`/author/${authorId}`);
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe('Author not found');
        })
    })
})