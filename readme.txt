This repo contains a summary of the "Node.js Tutorial for Beginners Crash course" by envatoTuts+.
This code was tested under Windows 10 WSL2 Ubunti 24.04 and NodeJS V22.21.0. 

Original video:  https://youtu.be/gyQyk80_upM
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


