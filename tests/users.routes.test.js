import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

import app from "../src/app.js";
import UserModel from "../src/models/user.model.js";

describe('Users API', () => {
  let mongoServer;
  let createdUser;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
  
    await mongoose.connect(mongoServer.getUri());
  })
  
  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  })
  
  beforeEach(async () => {
    await UserModel.deleteMany({});

    createdUser = await UserModel.create({
      first_name: 'User',
      last_name: 'Test',
      email: 'test@example.com',
      password: '12345',
      role: 'user',
      pets: []
    })
  })

  describe('GET /api/users', () => {
    test('Should return all users', async () => {
      const response = await request(app).get('/api/users');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(Array.isArray(response.body.payload)).toBe(true);
      expect(response.body.payload.length).toBeGreaterThan(0);
    })
  })

  describe('GET /api/users/:uid', () => {    
    test('Should return an user by ID', async () => {
      const response = await request(app).get(`/api/users/${createdUser._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload._id).toBe(createdUser._id.toString());
    })

    test('Should return error 404 if user does not exists', async () => {
      const fakeUserId = new mongoose.Types.ObjectId();

      const response = await request(app).get(`/api/users/${fakeUserId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    })
  })

  describe('POST /api/users', () => {
    test('Should create a new user successfully', async () => {
      const userData = {
        first_name: 'Juan',
        last_name: 'Pérez',
        email: 'juan@test.com',
        password: '123456',
      }
      
      const response = await request(app).post('/api/users').send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.payload).toHaveProperty('_id');
      expect(response.body.payload.email).toBe(userData.email);
    })

    test('Should return error 400 when required fields are missing', async () => {
      const response = await request(app).post('/api/users').send({});
    
      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
    })

    test('Should return error 400 if email is already use', async () => {
      const response = await request(app).post('/api/users').send({
        first_name: 'Juan',
        last_name: 'Pérez',
        email: createdUser.email,
        password: '12345'
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
    })
  })

  describe('PUT /api/users/:uid', () => {
    test('Should update an user successfully', async () => {
      const response = await request(app).put(`/api/users/${createdUser._id}`).send({ first_name: 'UpdatedName' });

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload.first_name).toBe('UpdatedName');
    })

    test('Should return error 404 if user does not exists', async () => {
      const fakeUserId = new mongoose.Types.ObjectId();

      const response = await request(app).put(`/api/users/${fakeUserId}`).send({ first_name: 'UpdatedName' });

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    })

    test('Should return error 400 if email is already use', async () => {
      const secondUser = await UserModel.create({
        first_name: 'Martin',
        last_name: 'Gómez',
        email: 'martin@test.com',
        password: '12345'
      });

      const response = await request(app).put(`/api/users/${createdUser._id}`).send({ email: secondUser.email });

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
    })
  })

  describe('DELETE /api/users/:uid', () => {
    test('Should delete an user successfully', async () => {
      const response = await request(app).delete(`/api/users/${createdUser._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload._id).toBe(createdUser._id.toString());

      const deletedUser = await UserModel.findById(createdUser._id);
      expect(deletedUser).toBeNull();
    })

    test('Should return error 404 if user does not exists', async () => {
      const fakeUserId = new mongoose.Types.ObjectId();

      const response = await request(app).delete(`/api/users/${fakeUserId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    })
  })
})