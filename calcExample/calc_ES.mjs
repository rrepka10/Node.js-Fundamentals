// Simple command line ECAM calculator

import * as readline from 'readline';
import {stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output }); 

// Put the prompt on the screen
function question(query) {
	return new Promise(resolve => {
		rl.question(query, resolve);
	}); 
} // end function

let answer = await question('Enter your simple equation ');

while(answer !== 'quit') {
	try {
		const value = eval(answer);
		console.log(`${value}`);
	} // End try
	catch (exception) {
		console.log("I don't know how to do that.");
	} // End catch
	
	answer = await question('Enter your simple equation ');
	} // End while

rl.close();
