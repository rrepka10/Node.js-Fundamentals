// write a module to manage JSON file. 
// This is a new style ECMA script 
// This provides getLinks and saveLinks

// Required external libraries
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { access, constants, readFile, writeFile } from 'fs/promises';

// meta.url provides the url to the module name
console.log(`Module URL: ${import.meta.url}`);

// figure out the json file directory from the URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonFile = join(__dirname, 'feeds.json');

// Print out the JSON file name
console.log(`The name of our JSON file: ${jsonFile}`);

export async function getLinks() {
	try {
		// alwasy throws an error if there is no file
		await access(jsonFile, constants.F_OK); //or R_OK, W_OK, X_OK
	} // end try
	catch (error) {
		// No file, create the file
		await writeFile(jsonFile, JSON.stringify([]), { encoding: 'utf8' }) // default utf8
	} // end catch

	// we have a json file, read it 
	const contents = await readFile(jsonFile, { encoding: 'utf8' });  // no default read
	return JSON.parse(contents);

}

export async function saveLinks(links) {
	await writeFile(jsonFile, JSON.stringify(links));
}


