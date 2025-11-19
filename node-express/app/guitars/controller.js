// Part of a MVC system - controller
// The interface to our data 
import {addGuitar, getAll, getById, getByMake, removeGuitar, saveGuitar} from './model.js';

// Our general UI
import { view } from './view.js';

// Show the form to add a new guitar
export async function createGuitar(req, res) {
	console.log("createGuitar");
    res.send(
        view('form')
    );
}

// Delete the guitar
export async function deleteGuitar(req, res) {
	// Get the guitar ID number
    const id = parseInt(req.params.id, 10);
	
	// Does the ID exist
    if (!id) {
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

	// Acutally remove the entry
    await removeGuitar(guitar);
	
	// Display the new list 
    res.redirect('/guitars');
}


// Edit an existing guitar
export async function editGuitar(req, res) {
	// Get the guitar ID number
    const id = parseInt(req.params.id, 10);

	// Does the ID exist
    if (!id) {
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
    res.send(
        view('form', guitar)
    );
}


// List the guitars 
export async function listGuitars(req, res) {
    const guitars = await getAll();
    //res.send(guitars);             // original
	// Use the views feature
	res.send(
		// Call the list view providing the guitars data 
        view('list', {
            guitars,
            title: 'My Guitars'
        })
    );
} // End listGuitars


export async function showGuitar(req, res) {
	// Convert the id field to a number
    const id = parseInt(req.params.id, 10);

	//Is there an ID NUMBER?
    if (id) {
		// Yes, try to get the guitar object
        const guitar = await getById(id);
		
		// Is there a guitar object?
        if (!guitar) {
			//No, 404 error - newer syntax
            res.sendStatus(404);
        } else {
			// Yes, display it 
            // res.send(guitar);		// original
			// Call the show view providing the guitars data 
			res.send(
                view('show', {guitar})
			);
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
			//res.send(found);		// original
			res.send(
				// Call the list view providing the guitars data 
				// Create a dummy guitars object
				view('list', {
					guitars: found,
					title: `Guitars Made By ${found[0].make}`
				})
			);
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
	// Convert the id to a number
    const id = parseInt(req.params.id, 10);

	// Check the conversion
    if (!id) {
		// Bad conversion, error
        res.send(404);
        return;
    }

	// Try to get the guitar
    const guitar = await getById(id);
    
	// Did we get a guitar?
    if (!guitar) {
		// No, error
        res.send(404);
        return;
    }

	// Parse the guitar object
    const {guitar_make, guitar_model} = req.body;

	// Are the make and model defined?
    if (guitar_make && guitar_model) {
        guitar.make = guitar_make;
        guitar.model = guitar_model;

		// good, save the guitar
        await saveGuitar(guitar);
		
		// display tne new guitar 
        res.redirect(`/guitars/${id}`);
    } else {
		// No, just display the current data and go back to the edit page
        res.redirect(`/guitars/${id}/edit`);
    }
}