
// Our private views interface
const views = {
	// Process the data entry form which may have optional guitar data from the edit
    form(guitar) {
		// Create default blank data
        let action = '/guitars',
            make = '',
            model = '';

		// If guitar was passed in then use the actual data 
        if (guitar) {
            action = `/guitars/${guitar.id}`;
            make = guitar.make;
            model = guitar.model;
        }

        return this._layout(`
        <form method="post" action="${action}">
            <div>
                Make: <input type="text" name="guitar_make" value="${make}" />
            </div>
            <div>
                Model: <input type="text" name="guitar_model" value="${model}" />
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
        `);
    },
	
	// Process the list request using the passed guitars object and title
    list({guitars, title}) {
		// Build and HTML list of the list of guitars
        const liElements = guitars.map(({id, make, model}) => 
            `<li><a href="/guitars/${id}">${make} ${model}</a></li>`);

		// Call our internal method and use our list 
        return this._layout(`
            <h2>${title}</h2>
            <ul>
                ${liElements.join('')}
            </ul>
        `);
    },
	
	// Process the show request using the passed guitars object
    show({guitar}) {
		// Call our internal method amd show the specfic guitar
        return this._layout(`
            <h2>
                ${guitar.make} ${guitar.model}
            </h2>
        `);
    },
	
	// Internal method with default content used by other views
	// Added <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src resource:; img-src 'self';">
	// to fix the CORS Content-Security-Policy issue 
    _layout(content) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Guitars</title>
            <link rel="stylesheet" href="/assets/css/style.css" />
        </head>
        <body>
            ${ content }
        </body>
        </html>`;
    }
}

// The public interface to our views, pass the data to our private function
export const view = (name, data) => views[name](data);