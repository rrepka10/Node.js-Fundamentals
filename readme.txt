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
 sudo npm install express-session
 sudo npm install express-handlebars
 sudo npm install mongoose
 sudo npm install dotenv

calcExample - Contains the Calculator exmples, section 2.4, 2.5, 2.6 
	test: node calc.js     then enter simple math equation like 1+1, quit to exit 
	      node calc_ES.js  then enter simple math equation like 1+1, quit to exit 
				
---------------------------------------------------------------------------------
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


---------------------------------------------------------------------------------
http-server - Containes the code for the manual implemtation of an http server, not using express
              sections 4.1-4.8

	Note: To create a defaul package.json file use: npm init -y    (already provided in git)
      		Use nodemon to automatically restart our running Nodejs task when changed
      		Added -L under WSL2 e.g:  nodemon index.mjs  -L  (note, we used the package.json 
		file to default our .js to .mjs)
      	Package.json 
           	"type": "module",  // means all .js are really .mjs, note the default json file	
	        	           // may already have a default "type": "commonjs", so be sure to remove it

	Test: nodemon dev  - to run the dev json entry, then in your browser:

		http:localhost:8080  			- returns the list of guitars
		   click on a guitar, select delete, a new list should be displayed with guitar deleted
		   click on "add new guitar", should bring up the add form.  Enter some data, it should be 
						displayed in the guitar list, results in a post event


---------------------------------------------------------------------------------
node-express - Containes the code for the Express implemtation of an http server
              sections 5.1-5.9 & 6.1-6.3

	Note: To create a defaul package.json file use: npm init -y    (already provided in git)
      		Use nodemon to automatically restart our running Nodejs task when changed
      		Added -L under WSL2 e.g:  nodemon index.mjs  -L  (note, we used the package.json 
		file to default our .js to .mjs)
      	Package.json 
           	"type": "module",  // means all .js are really .mjs, note the default json file	
	        	           // may already have a default "type": "commonjs", so be sure to remove it
						   
		The original code had a CORS Content-Security-Policy issue, fixed in view.js _layout with:
		<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src resource:; img-src 'self';">

MVC - 	model 		- the data
		view 		- the UI
		controller	- Processes the data into the UI

	Test: nodemon dev  - to run the dev json entry, then in your browser:

		http:localhost:8080  			- returns the list of guitars
		   click on a guitar, select delete, a new list should be displayed with guitar deleted
	
		
	// Test cases before MVC 			
	localhost:8080					- returns home page
	localhost:8080/guitars			- returns guitar list data
	localhost:8080/guitars/2		- returns guitar 2 data
	localhost:8080/guitars/5		- returns not found
	localhost:8080/guitars/prs 		- returns the 2 PRS guitar
	
	// Test cases after MVC 			
	localhost:8080					- returns home page
	localhost:8080/guitars			- returns guitar list gui
		click on a guitar			- returns specific guitar data
	localhost:8080/guitars/prs		- returns PRS guitar list gui
	localhost:8080/guitars/create	- displays the new guitar form		
		click save					- addes the new guitar and displays the new list
	localhost:8080/guitars/2/edit	- brings up the guitar form with prefilled data
	localhost:8080/guitars/2/delete	- removes the selected guitar	

	// Test cases for 6.1-6.3
	localhost:8080/sum/1-20			- displays 21
	localhost:8080/login 			- brings up the login form
		enter junk, returns to the blank form
		enter admin@admin.com password - should redirect to /guitars
		you can now create/delete guitars
	localhost:8080/logout 			- brings up the home page, you can no longer create/delete guitars


---------------------------------------------------------------------------------
handlebars - Containes the code for the Express handlebars implemtation of an http express server
              sections 7.1-7.5
			  	// Test cases after MVC 			
	localhost:8080					- returns welcome home page
	localhost:8080/guitars			- returns guitar list gui, top ribbon show "login"
		click on a guitar			- returns specific guitar data
	localhost:8080/guitars/prs		- returns PRS guitar list gui
	localhost:8080/guitars/create	- forces a login (admin@admin.com password)
	localhost:8080/guitars/create 	- displays the new guitar form, with the top ribbon now		
									  set to "logout"
		click save					- addes the new guitar and displays the new list
	localhost:8080/guitars/2/edit	- brings up the guitar form with prefilled data
	localhost:8080/guitars/2/delete	- removes the selected guitar	


---------------------------------------------------------------------------------
mongo - Containes the code for the Mongo data base implementation, sections 8.1-8.7
	Requires a Mongo DB altas account mongodb.com
		create a project "Node Fundemntals", no users, select free, 
		take defaults for the rest and create the data base, 
		by default your current IP address will be given access. 
		record the default DB users name and password:
		select create data base user
		select connect to clust0 with: driver, nodeJS
		Note: You will need to create a .env file in the mongo directory with your credentials
			DB_ADMIN=
			DB_PASSWORD=
