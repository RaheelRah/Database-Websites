# Database-Websites
This repository is our framework that handles all website related matters purely on the database instead of using the filesystem.

You require the following tables in the database that can be manifested with the SQL files.
You require the following assets folder for socket.io; bootstrap; jQuery; and swal.

Too create a page on the application insert the following formatted data in the database;
You need to insert a row into the paradigm table; the html table; and the datastring table.

Paradigm Table:
Domain: 
   "iprototype.com.au:7777"
URL:
   "/games"
HTML: 
    "Anything you want at the top of the page..."
JS:
   app = {
     boilerplate: "Experimental JS",
     desc: "Experimental JS is a framework designed to handle any query/paradigm in graph formatting.",
     links: {
       "/games": "games"
     },
     modules: ["games"]
  };

HTML Table:
  Name: 
  "games"
  HTML:
    &lt;li class="list-group-item bg-darker" data-repeat="games">
     {{x2}}
    </li&gt;
  DataString:
  ["games"]

DataString Table:
  X:
  "Games"
  Y:
  {x: "Games", y: "Games", z: "Games", x1: "SSBM", y2: "SSBM", z2: "SSBM"}
