// Part of a MVC system - controller
// The interface to our data 
import {addGuitar, getAll, getById, getByMake, removeGuitar, saveGuitar} from './model.js';

// Show the form to add a new guitar
export async function createGuitar(req, res) {
	console.log("createGuitar");
	res.render('guitars/form');
}

// Delete the guitar
export async function deleteGuitar(req, res) {
	// Get the guitar object
	const id = req.params.id;
	
	// Does the ID exist
    if (!isIdValid(id)) {
		//No, return an error
        res.send(404);
		
		// Be sure to return to stop the function		
        return;
    }

	// Acutally remove the entry
    await removeGuitar(id);
	
	// Display the new list 
    res.redirect('/guitars');
}


// Edit an existing guitar
export async function editGuitar(req, res) {
	// Get the guitar data
	const id = req.params.id;
 
	// Does the ID exist
    if (!isIdValid(id)) {
		//No, return an error
        res.send(404);
		
		// Be sure to return to stop the function
        return;
    }

	// ID is valid, try to get the data
    const guitar = await getById(id);
    
	// Did we get the data?
    if (!guitar) {
		//No, return an error
        res.send(404);
		
		// Be sure to return to stop the function		
        return;
    }
    
	// We must have good data, populate the form and display it.
	res.render('guitars/form', {guitar: convertToObj(guitar)});
}


// List the guitars 
export async function listGuitars(req, res) {
    const guitars = await getAll();
	// Use the views feature
    res.render('guitars/list', {
		guitars: guitars.map(convertToObj),
        title: 'My Guitars'
    });

    
} // End listGuitars


export async function showGuitar(req, res) {
	// Convert the id field to a number
    const id = req.params.id;

	//Is there an ID NUMBER?
    if (isIdValid(id)) {
		// Yes, try to get the guitar object
        const guitar = await getById(id);
		
		// Is there a guitar object?
        if (!guitar) {
			//No, 404 error - newer syntax
            res.sendStatus(404);
        } else {
			// Yes, display it 
			res.render('guitars/show', {
                guitar: convertToObj(guitar),
                title: `Guitar: ${guitar.make} ${guitar.model}`
            });
        }
    } else {
		// NO ID NUMBER, try to find the name 
        const found = await getByMake(req.params.id);
		
		// Did we find it?  
        if (found.length === 0) {
			// NO, error
            res.sendStatus(404);
        } else {
			//Yes, return the data
		    res.render('guitars/list', {
                guitars: found.map(convertToObj),
                title: `Guitars Made By ${found[0].make}`
            });
        }
    } // End Else
}

// The code to take the create form data and process it
export async function storeGuitar(req, res) {
	// Get the guitar data using destructure
    const {guitar_make, guitar_model} = req.body;

	// If the make and model are defined, then add them
    if (guitar_make && guitar_model) {
		// Add the guitar
        await addGuitar(guitar_make, guitar_model);
		
		// Display the new list 
        res.redirect('/guitars');
    } else {
		// One field not defined, so reload the form
        res.redirect('/guitars/create');
    }
}


// The code to actually save the new/updated data
export async function updateGuitar(req, res) {
	// Convert the db ID number
    const id = req.params.id;

	// Check the conversion
	if (!isIdValid(id)) {
		// Bad conversion, error
        res.send(404);
        return;
    }

	// Parse the guitar object
    const {guitar_make, guitar_model} = req.body;

	// Are the make and model defined?
    if (guitar_make && guitar_model) {
		await saveGuitar(id, guitar_make, guitar_model);
		
		// display tne new guitar 
        res.redirect(`/guitars/${id}`);
    } else {
		// No, just display the current data and go back to the edit page
        res.redirect(`/guitars/${id}/edit`);
    }
}

// A helper function to convert DB data to local objects 
const convertToObj = (g) => ({id: g._id, make: g.make, model: g.model});

// This is a helper function to determine if an ID string is valud.
// Mongodb returns a 24 character ID string, not a simple integer.
const isIdValid = (id) => id.length === 24;