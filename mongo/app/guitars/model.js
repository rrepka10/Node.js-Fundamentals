// Part of a MVC system - model
// This model file provides the API to our data without directly 
// providing the data.

// Give us access to the databe variables
import mongoose from 'mongoose';

// Setup our db schema, the data base is case sensitive, so we have to store the 
// lower case version of the make 
const guitarSchema = new mongoose.Schema({
    make: String,
    model: String,
    make_lower: String
});

// Create a model class using our schema 
const Guitar = mongoose.model('Guitar', guitarSchema);

// Add a new guitar to our data base
export async function addGuitar(make, model) {
	// Build the new guitar object
	await Guitar.create({
        make,
        model,
        make_lower: make.toLowerCase()
    });
}

// API to get all guitars without exposing the raw data
export async function getAll() {
    // return Promise.resolve(guitars);
	return await Guitar.find();
}

// API to get a specific guitar without exposing the raw data
export async function getById(id) {
	// Try to return the data based on ID
	return await Guitar.findById(id);
}

// API to get all a guitar by make without exposing the raw data
export async function getByMake(make) {
	// Search the data by text 
    return await Guitar.find({make_lower: make.toLowerCase()});
}

// Remove a guitar from the list
export async function removeGuitar(id) {
	    await Guitar.deleteOne({_id: id});
}

// Save the new guitar
export async function saveGuitar(id, make, model) {
   const guitar = await getById(id);

    if (guitar) {
        guitar.make = make;
        guitar.model = model;
        guitar.make_lower = make.toLowerCase();

		// update the database 
        guitar.save();
    }	
}