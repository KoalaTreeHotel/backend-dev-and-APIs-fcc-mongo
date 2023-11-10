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
}).catch((err) => console.error(err.message));


//(2) CREATE A MODEL: First of all, we need a Schema. Each schema maps to a MongoDB collection. It defines the shape of the documents within that collection. Schemas are building blocks for Models. They can be nested to create complex models, but in this case, we'll keep things simple. A model allows you to create instances of your objects, called documents.
// Replit is a real server, and in real servers, the interactions with the database happen in handler functions. These functions are executed when some event happens (e.g. someone hits an endpoint on your API).
// The DONE() function is a callback that tells us that we can PROCEED AFTER COMPLETING AN ASYNCHRONOUS OPERATION such as inserting, searching, updating, or deleting (CRUD). It's following the Node convention, and should be called as done(null, data) on success, or done(err) on error.
// A mongoose schema defines the structure (shape) of the document (fields/schemaType ~= keys/values), the structure is determined by the fields/schemaType that make up the document.
// A mongoose model wraps around the mongoose schema. The mongoose schema is compiled into a mongoose model. The mongoose model is an interface MongoDB to perform CRUD on records withing the database.
// A mongoose model is used in our JS code to interact with the mongodb database
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
/*
// Call the create and save person function. Print to console (as well as updating MongoDB)
console.log("Creating and saving a single person (myself!)...");
createAndSavePerson((err, data) => {
    if (err) { return console.error(err); } console.log(data);
});
*/


//(4) CREATE MANY RECORDS WITH MODEL.CREATE(): Create Many Records with model.create(). Model.create() takes an array of objects like [{name: 'John', ...}, {...}, ...] as the first argument, and saves them all in the db
let arrayOfPeople = [
    { name: "Picard", age: 56, favoriteFoods: ["Earl Grey Tea"] },
    { name: "Spock", age: 34, favoriteFoods: ["Knowledge"] },
    { name: "Worf", age: 32, favoriteFoods: ["Wriggly Gagh"] },
];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
        if (err) return console.error(err);
        done(null, people);
    });
};
/*
// Call create many people function. Print to console (as well as updating MongoDB)
console.log("Create many people via array...");
createManyPeople(arrayOfPeople, (err, data) => {
    if (err) { return console.log(err); } console.log(data);
});
*/

//(5) USE MODEL.FIND() TO SEARCH YOUR DATABASE: In its simplest usage, Model.find() accepts a query document (a JSON object) as the first argument, then a callback. It returns an array of matches. It supports an extremely wide range of search options. 
// Distinct creation of callback function
const findPeopleByName = function(personName, cbFunc) {
    Person.find({name: personName,}, cbFunc);
};

const myDoneCallback = function(err, data) {
    if(err) { 
        return console.error(err);
    }
    console.log(data);
};
/*
console.log("Find people by name...");
findPeopleByName("Spock", myDoneCallback);
*/


//(6) USE MODEL.FINDONE() TO RETURN A SINGLE MATCHING DOCUMENT FROM YOUR DATABASE: Model.findOne() behaves like Model.find(), but it returns only one document (not an array), even if there are multiple items. It is especially useful when searching by properties that you have declared as unique
const findOneByFood = (food, cbFunc) => {
    Person.findOne({ favoriteFoods: food, }, cbFunc);
};
/*
console.log("Find one by food...");
findOneByFood("Earl Grey Hot", myDoneCallback);
*/


//(7) USE MODEL.FINDBYID() TO SEARCH YOUR DATABASE BY _ID: When saving a document, MongoDB automatically adds the field _id, and set it to a unique alphanumeric key. Searching by _id is an extremely frequent operation, so Mongoose provides a dedicated method for it.
const findPersonById = (personId, cbFunc) => {
    Person.findById(personId, cbFunc);
};
/*
console.log("find person by ID...");
findPersonById("64b1894ec2c01f40a854e723", myDoneCallback);
*/


