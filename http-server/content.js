
// Create the html to list hhe guitars.
export const createList = (guitars) => `
<h2>My Guitars <a href="/add">Add New Guitar</a></h2>
<ul>
    ${guitars.map(createListItem).join('\n')}
</ul>`;

// Adding a link, 3 items 
const createListItem = ({id, make, model}) => `<li><a href="?id=${id}">${make} ${model}</a></li>`;

// Create a form to add a new guitar to our list
export const getForm = () => `
<form method="post" action="/save">
    <div>
        Make: <input type="text" name="guitar_make" />
    </div>
    <div>
        Model: <input type="text" name="guitar_model" />
    </div>
    <div>
        <button type="submit">Save</button>
    </div>
</form>
`;

// Return content for a specific guitar
export function getGuitarContent(guitar) {
    if (guitar) {
         return `
            <h2>${guitar.make} ${guitar.model}</h2>
            <p><a href="/delete/${guitar.id}">Delete</a>
        `;
    } else {
        return '<p>Guitar does not exist</p>.';
    }
} // End getGuitarContent


export const view = (content) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guitars</title>
    <link rel="stylesheet" href="/assets/css/style.css" />	
</head>
<!-- <body style="font-size: 2rem"> //now use a styles heet -->
    ${ content }
</body>
</html>`;
