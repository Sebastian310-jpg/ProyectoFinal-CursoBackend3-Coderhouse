import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

import app from "../src/app.js";

import UserModel from "../src/models/user.model.js";
import PetModel from "../src/models/pet.model.js";
import AdoptionModel from "../src/models/adoption.model.js";

describe('Adoptions API', () => {
  let mongoServer;
  let testUser;
  let testPet;
  let createdAdoption;

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
    await PetModel.deleteMany({});
    await AdoptionModel.deleteMany({});

    testUser = await UserModel.create({
      first_name: 'Juan',
      last_name: 'Pérez',
      email: 'juan@test.com',
      password: '123456',
      role: 'user',
      pets: []
    })

    testPet = await PetModel.create({
      name: 'Firulais',
      specie: 'Dog',
      birthDate: new Date('2020-05-15'),
      adopted: false
    });
  })

  describe('GET /api/adoptions', () => {
    test('Should return all adoptions', async () => {
      const response = await request(app).get('/api/adoptions');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(Array.isArray(response.body.payload)).toBe(true);
    })
  })

  describe('GET /api/adoptions/:aid', () => {
    beforeEach(async () => {
      createdAdoption = await AdoptionModel.create({
        owner: testUser._id,
        pet: testPet._id
      });
    })

    test('Should return an adoption by ID', async () => {
      const response = await request(app).get(`/api/adoptions/${createdAdoption._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload._id).toBe(createdAdoption._id.toString());
    })

    test('Should return error 404 if adoption does not exists', async () => {
      const fakeAdoptionId = new mongoose.Types.ObjectId();

      const response = await request(app).get(`/api/adoptions/${fakeAdoptionId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    })
  })

  describe('POST /api/adoptions', () => {
    test('Should create a new adoption successfully', async () => {
      const adoptionData = {
        owner: testUser._id.toString(),
        pet: testPet._id.toString()
      }

      const response = await request(app).post('/api/adoptions').send(adoptionData);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.payload).toHaveProperty('_id');

      createdAdoption = response.body.payload;

      const updatedPet = await PetModel.findById(testPet._id);
      expect(updatedPet.adopted).toBe(true);

      const updatedUser = await UserModel.findById(testUser._id);
      expect(updatedUser.pets).toHaveLength(1);
    })

    test('Should return error 404 if user does not exists', async () => {
      const fakeUserId = new mongoose.Types.ObjectId();

      const response = await request(app).post('/api/adoptions').send({ owner: fakeUserId, pet: testPet._id.toString() });

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    })

    test('Should return error 404 if pet does not exists', async () => {
      const fakePetId = new mongoose.Types.ObjectId();

      const response = await request(app).post('/api/adoptions').send({ owner: testUser._id.toString(), pet: fakePetId });

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    })

    test('Should return error 400 if pet is already adopted', async () => {
      await PetModel.findByIdAndUpdate(testPet._id, { adopted: true });

      const response = await request(app).post('/api/adoptions').send({ owner: testUser._id.toString(), pet: testPet._id.toString() });

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
    })

    test('Should return error 400 when required fields are missing', async () => {
      const response = await request(app).post('/api/adoptions').send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
    });
  })

  describe('DELETE /api/adoptions/:aid', () => {
    beforeEach(async () => {
      createdAdoption = await AdoptionModel.create({
        owner: testUser._id,
        pet: testPet._id
      });

      await UserModel.findByIdAndUpdate(testUser._id, { $push: { pets: testPet._id } });

      await PetModel.findByIdAndUpdate(testPet._id, { adopted: true });
    });

    test('Should delete an adoption successfully', async () => {
      const response = await request(app).delete(`/api/adoptions/${createdAdoption._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');

      const deletedAdoption = await AdoptionModel.findById(createdAdoption._id);
      expect(deletedAdoption).toBeNull();

      const updatedPet = await PetModel.findById(testPet._id);
      expect(updatedPet.adopted).toBe(false);

      const updatedUser = await UserModel.findById(testUser._id);
      expect(updatedUser.pets).toHaveLength(0);
    })

    test('Should return error 404 if adoption does not exists', async () => {
      const fakeAdoptionId = new mongoose.Types.ObjectId();

      const response = await request(app).delete(`/api/adoptions/${fakeAdoptionId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    })
  })
})