//(8) PERFORM CLASSIC UPDATES BY RUNNING FIND, EDIT, THEN SAVE: In the good old days, this was what you needed to do if you wanted to edit a document, and be able to use it somehow (e.g. sending it back in a server response). Mongoose has a dedicated updating method: Model.update(). It is bound to the low-level mongo driver. It can bulk-edit many documents matching certain criteria, but it doesn’t send back the updated document, only a 'status' message. Furthermore, it makes model validations difficult, because it just directly calls the mongo driver.
// Classic (old) way to update a document (find it, edit it, then save it)
// See section nine for a better way
/*
    const findEditThenSave = (personId, cbFuncExpanded) => {

        // Find: 
        Person.findById(personId, cbFuncExpanded); 

    };
    // Adding a new favorite food to a particular person and saving it in the database
    const myDoneCallbackExpanded = function(err, data) {
        myDoneCallback(err, data); // for Person.findById()

        // Edit: add the new favorite food to the array
        const foodToAdd = "hamburger";
        data.favoriteFoods.push(foodToAdd);

        // Save: save updated data to the database
        data.save(myDoneCallback);
    };
    console.log("Classic/old way to find, edit and then save a document/row/record ...");
    findEditThenSave("64b1894ec2c01f40a854e723", myDoneCallbackExpanded);
*/
const findEditThenSave = (personId, cbFunc) => {
    const foodToAdd = "hamburger";
    // Find: 
    Person.findById(personId, (err, data) => {
        if (err) return console.log(err);
        console.log(data);
        // Edit: Add the new favorite food to the array
        data.favoriteFoods.push(foodToAdd);
        console.log(data);
        // Save: Save updated data to the database
        data.save(cbFunc);
    });
};
/*
console.log("Classic/old way to find, edit and then save a document/row/record ...");
findEditThenSave("64b1894ec2c01f40a854e724", myDoneCallback);
*/


//(9) PERFORM NEW UPDATES ON A DOCUMENT USING MODEL.FINDONEANDUPDATE(): Recent versions of Mongoose have methods to simplify documents updating. Some more advanced features (i.e. pre/post hooks, validation) behave differently with this approach, so the classic method is still useful in many situations. findByIdAndUpdate() can be used when searching by id.
// The new (better) way to update a document via model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
    let ageToSet = 20;
    Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true },
        function (err, data) {
            if (err) return console.error(err);
            console.log(data);
            done(null, data);
        });
};
/*
console.log("Perform new updates on a document using Model.findOneAndUpdate() ...");
findAndUpdate("S Fraser", myDoneCallback);
*/

//(10) DELETE ONE DOCUMENT USING MODEL.FINDBYIDANDREMOVE: findByIdAndRemove and findOneAndRemove are like the previous update methods. They pass the removed document to the db. As usual, use the function argument personId as the search key.
// Delete one document
const removeById = function (personId, done) {
    Person.findByIdAndRemove(
        personId,
        (err, removedDoc) => {
            if (err) {
                return console.error(err);
            }
            done(null, removedDoc);
        }
    );
};
/*
console.log("removing document by ID");
removeById("64b1894ec2c01f40a854e723", myDoneCallback);
*/

//(11) DELETE MANY DOCUMENTS WITH MODEL.REMOVE(): Modify the removeManyPeople function to delete all the people whose name is within the variable nameToRemove, using Model.remove(). Pass it to a query document with the name field set, and a callback.
// Note: The Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected. Don’t forget to pass it to the done() callback, since we use it in tests.
// Delete all the documents matching a criteria
const removeManyPeople = (done) => {
    let nameToRemove = "Worf";
    Person.remove({ name: nameToRemove }, function (err, data) {
        if (err) return console.error(err);
        console.log(data);
        done(null, data);
    });
};
/*
console.log("remove many people by ID...");
removeManyPeople(myDoneCallback);
*/

//(12) CHAIN SEARCH QUERY HELPERS TO NARROW SEARCH RESULTS: If you don’t pass the callback as the last argument to Model.find() (or to the other search methods), the query is not executed. You can store the query in a variable for later use. This kind of object enables you to build up a query using chaining syntax. The actual db search is executed when you finally chain the method .exec(). You always need to pass your callback to this last method. There are many query helpers, here we'll use the most commonly used.
// Don't pass a callback to Model.find() (or other search methods)
// so the query is NOT executed. But we can store the query in a
// variable for later use. Build up more complex queries via a
// syntax chain. Execute the query chain via the .exec() method
const queryChain = (done) => {
    const foodToSearch = "Knowledge";
    let myQuery = Person.find({ favoriteFoods: foodToSearch });

    // Sort by name, limit results to 2 documents, hide their age
    myQuery.sort({ name: 1 }).limit(2).select({ age: 0 }).exec(
        // Passing the "done(err, data)" callback to .exec()
        function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log(data);
            done(null, data);
        }
    );
};
/*
console.log("Query chain formed by not passing callback");
queryChain(myDoneCallback);
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
