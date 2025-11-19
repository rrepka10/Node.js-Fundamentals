import express from 'express';
import {routes as guitarRoutes} from './guitars/routes.js';
import {routes as authRoutes}   from './auth/routes.js';
import session from 'express-session';

// Create an express object
const app = express();


// Tell express we want to use static assets and where they are
// Static assets will be in the public folder, to use the style.css
app.use(express.static('./public'));

// Specify the tool to parse the form request boody
// If extended: true, then the QS library is used (more complex object)
// If extended: false, then the queryString library is used (simple URL encoded string)
app.use(express.urlencoded({ extended: false }));

// Setup sessions before any routes, it has three values.  
// The first is a text string to sign the cookies
// The second is "saveUninitialized: false", only store sessions for authinicated users
//                don't store anything if the user does not authenticate
// The third is :resave: false", only save data when it changes. 
app.use(session({
    secret: 'birds fly high asdlkfjlksajdfsdafZXCV234asdf',
    saveUninitialized: false,
    resave: false
}));



// The base URL to start with our imported routes
// e.g.  http:localhost:8080/guitars/xxxxx
app.use('/guitars', guitarRoutes);


// The base URL to start with our imported routes
// e.g.  http:localhost:8080/login
app.use('/', authRoutes);

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
