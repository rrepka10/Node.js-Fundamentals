import {view} from './view.js';

export const showLogin = (req, res) => res.send(view('loginForm'));

export function authenticate(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.redirect('/login');
        return;
    }

    if (email.toLowerCase() === 'admin@admin.com' && password === 'password') {
        // TODO: allow user

        res.redirect('/guitars');
    } else {
        res.redirect('/login');
    }
}