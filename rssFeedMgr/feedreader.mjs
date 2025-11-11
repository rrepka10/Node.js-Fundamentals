// write a module to manage an RSS JSON file. 
// ECMA script 

// System modules
import axios from 'axios';			//npm axios 
import Parser from 'rss-parser'; 	// npm install rss-parser

// our custom module to really get/save the JSON
import { getLinks, saveLinks } from './feed-manager.mjs';
import { question, close } from './rl.mjs';

const feeds = await getLinks();
const parser = new Parser();  // constructor 

let input = await question('Enter command (list, add, del, read, quit)');

// Process the command line prompts, added shortcuts 
while (input !== 'quit' && input !== 'q') {
	let cmdParts = input.trim().split(' ');
	let cmd = cmdParts[0];
	
	// list with index
	if (cmd === 'list' || cmd === 'l') {
		feeds.forEach((url, index) => console.log(`${index}\t${url}`));
	} // End list 
	
	// add url
	if (cmd === 'add' || cmd === 'a') {
		// Check there are at least 2 elements
		if (cmdParts.length < 2) {
			console.log('Please include the URL with the add command.');
		}
		else {
			// Good data, push the new URL into the array
			feeds.push(cmdParts[1]);
		} // End Else
	} // End add
	

	// del index
	if (cmd === 'del' ||cmd === 'd') {
		// Check there are at least 2 elements
		if (cmdParts.length < 2) {
			console.log('Please include the index of the URL to delete.');
		}
		else {
			// There are at least 2 elements, convert to a number
			let index = parseInt(cmdParts[1], 10);
			
			// Is the index in range
			if (index > -1 && index < feeds.length) {
				// Remove the entry
				feeds.splice(index, 1);
				} // End if
			else {
				console.log('The provided index is out of range.');
			} // End else
		} // End Else
	} // End del
	
	// read index
	if (cmd === 'read' || cmd === 'r') {
			// Check there are at least 2 elements
		if (cmdParts.length < 2) {
			console.log('Please include the index of the URL to read.');
		}
		else {
			// There are at least 2 elements, convert to a number
			let index = parseInt(cmdParts[1], 10);
			
			// Is the index in range
			if (index > -1 && index < feeds.length) {
			
				// Display the feed
				// Bug in example, he wanted feeds[index]
				// let {data} = await axios.get('https://www.reddit.com/r/node.rss');
				let {data} = await axios.get(feeds[index]);
			
				// returns a list of items, could also parse the URL directly
				let feed = await parser.parseString(data);
				// print all the array content 
				feed.items.forEach(item => console.log(item.title));
			} // End if
			else {
				console.log('The provided index is out of range.');
			} // End else
		} // End Else		
	} // End read
	
	
	input = await question('Enter command (list, add, del, read, quit)');
} // End while

// Sample save of a url
//feeds.push('http://www.tutspus.com');

await saveLinks(feeds);
close();