// test/utils/setup.js
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

export default async function setupTestEnvironment() {
  const mongod = new MongoMemoryServer();

  const mongoUri = await mongod.getUri();

  before(async () => {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  after(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });
}