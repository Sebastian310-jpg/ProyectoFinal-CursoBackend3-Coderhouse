import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

import app from "../src/app.js";
import PetModel from "../src/models/pet.model.js";

describe('Pets API', () => {
  let mongoServer;
  let createdPet;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  })

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  })

  beforeEach(async () => {
    await PetModel.deleteMany({});

    createdPet = await PetModel.create({
      name: 'Firulais',
      specie: 'Dog',
      birthDate: new Date('2020-05-15'),
      adopted: false
    })
  })

  describe('GET /api/pets', () => {
    test('Should return all pets', async () => {
      const response = await request(app).get('/api/pets');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(Array.isArray(response.body.payload)).toBe(true);
    })
  })

  describe('GET /api/pets/:pid', () => {
    test('Should return a pet by ID', async () => {
      const response = await request(app).get(`/api/pets/${createdPet._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload._id).toBe(createdPet._id.toString());
    })

    test('Should return error 404 if pet does not exists', async () => {
      const fakePetId = new mongoose.Types.ObjectId();

      const response = await request(app).get(`/api/pets/${fakePetId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    })
  })

  describe('POST /api/pets', () => {
    test('Should create a new pet successfully', async () => {
      const petData = {
        name: 'Luna',
        specie: 'Cat',
        birthDate: new Date('2021-03-10'),
        adopted: false
      }

      const response = await request(app).post('/api/pets').send(petData);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.payload).toHaveProperty('_id');
      expect(response.body.payload.name).toBe(petData.name);
    })

    test('Should return error 400 when required fields are missing', async () => {
      const response = await request(app).post('/api/pets').send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
    })
  })

  describe('PUT /api/pets/:pid', () => {
    test('Should update a pet successfully', async () => {
      const response = await request(app).put(`/api/pets/${createdPet._id}`).send({  adopted: true });

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload._id).toBe(createdPet._id.toString());
      expect(response.body.payload.adopted).toBe(true);
    })

    test('Should return error 404 if pet does not exists', async () => {
      const fakePetId = new mongoose.Types.ObjectId();

      const response = await request(app).put(`/api/pets/${fakePetId}`).send({  adopted: true });

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    })
  })

  describe('DELETE /api/pets/:pid', () => {
    test('Should delete a pet successfully', async () => {
      const response = await request(app).delete(`/api/pets/${createdPet._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload._id).toBe(createdPet._id.toString());

      const deletedPet = await PetModel.findById(createdPet._id);
      expect(deletedPet).toBeNull();
    })

    test('Should return error 404 if pet does not exists', async () => {
      const fakePetId = new mongoose.Types.ObjectId();

      const response = await request(app).delete(`/api/pets/${fakePetId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    })
  })
})