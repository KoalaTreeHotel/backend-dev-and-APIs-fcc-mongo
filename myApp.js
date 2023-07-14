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

//////////////////// Fruits test START (my test to access DB)
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
const fruit = new Fruit({
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

////////// (3) Create and save a Person
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

// Call the  create and save person function
console.log("Creating and saving a single person (myself!)...");
createAndSavePerson((err, data) => {
    if (err) { console.log(err); } console.log(data);
});

////////// (4) Create many people with Model.create()
let arrayOfPeople = [
    { name: "Picard", age: 56, favoriteFoods: ["Earl Grey"] },
    { name: "Spock", age: 34, favoriteFoods: ["Veggies"] },
    { name: "Worf", age: 32, favoriteFoods: ["Steak"] }
];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, function (err, people) {
        if (err) return console.log(err);
        done(null, people);
    });
};

// Call create many people function
console.log("Create many people via array...");
createManyPeople(arrayOfPeople, (err, data) => {
    if (err) { console.log(err); } console.log(data);
});

////////// (5) Use Model.find() to search my database
const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, function (err, personFound) {
        if (err) return console.log(err);
        done(null, personFound);
    });
};

// Call the find method and look for Spock

////////// (6) Use Model.findOne() to return a single matching document
const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

// Call the find by food method and look for "Earl Gray"
console.log("Looking for 'Earl Grey'...");
findOneByFood("Earl Grey", (err, data) => {
    if (err) { console.log(err); } console.log(data);
});

////////// (7)
// Search via the automatically added field "_id"
const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
        if (err) return console.log(err);
        console.log(data);
        done(null, data);
    });
};

////////// (8)
// Classic (old) way to update a document (find it, edit it, then save it)
// See section (9) for a better way
const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, (err, data) => {
        if (err) return console.log(err);
        console.log(data);
        // Add the new favorite food to the array
        data.favoriteFoods.push(foodToAdd);
        console.log(data);
        // Save updated data to the database
        data.save((err2, data2) => {
            if (err2) return console.error(err2);
            console.log(data2);
            done(null, data2);
        });
    });
};

////////// (9)
// The new (better) way to update a document via model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
    let ageToSet = 20;
    Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true },
        function (err, data) {
            if (err) return console.log(err);
            console.log(data);
            done(null, data);
        });
};

////////// (10)
// Delete one document
const removeById = function (personId, done) {
    Person.findByIdAndRemove(
        personId,
        (err, removedDoc) => {
            if (err) {
                return console.log(err);
            }
            done(null, removedDoc);
        }
    );
};

////////// (11)
// Delete all the documents matching a criteria
const removeManyPeople = (done) => {
    let nameToRemove = "Mary";
    Person.remove({ name: nameToRemove }, function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        done(null, data);
    });
};

////////// (12)
// Don't pass a callback to Model.find() (or other search methods)
// so the query is NOT executed. But we can store the query in a
// variable for later use. Build up more complex queries via a
// syntax chain. Execute the query chain via the .exec() method
const queryChain = (done) => {
    const foodToSearch = "burrito";
    let myQuery = Person.find({ favoriteFoods: foodToSearch });
    // Sort by name, limit results to 2 documents, hide their age
    myQuery.sort({ name: 1 }).limit(2).select({ age: 0 }).exec(
        // Passing the "done(err, data)" callback to .exec()
        function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log(data);
            done(null, data);
        }
    );
};

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
