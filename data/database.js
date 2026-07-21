const { MongoClient } = require('mongodb');

let database;

const initDb = async () => {
  if (database) {
    return database;
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    database = client.db('personal_library');
    console.log('Connected successfully to MongoDB');
    return database;
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
    throw error;
  }
};

const getDb = () => {
  if (!database) {
    throw new Error('Database has not been initialized');
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};