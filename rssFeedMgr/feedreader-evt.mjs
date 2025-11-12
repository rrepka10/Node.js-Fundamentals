// write a module to manage an RSS JSON file using custom events
// ECMA script 

// System modules
import axios from 'axios';			//npm axios 
import Parser from 'rss-parser'; 	// npm install rss-parser
import {EventEmitter} from 'events'; // The standard Nodejs events class 

// our custom module to really get/save the JSON
import { getLinks, saveLinks } from './feed-manager.mjs';
import { rl, close } from './rl.mjs';

const feeds = await getLinks();
const parser = new Parser();  // constructor 
const emitter = new EventEmitter();

function prompt() {
	rl.setPrompt('Enter command (list, add, del, read, quit): '); // set the prompt
	rl.prompt();  // as for input
} // End prompt()

// Wait for the readline data event to occure 
rl.on('line', (input) => {
	let cmdParts = input.trim().split(' '); // Get the text and parse item

	// emit cmdParts[], cmdPArt[1]	
	emitter.emit(cmdParts[0], cmdParts[1]);
});  // End rm on line

// Quit command
emitter.on('quit', async () => {
	await saveLinks(feeds);
	close();
}); // End emitter on quit


// List command
emitter.on('list', async () => {
	// list with index
	feeds.forEach((url, index) => console.log(`${index}\t${url}`));
	prompt();
}); // End emitter on list


// add url
emitter.on('add', async (url) => {
	if (url === undefined) {
		console.log('Please include the URL with the add command.');
	}
	else {
		// Good data, push the new URL into the array
		feeds.push(url);
	} // End Else
	
	prompt();
}); // End emitter on add

// delete url
emitter.on('del', async (index) => {
	if (index === undefined) {
		console.log('Please include the index of the URL to delete.');
	}
	else {
		// There is an index, convert to a number
		index = parseInt(index, 10);
		
		// Is the index in range
		if (index > -1 && index < feeds.length) {
			// Remove the entry
			feeds.splice(index, 1);
			} // End if
		else {
			console.log('The provided index is out of range.');
		} // End else
	} // End Else
	
	prompt();
}); // End emitter on del

// read url
emitter.on('read', async (index) => {
	if (index === undefined) {
		console.log('Please include the index of the URL to read.');
	}
	else {
		// There is an index, convert to a number
		index = parseInt(index, 10);
		
		// Is the index in range
		if (index > -1 && index < feeds.length) {
			// 
			
			// Display the feed
			// Put in extra error handler 
			try {
				let {data} = await axios.get(feeds[index]);
		
				// returns a list of items, could also parse the URL directly
				let feed = await parser.parseString(data);
				// print all the array content 
				feed.items.forEach(item => console.log(item.title));			
			}
			catch (error) {
				console.log(`Error ${error} with feed: ${feeds[index]}`);
			} // End Catch
		} // End if
		else {
			console.log('The provided index is out of range.');
		} // End else
	} // End Else
	
	prompt();
}); // End emitter on read

// Request input
prompt();