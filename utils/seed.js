const connection = require('../config/connection')
const User = require('../models/User');
const Thought = require('../models/Thought'); 
const { getRandomName, getRandomComments, getRandomPost, genRandomIndex } = require('./data');


const db = connection

const seedDatabase = async () => {
  try {
    console.log('Connected to MongoDB');

    // Clear existing data (optional, use with caution in a development environment)
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Seed users
    const users = Array.from({ length: 10 }, () => ({
      username: getRandomName(),
      email: `${getRandomName().toLowerCase().replace(/\s/g, '')}@example.com`,
    }));
    const seededUsers = await User.insertMany(users);

    // Seed thoughts with random comments
    const thoughts = Array.from({ length: 20 }, () => ({
      thoughtText: getRandomPost(15),
      username: getRandomArrItem(seededUsers).username,
      reactions:  getRandomComments(3),
    }));
    await Thought.insertMany(thoughts);

    console.log('Database seeded successfully');
    console.table(users)
    console.table(thoughts)
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0)
  }
};

const getRandomArrItem = (arr) => arr[genRandomIndex(arr)];

db.once('open', seedDatabase);

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
