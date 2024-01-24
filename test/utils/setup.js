const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

module.exports = async function setupTestEnvironment() {
  const mongod = new MongoMemoryServer();

  const mongoUri = await mongod.getUri();

  before(async () => {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  after(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });
};
