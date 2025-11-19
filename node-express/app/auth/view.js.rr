// Login form view
const views = {
    loginForm() {
        return this._layout(`
        <form method="post" action="/login">
            <div>
                Email: <input type="text" name="email" />
            </div>
            <div>
                Password: <input type="password" name="password" />
            </div>
            <div>
                <button type="submit">Sign In</button>
            </div>
        </form>
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


export const view = (name, data) => views[name](data);