require("dotenv").config();

// Mongoose is a JS library for creating connections between
// MongoDB and Node.js
// Use Mongoose to connect to my MongoDB Cloud Atlas cluster
// with a user (user and cluster info in .env file). I'm using
// same user and cluster as my Flask/Python microblog project.
// Note: Flask/Python had variable name MONGODB_URI, here,
// using Express/JS, the enviornment variable is called MONGO_URI
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

// Mongoose schema is assigned to a variable ("Schema")
const { Schema } = mongoose;
// Creating a Person Schema via Mongoose Library
const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

// Creating the Person model from the schema
const Person = mongoose.model("Person", personSchema);



const createAndSavePerson = (done) => {
    done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
    done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
    done(null /*, data*/);
};

const findOneByFood = (food, done) => {
    done(null /*, data*/);
};

const findPersonById = (personId, done) => {
    done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";

    done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    done(null /*, data*/);
};

const removeById = (personId, done) => {
    done(null /*, data*/);
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    done(null /*, data*/);
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    done(null /*, data*/);
};

/** 1) Install & Set up mongoose */
// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URI);

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
