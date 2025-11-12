This repo contains a summary of the "Node.js Tutorial for Beginners Crash course" by envatoTuts+.
This code was tested under Windows 10 WSL2 Ubunti 24.04 and NodeJS V22.21.0. 

Original code:   git clone https://github.com/tutsplus/Node.js-Fundamentals.git

Each subdirectory summarizes sections of the original course with additional comments and notes
embedded in the code.  

Installation instructions: 
 sudo apt-get install -y nodejs
 sudo npm install nodemon
 sudo npm install express
 sudo npm install rss-parser
 sudo npm install axios

calcExample - Contains the Calculator exmples, section 2.4, 2.5, 2.6 
	test: node calc.js     then enter simple math equation like 1+1, quit to exit 
	      node calc_ES.js  then enter simple math equation like 1+1, quit to exit 
				

rssFeedMgr - contains the code for the simple rss feed manager, sections 3.1-3.5
	test: node feedreader.mjs   then enter commands: list, add <url>, del <n>, read <n>, quit
                                    Note: no additional leading spaces in add command 
		   list 
		   add https://www.reddit.com/r/nodes.rss      (adding an invalid URL)
		   run 0            products nice text
		   run 1            procuces an error
        
	test: node feedreader-evt.mjs   then enter commands: list, add <url>, del <n>, read <n>, quit
                                    Note: event based implementation                        
                                    Note: no additional leading spaces in add command 
		   list 
		   add https://www.reddit.com/r/nodes.rss      (adding an invalid URL)
		   run 0            products nice text

http-server - Containes the code for the manual implemtation of an http server, not using express
              sectios 4.1-4.8

Note: To create a defaul package.json file use: npm init -y    (already provided in git)
      Use nodemon to automatically restart our running Nodejs task when changed
      Added -L under WSL2 e.g:  nodemon index.mjs  -L  (note, we used the package.json file to default our .js to .mjs)
      Package.json 
           "type": "module",  // means all .js are really .mjs, note the default json file	
	                      // may already have a default "type": "commonjs", so be sure to remove it

	Test: nodemon dev  - to run the dev json entry, then in your browser:

		http:localhost:8080  			- returns the list of guitars
		   click on a guitar, select delete, a new list should be displayed with guitar deleted
		   click on "add new guitar", should bring up the add form.  Enter some data, it should be 
						displayed in the guitar list, results in a post event
		
-----------------------------

		http://localhost:8080/delete/2  	- deletes guitar 2 and shows the new list
		
// Test cases					- returns Home Page
localhost:8080					- returns 
localhost:8080/guitars			- returns guitar list data
localhost:8080/guitars/2		- returns guitar 2 data
localhost:8080/guitars/2		- returns not found
localhost:8080/guitars/prs 		- returns the 2 PRS guitar


localhost:8080/guitars/sum/2-3	- returns 5




