require("dotenv").config();

////////// Mongoose
// Mongoose is a JS library for creating connections between
// MongoDB and Node.js
// Use Mongoose to connect to my MongoDB Cloud Atlas cluster
// (user and cluster info in .env file). I'm using same user
// and cluster as my Flask/Python microblog project (but a different
// database name)
// Note: Flask/Python had variable name MONGODB_URI, here,
// using Express/JS, the enviornment variable is called MONGO_URI
//
// MongoDB collection ~= table in SQL
// MongoDB document ~= record/row in SQL

////////// (1) Install and setup Mongoose.
const mongoose = require("mongoose");

// Connect to MongoDB described in .env MONGO_URI without
// depricated warnings. The name of the database is [fruitsDB]
mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    console.log("database connected.");
}).catch((err) => console.log(err.message));

//////////////////// Fruits test START
// Quickstart:
// (i) Connect to MongoDB cluster / database [fruitsDB], connect via MONGO_URI
// (ii) Create a schema, shape of document / "row", [fruitSchema]
// (iii) Create a model object [Fruit] from the schema (create document / "row")
//     Mongoose will, behind the scences, create a collection / "table" in the
//     database based on the model's name [fruitsDB/fruits].
// (iv) Use the model object to instantiate our document / "row" instances [fruit]
// (v) Save our document into the collection [fruit.save()]

// (ii) Create a fruit schema
// The schema defines the shape of the document ("row")
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

// (iii) Compile the schema into a model, and simultaneously,
// behind the scenes, create a collection (table) called
// [fruits] in our database [fruitsDB]
//
// NB: For the collection name, Mongoose will automatically
// pluralise it and make it lower-case in the actual MongoDB
// database (ie: "Fruit" -> "fruits" giving "fruitsDB/fruits")
// It's allowing us to work with the singular form here but
// behind the scences, in the actual database [fruitsDB], it
// makes the collection name plural
const Fruit = mongoose.model("Fruit", fruitSchema);

// (iv) A fruit (using the model object to instantiate a document (row))
const fruit = new Fruit ({
    name: "Apple",
    rating: 7,
    review: "Crunchy and juicy"
});

// (v) Saving the fruit document (row) into the
// fruits collection (table) in the fruitsDB
// Use MongoDB Cloud Atlas or MongDB Compass
// to view the database, collection and documents.
fruit.save();
//////////////////// Fruits test END

////////// (2) Create a "Person" Model (A Mongoose model)
// Creating a Person Schema via Mongoose Library
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

// (3) Create and save a Person
// Creating the Person model (Mongoose Model) from the schema
// Will create a new collection called Persons (Mongoose will pluralise it)
// adhering to personSchema
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
    // Create a new Person document from the Person Mongoose model
    const person = new Person({ name: "S Fraser", age: 101, favoriteFoods: ["Pizza", "Ice Cream"] });
    // save() in Mongoose will now save the person document into a Persons (plural)
    // collection inside the DB we've connectred to
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

////////// (5) Use Model.find() to search my database
const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, function (err, personFound) {
        if (err) return console.log(err);
        done(null, personFound);
    });
};

////////// (6) Use Model.findOne() to return a single matching document
const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
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
