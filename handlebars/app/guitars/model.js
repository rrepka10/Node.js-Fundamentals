// Part of a MVC system - model
// This model file provides the API to our data without directly 
// providing the data.

// Keep track of the running list of id's, and provide a function to
// get the next id
let id = 1;
const getId = () => id++

// Our initial list of guitars.
const guitars = [
    {id: getId(), make: 'Fender', model: 'Strat'},
    {id: getId(), make: 'PRS', model: 'Starla'},
    {id: getId(), make: 'Gibson', model: 'Les Paul'},
    {id: getId(), make: 'PRS', model: 'Vela'},
];

// Add a new guitar to our data base
export function addGuitar(make, model) {
	// Build the new guitar object
    const guitar = {
        id: getId(),
        make,
        model
    };

	// Write the data
    guitars.push(guitar);

	// Return the new guitar list 
    return Promise.resolve(guitar);
}

// API to get all guitars without exposing the raw data
export function getAll() {
    return Promise.resolve(guitars);
}

// API to get a specific guitar without exposing the raw data
export function getById(id) {
	// Try to return the data based on ID
    const guitar = guitars.find(g => g.id === id);

    return Promise.resolve(guitar);
}

// API to get all a guitar by make without exposing the raw data
export function getByMake(make) {
	// Search the data by text 
    const found = guitars.filter(g => g.make.toLowerCase() === make.toLowerCase());

    return Promise.resolve(found);
}

// Remove a guitar from the list
export function removeGuitar(guitar) {
	// Find the entry index to remove
    const index = guitars.indexOf(guitar);

	// Delete the guitar
    guitars.splice(index, 1);

	// tell the system we deleted the guitar
    return Promise.resolve(true);
}

// Save the new guitar
export function saveGuitar(guitar) {
	
	// tell the system we updated the guitars
    return Promise.resolve(true);
}