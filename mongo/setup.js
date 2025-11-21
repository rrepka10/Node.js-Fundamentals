// Used to allocate new users
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import readline from 'readline';
import {stdin as input, stdout as output} from 'process';
import {hash} from './app/auth/crypt.js';
import {User} from './app/auth/model.js';

// Read the .env file for the DB credentials
dotenv.config();
//console.log(`db account: ${process.env.DB_ADMIN} ${process.env.DB_PASSWORD}`);

// Create our readline interface
const rl = readline.createInterface({input, output});

await mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.fo8cyjt.mongodb.net/?appName=Cluster0`);

// Ask for the new user info
rl.question('Please enter your email address: ', (email) => {
    rl.question('Please enter a password: ', async (plainText) => {
		
		// Hash the password text
        const hashText = await hash(plainText);

		// Set the database entries, record the email as lowercase
        await User.create({
            email: email.toLowerCase(),
            password: hashText
        });

		// Write to the data base 
        rl.close();
		console.log('Account created');
    });
});
