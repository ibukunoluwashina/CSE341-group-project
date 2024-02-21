const request = require('supertest');
const express = require('express');
const router = require('../routes/genre');
const genreController = require('../controllers/genre');
const { ObjectId } = require('mongodb');

jest.mock('../controllers/genre')
jest.mock('../middleware/authenticate', () => ({
    isAuthenticated: (req, res, next) => next(),
}))

const app = express()
app.use(express.json())
    .use('/genre', router)

describe('Genres Routes', () => {
    describe('GET /genre', () => {
        test('Should fetch all genres', async () => {
            const mockGenres = [
                {
                    _id: "65cea55297154d2b57a8aa24",
                    name: "any genre",
                    description: "any description",
                    createdAt: "2024-02 - 15T23: 59: 14.115+00:00",
                },
                {
                    _id: "65cea55297154d2b57a8aa24",
                    name: "any genre 2",
                    description: "any description 2",
                    createdAt: "2024-02 - 15T23: 59: 14.115+00:00",
                },
            ]
            genreController.getAllGenres.mockImplementation((req, res) => {
                res.status(200).json(mockGenres)
            })

            const response = await request(app).get('/genre')
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(mockGenres)
        })
    })

    describe('GET /genre/:_id', () => {
        test('Should fetch one genre', async () => {
            const mockGenre = {
                _id: "65cea55297154d2b57a8aa24",
                name: "any genre",
                description: "any description",
                createdAt: "2024-02 - 15T23: 59: 14.115+00:00",
            }
            genreController.getSingleGenre.mockImplementation((req, res) => res.status(200).json(mockGenre));

            const genreId = '65cea66ce6964febb18012d4';
            const response = await request(app).get(`/genre/${genreId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockGenre);
        });
    })
    describe('POST /genre', () => {
        const data = {
            name: "any genre",
            description: "any description",
        };

        test('Should create a new genre with valid data', async () => {
            genreController.createGenre.mockImplementation((req, res) => {
                return res.status(201).json({ ...data });
            });

            const response = await request(app).post('/genre').send(data);
            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual({ ...data });
        });
    });

    describe('PUT /genre/:_id', () => {
        const validData = {
            _id: "65cea66ce6964febb18012d4",
            name: "any genre",
            description: "any description",            
        };

        test('Should update a genre with valid data', async () => {
            genreController.updateGenre.mockImplementation((req, res) => {
                return res.status(200).json({ ...validData });
            });

            const response = await request(app).put(`/genre/${validData._id}`).send(validData);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ ...validData });
        });

        test('Should not update if genre not found', async () => {
            const genreId = '65cea66ce6964febb18012d4';

            genreController.updateGenre.mockImplementation((req, res) => {
                return res.status(404).json({ error: "Genre not found" });
            });

            const response = await request(app).put(`/genre/${genreId}`).send(validData);
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe('Genre not found');
        });

    });

    describe('DELETE /genre/:_id', () => {
        test('Should delete a genre with a valid _id', async () => {
            const genreId = '65cea66ce6964febb18012d4';
            genreController.deleteGenre.mockImplementation((req, res) => {
                return res.status(200).json({ message: 'Genre deleted successfully' });
            });

            const response = await request(app).delete(`/genre/${genreId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toEqual('Genre deleted successfully');
        });

        test('Should not delete if genre not found', async () => {
            const genreId = '65cea3e097154d2b57a8aa21';

            genreController.deleteGenre.mockImplementation((req, res) => {
                return res.status(404).json({ error: 'Genre not found' });
            });

            const response = await request(app).delete(`/genre/${genreId}`);
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe('Genre not found');
        })
    })
})