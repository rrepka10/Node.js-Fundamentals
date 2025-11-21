// Get the stuff we need for password
import { compare } from './crypt.js';
import {User} from './model.js';

// Export our login form using handlebars, passing the title, using the plain layout
export const showLogin = (req, res) => res.render('auth/login', {title: 'Login', layout: 'plain'});

export async function authenticate(req, res) {
	// Get the passed data
    const { email, password } = req.body;

	// Is there email and password data
    if (!email || !password) {
		// No, try again
        res.redirect('/login');
		
		// alwasy return
        return;
    }

	// See if the user is in our database
    const user = await User.findOne({email: email.toLowerCase()});
	if (!user) {
		// No, try again
		console.log('User not fouund');

        res.redirect('/login');
        return;
    }

	// See if the password matches
    if (await compare(password, user.password)) {
		// Build the session data
        req.session.user = {
            email,
            isAuthenticated: true
        };
		console.log('Password valid');

		// Show the guitar screen
        res.redirect('/guitars');
    } else {
		// No, go back to the login screen
		console.log('Password invalid');
        res.redirect('/login');
    }
}

// Verify the login data 
export function checkAuth(req, res, next) {
	// Is the user authenticated?
    let isAuthenticated = req.session.user && req.session.user.isAuthenticated;

    if (isAuthenticated) {
		// Yes, then execute the request
		console.log('IS authenticated');
        next();
    } else {
		// NO, back to login
		console.log('NOT authenticated');
        res.redirect('/login');
    }
}

// Logout
export function logout(req, res) {
	// Destroy the login cookie, if any
	console.log('logout');
    req.session.destroy();

    res.redirect('/');
}