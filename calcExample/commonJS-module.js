const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
}); // End rl 

// Prompt
function question() {
	rl.question('Enter your simple equation ', (input) => {
		if (input === 'quit') {
			console.log('close');
			rl.close();
		} else {
			try {
				const value = eval(input);
				console.log(`${value}`);
			} // End try
			catch (exception) {
				console.log("I don't know how to do that.");
			} // End catch
			question();
		} // End else
	}); // End rl.question
} // End function question

question();