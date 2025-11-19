import express from 'express';
import {routes as guitarRoutes} from './guitars/routes.js';

// Create an express object
const app = express();

// Tell express we want to use static assets and where they are
// Static assets will be in the public folder, to use the style.css
app.use(express.static('./public'));

// Specify the tool to parse the form request boody
// If extended: true, then the QS library is used (more complex object)
// If extended: false, then the queryString library is used (simple URL encoded string)
app.use(express.urlencoded({ extended: false }));

// The base URL to start with our imported routes
// e.g.  http:localhost:8080/guitars/xxxxx
app.use('/guitars', guitarRoutes);

// Handle the default route
app.get('/', (req, res) => {
    res.send('Home Page');
});

// Add a route that does math with two parameters 
// The slash is a delimiter
// app.get('/sum/:a/:b', (req, res) => {
// The dash is NOT subtract but also a delimiter!
app.get('/sum/:a-:b', (req, res) => {

	// Alwasy return the sum for A and B
    res.send(`${parseInt(req.params.a) + parseInt(req.params.b)}`);
});


// / -- Home Page
// /guitars -- index page/list
// /guitars/id -- individual guitar by id

// Start the listen method on port8080
export function start() {
    app.listen(8080, () => {
        console.log('Listening at http://localhost:8080');
    });
}
