// Simple HTTP server, written as an .mjs or ES script
// but using package.json to fors ES mode for .js files

// use: npm run dev  to use the package.json file 

import {createServer} from 'http';  // or https
import {deleteGuitar, getGuitars, saveGuitar} from './data.js';
import {createList, getForm, getGuitarContent, view} from './content.js';
import {parse} from 'querystring';
import {readFile} from 'fs/promises';

// Create the server object
const server = createServer(async (request, response) => {
	// URL command types 
    // /delete/id
    // /add
	// Parse based on the slash character 
    const parts = request.url.split('/');
	
	// Get the current list of guitars
    const guitars = getGuitars();

	// Post command due to add?
    if (request.method === 'POST') {
		console.log('Post command');
		// yes a post, set the default data
        let body = '';

        request.on('readable', () => {
			// Read from the form
            const data = request.read();
		
			// If we got data, add it to our list
            if (data !== null) {
                body += data;
            }
        });

		// Wait for all data 
        request.on('end', () => {
			// Parse the data into our structure
            const guitar = parse(body);

			// Add our new guitar to our "database"
            saveGuitar({
                make: guitar.guitar_make,
                model: guitar.guitar_model
            });

			// Refresh
            redirect(response, '/');
        })
    } // End post
	
	
	else { // GET
		// Must be a get command.  A delete?
        if (parts.includes('delete')) {
			console.log('Delete command');
			
			// Yes, 2nd parameter is the index
            handleDelete(parts[2]);
			
			// Display the new list
            redirect(response, '/');
        } // End if delete
		
		// Is this a request for a CSS sheet?
		else if (request.url === '/assets/css/style.css') {
			console.log('  CSS request');

			// This is a request for the style sheet, handle it.
            try {
                const cssFileName = './public/assets/css/style.css';
                const css = await readFile(cssFileName, {encoding: 'utf8'});
                response.end(css);
				
            } catch (err) {
				// Could not read style sheet return 404, not found, error
                response.statusCode = 404;
                response.end();
            } // End catch 
        } // End else if CSS
		
		// This must be refresh 
		else {
			console.log('Refresh');

            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' });

            const url = new URL(request.url, 'http://localhost:8080');

            const id = url.searchParams.get('id');
            let content = '';

            if (parts.includes('add')) {
				// display the request form 
				console.log(' Getting the add form');
                content = getForm();
            } 
			else if (id) {
				// Used when clicking on a list link 
				console.log(`  searching for a guitar by id ${id}`);
                let guitar = guitars.find(g => g.id == id);
                content = getGuitarContent(guitar);
            } else {
				// Generate the list of guitars to display
				console.log(`  calling createList`);
                content = createList(guitars);
            }

            response.end(view(content));
        }
    } // End get
});


// Remove a guitar
function handleDelete(id) {
    deleteGuitar(id);
}


// Handle a redirect error
function redirect(response, to) {
    response.writeHead(302, {location: to, 'Content-Type': 'text/plain'});
    response.end(`Redirect to ${to}`);
}

// listen on port 8080, or choose your port
server.listen(8080, () => {
    console.log(`Server is listening at http://localhost:${server.address().port}`);
});


