const request = require('supertest');
const express = require('express');
const router = require('../routes/user');
const userController = require('../controllers/user');
const { ObjectId } = require('mongodb');

jest.mock('../controllers/user')
jest.mock('../middleware/authenticate', () => ({
    isAuthenticated: (req, res, next) => next(),
}))

const app = express()
app.use(express.json())
    .use('/user', router)

describe('Users Routes', () => {
    describe('GET /user', () => {
        test('Should fetch all users', async () => {
            const mockUsers = [
                {
                    _id: "65cea2470535c115e666444c",
                    email: "any@any.com",
                    fullName: "Jane Doe",
                    birthDate: "1970-12 - 11T00:00:00.000 +00:00",
                    address: "any address",
                    biography: "any biography",
                    isAuthor: false,
                    createdAt: "2024-02 - 15T23: 46: 15.280+00:00"
                },
                {
                    _id: "65cea2470535c115e666444c",
                    email: "any@any.com",
                    fullName: "John Phil Doe",
                    birthDate: "1970-12 - 11T00:00:00.000 +00:00",
                    address: "any address",
                    biography: "any biography",
                    isAuthor: false,
                    createdAt: "2024-02 - 15T23: 46: 15.280+00:00"
                },
            ]
            userController.getAllUsers.mockImplementation((req, res) => {
                res.status(200).json(mockUsers)
            })

            const response = await request(app).get('/user')
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(mockUsers)
        })
    })

    describe('GET /author/:_id', () => {
        test('Should fetch one user', async () => {
            const mockUser = {
                _id: "65cea2470535c115e666444c",
                email: "any@any.com",
                fullName: "John Phil Doe",
                birthDate: "1970-12 - 11T00:00:00.000 +00:00",
                address: "any address",
                biography: "any biography",
                isAuthor: false,
                createdAt: "2024-02 - 15T23: 46: 15.280+00:00"
            }
            userController.getSingleUser.mockImplementation((req, res) => res.status(200).json(mockUser));

            const userId = '65cea3e097154d2b57a8aa21';
            const response = await request(app).get(`/user/${userId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockUser);
        });
    })
    describe('POST /user', () => {
        const data = {
            email: "ubuntu@gmail.com",
            fullName: "Charles Logan",
            birthDate: "1980-01-01",
            address: "new address",
            biography: "new biography",
        };

        test('Should create a new user with valid data', async () => {
            userController.createUser.mockImplementation((req, res) => {
                return res.status(201).json({ ...data });
            });

            const response = await request(app).post('/user').send(data);
            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual({ ...data });
        });        
    });

    describe('PUT /user/:_id', () => {
        const validData = {
            _id: "65cea25a0535c115e666444e",
            email: "ubuntu@gmail.com",
            fullName: "Charles Logan",
            birthDate: "1980-01-01",
            address: "new address",
            biography: "new biography",
        };

        test('Should update a user with valid data', async () => {
            userController.updateUser.mockImplementation((req, res) => {
                return res.status(200).json({ ...validData });
            });

            const response = await request(app).put(`/user/${validData._id}`).send(validData);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ ...validData });
        });

        test('Should not update if user not found', async () => {
            const userId = '65cea25a0535c115e612444e';

            userController.updateUser.mockImplementation((req, res) => {
                return res.status(404).json({ error: "User not found" });
            });

            const response = await request(app).put(`/user/${userId}`).send(validData);
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe('User not found');
        });

    });

    describe('DELETE /user/:_id', () => {
        test('Should delete a user with a valid _id', async () => {
            const userId = '65cea25a0535c115e666444e';
            userController.deleteUser.mockImplementation((req, res) => {
                return res.status(200).json({ message: 'User deleted successfully' });
            });

            const response = await request(app).delete(`/user/${userId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toEqual('User deleted successfully');
        });

        test('Should not delete if user not found', async () => {
            const userId = '65cea3e097154d2b57a8aa21';

            userController.deleteUser.mockImplementation((req, res) => {
                return res.status(404).json({ error: 'User not found' });
            });

            const response = await request(app).delete(`/user/${userId}`);
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe('User not found');
        })
    })
})