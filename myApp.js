require("dotenv").config();

////////// (1) Install and setup Mongoose.
// Mongoose is a JS library for creating connections between
// MongoDB and Node.js
// Use Mongoose to connect to my MongoDB Cloud Atlas cluster
// with a user (user and cluster info in .env file). I'm using
// same user and cluster as my Flask/Python microblog project.
// Note: Flask/Python had variable name MONGODB_URI, here,
// using Express/JS, the enviornment variable is called MONGO_URI
const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URI);
// Also give the database name to prevent deprication errors
mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    console.log("database connected.");
}).catch((err) => console.log(err.message));

////////// (2) Create a "Person" Model
// Mongoose schema is assigned to a variable ("Schema")
const { Schema } = mongoose;
// Creating a Person Schema via Mongoose Library
const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

// (3) Create and save a Person
// Creating the Person model from the schema
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
    const person = new Person({ name: "S Fraser", age: 101, favoriteFoods: ["Pizza", "Ice Cream"] });
    person.save(function (err, data) {
        if (err) return console.error(err);
        done(null, data);
    });
};

// (4) Create many people with Model.create()
let arrayOfPeople = [
    { name: "Picard", age: 56, favoriteFoods: ["Early Grey"] },
    { name: "Spock", age: 34, favoriteFoods: ["Vegggies"] },
    { name: "Worf", age: 32, favoriteFoods: ["Steak"] }
];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, function (err, people) {
        if (err) return console.log(err);
        done(null, people);
    });
};

////////// (5) Use Model.find to search my database
const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, function (err, personFound) {
        if (err) return console.log(err);
        done(null, personFound);
    });
};

//--------------------------------------------------
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
