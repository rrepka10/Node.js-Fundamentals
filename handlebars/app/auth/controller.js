// Export our login form using handlebars, passing the title, using the plain layout
//export const showLogin = (req, res) => res.send(view('loginForm'));   	// Previous code
export const showLogin = (req, res) => res.render('auth/login', {title: 'Login', layout: 'plain'});

export function authenticate(req, res) {
	// Get the passed data
    const { email, password } = req.body;

	// Is there email and password data
    if (!email || !password) {
		// No, try again
        res.redirect('/login');
		
		// alwasy return
        return;
    }

	// There must be password and email data, is it valid?
    if (email.toLowerCase() === 'admin@admin.com' && password === 'password') {
		// yes, save the state info
		console.log('Password valid');
        req.session.user = {
            email,
            isAuthenticated: true
        };

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