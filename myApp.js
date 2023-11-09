// ----- Why Mongoose?
// By default, MongoDB has a flexible data model. This makes MongoDB databases
// very easy to alter and update in the future. But devs are accustomed to having rigid schemas.
// Mongoose forces a semi-rigid schema from the beginning. With Mongoose, devs must 
// define a Schema and Model.
// ---- What is a schema?
// A schema defines the structure of your collection documents. A Mongoose schema maps
// directly to a MongoDB collection.
// ----- What is a model?
// Models take your schema and apply it to each document in its collection.
// Models are responsible for all document interactions (CRUD).

// MongoDB collection ~= table in SQL
// MongoDB document ~= record/row in SQL
// MongoDB field ~= field/column in SQL

require("dotenv").config();


//(1) INSTALL AND SETUP MONGOOSE via requiring moongoose.
// Also need to create a .env file and add a MONGO_URI variable to it.
// Then, connect to the MongoDB described in .env MONGO_URI without
// depricated warnings. The name of the database is [fruitsDB]
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("database connected.");
}).catch((err) => console.log(err.message));


//(2) CREATE A MODEL: First of all, we need a Schema. Each schema maps to a MongoDB collection. It defines the shape of the documents within that collection. Schemas are building blocks for Models. They can be nested to create complex models, but in this case, we'll keep things simple. A model allows you to create instances of your objects, called documents.
// Replit is a real server, and in real servers, the interactions with the database happen in handler functions. These functions are executed when some event happens (e.g. someone hits an endpoint on your API).
// The DONE() function is a callback that tells us that we can PROCEED AFTER COMPLETING AN ASYNCHRONOUS OPERATION such as inserting, searching, updating, or deleting (CRUD). It's following the Node convention, and should be called as done(null, data) on success, or done(err) on error.
// A mongoose schema defines the structure (shape) of the document (fields/schemaType ~= keys/values), the structure is determined by the fields/schemaType that make up the document.
// A mongoose model wraps around the mongoose schema. The mongoose schema is compiled into a mongoose model. The mongoose model is an interface MongoDB to perform CRUD on records withing the database.
// Creating a moongoose model is made up of three parts:
//    1. Reference Mongoose
//    2. Define Schema (ie: define the document properties, fields/schemaTypes ~= key/values ~= cols/rows)
//    3. Export/Compile Model (model constructor on the Mongoose instance and pass it the name of the
//       collection and a reference to the schema definition)
//    
//     i. let mongoose = require('mongoose');
//    ii. let emailSchema = new mongoose.Schema({
//            email: String
//        });
//    iii. module.exports = mongoose.model('Email', emailSchema);

// Define mongoose schema for a person
let personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: Number,
    favoriteFoods: [String],
});

// Export/Compile the person schema into a mongoose Person model which can instantiate documents in this app 
// An important note: the first argument passed to the model should be the singular form of your collection name. Mongoose automatically changes this to the plural form, transforms it to lowercase, and uses that for the database collection name.
let Person = mongoose.model("Person", personSchema);


//(3) CREATE AND SAVE A RECORD OF A MODEL: create a document instance using the Person model constructor built before. Pass to the constructor an object having the fields name, age, and favoriteFoods. Then, call the method document.save() on the returned document instance. Pass to it a callback using the Node convention. This is a common pattern; all the following CRUD methods take a callback function like this as the last argument. 
const createAndSavePerson = (done) => {
    // Create a new Person document from the Person Mongoose model
    const person = new Person({ 
        name: "S Fraser", 
        age: 102,
        favoriteFoods: ["Pizza", "Ice Cream"]
    });
    // save() in Mongoose will now save the person document into a Persons (plural)
    // collection inside the DB we've connected to
    person.save((err, data) => {
        if (err) return console.error(err);
        // Node convention (and a common pattern), ALL the following CRUD methods take a callback function like this as the last argument.
        done(null, data);
    });
};

// Call the create and save person function. Print to console (as well as updating MongoDB)
console.log("Creating and saving a single person (myself!)...");
createAndSavePerson((err, data) => {
    if (err) { console.error(err); } console.log(data);
});


//(4) CREATE MANY RECORDS WITH MODEL.CREATE(): Create Many Records with model.create(). Model.create() takes an array of objects like [{name: 'John', ...}, {...}, ...] as the first argument, and saves them all in the db
let arrayOfPeople = [
    { name: "Picard", age: 56, favoriteFoods: ["Earl Grey"] },
    { name: "Spock", age: 34, favoriteFoods: ["Veggies"] },
    { name: "Worf", age: 32, favoriteFoods: ["Wriggly Gagh"] },
];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
        if (err) return console.log(err);
        done(null, people);
    });
};

// Call create many people function. Print to console (as well as updating MongoDB)
console.log("Create many people via array...");
createManyPeople(arrayOfPeople, (err, data) => {
    if (err) { console.log(err); } console.log(data);
});





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
