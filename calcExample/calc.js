//NodeJS notes
//
//Can run interactivley
//	has all external libraries imported
//	.help
//	.exit to leave
//	
//console.log()

process.stdin.on('data', (chunk) => {
	// convert to string
	const input = chunk.toString().trim();
	if (input === 'quit') {
		process.exit(0);
		} // End if
	try {
		const value = eval(input);
		console.log(`${value}`);
		}  // End try
	catch (exception) {
		console.log("I don't know how to do that.");
	} // End catch
}); // End process stdin


process.stdout.write('Enter your simple equation: ');
	

	
	