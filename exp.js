/* DEFINE DEPENDENCIES, CONFIGURE EXPRESS APPLICATION AND CONNECT TO THE DATABASE. */
var port = 1234;
/* DEFINE PORT */
/* NODE MODULES */
var fs = require('fs');

/* IMPORT DEPENDENCIES. */
/* EXPRESS, HTTP SERVER, SOCKET.IO AND MYSQL */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {
  allowEIO3: true // false by default; system needs email verification security on purchases and transfers if this is allowed. 
});
/* MYSQL */
var mysql = require('mysql');
/* NPM MODULES */
var bcrypt = require('bcrypt');
var cors = require('cors')
/* EXPRESS MODULES */
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
/* CUSTOM MODULES */

/* CONFIGURE APPLICATION. */
app.use(cors())
app.use(express.static('C:/Users/Rahee/server'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.disable('x-powered-by');
/* CUSTOM MODULES */
var JS = require(__dirname + '/system/modules/JS.js');
var DATABASE = require(__dirname + '/system/modules/DATABASE.js');

/* IMPORT APPLICATIONS LIST. */
var applications = require(__dirname + '/system/applications.js');

/* CONFIGURE APPLICATION. */
app.use(cors())
app.use(express.static('server'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.disable('x-powered-by');


/* MYSQL CONNECTION */
var db;
function choke(){
  /* CREATE THE CONNECTION */
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    multipleStatements: true
  });
  /* CONNECT TO THE DB */
  db.connect(function(err){
    if(err){
      /* ERROR CONNECTING TO THE DATBASE */
    }
  });
  /* ERROR HANDLER */
  db.on('error', function(err){
    if(err.code == 'PROTOCOL_CONNECTION_LOST'){
      /* RECURSE FUNCTION */
      choke();
    }else{
      /* DATABASE ERROR. */
    }
  });
}
choke();

app.all('*', function(request, response, next){
  require(__dirname + '/system/modules/SESSION_Handler.js').handle(request, response, function(cookie){
    if(cookie != undefined){
      response.clearCookie("session");
      response.cookie("session", JSON.stringify(cookie), { maxAge: 3156700, httpOnly: true } );
      response.setHeader("Cache-Control", "public, max-age=2592000"); 
      response.setHeader("Expires", new Date(Date.now() + 2592000000))
      request.cookieData = cookie;
    }
    console.log(' - PING \n - USERNAME - ' + (request.cookieData ? request.cookieData.Username : 'UNKNOWN') + '\n - DATE - ' + new Date() + ' \n - IP - ' + request.ip + ' \n - URL - ' + request.headers.host + request.originalUrl);
    db.query(
      "SELECT * FROM GodPanel.Banlist WHERE IP = ? OR Username = ?",
      [
        request.ip,
        (request.cookieData) ? request.cookieData['Username'] : "~"
      ],
      function(error, banlist){
        db.query(
          "SELECT * FROM GodPanel.Offline",
          [

          ],
          function(error, offline){
            if(offline[0]['Offline'] == '1' && request.cookieData['Username'] != 'Rah1337' && request.cookieData['Username'] != 'Momo'){
                response.send(fs.readFileSync(__dirname + '/system/offline.html').toString());
                response.end();
            }
          }
        );
      }
    );
  });
})

app.get('/modules/*', function(request, response){
  url = request.originalUrl.split("/");
  db.query(
    "SELECT * FROM EXP.HTML WHERE Name = ?",
    [
      url[2]
    ],
    function(error, html){
      if(html[0]){
        datastring = eval(html[0]['DataString']);
        data_str = "{'" + url[2] + "': ["; 
        sql_string = 'WHERE ';
        for(x in datastring){
          data_str += "'" + datastring[x] + "'],[";
          sql_string += "X = '" + datastring[x] + "' OR "
        }
        sql_string = sql_string.substring(0, sql_string.length - 4);
        if(sql_string == 'WHERE '){
          sql_string = '';
        }
        data_str += "}";
        db.query(
          "SELECT * FROM EXP.DataStrings " + sql_string,
          [

          ],
          function(error, datastring){
            if(data_str == "{'" + url[2] + "': [}"){
              data_str = "['" + url[2] + "']";
            }
            if(data_str.indexOf("[}") != -1){
              data_str = data_str.substring(0, data_str.indexOf("[}") - 2);
            }
            if(data_str.indexOf(":") != -1){
              data_str += "]}"
            }
            data_str = "mergeObjects(app.data_str, [" + data_str + "]);"
            obj_str = 'mergeObjects(app.data, [{';
            if(datastring[0]){
              for(x in datastring){
                obj_str += datastring[x]['X'] + ": {"
                obj_str += datastring[x]['Z'] + "}}, {";
              }
            }
            obj_str = obj_str.substring(0, obj_str.length - 4/* - datastring[Object.keys(datastring).length - 1]['X'].length*/);
            if(obj_str[obj_str.length - 1] == '}'){
              obj_str += "}]";
            }
            obj_str += ");";
            if(obj_str.indexOf(" }]") != -1){
              obj_str = "mergeObjects(app_data, [{}]);";
            }
            response.write(((html[0]) ? html[0]['HTML'] : '') + '<script>' + data_str + obj_str + '</script>');
            response.end();     
          }
        ); 
      }
    }
  );
})


app.get('*', function(request, response){
  db.query(
    "SELECT * FROM EXP.Paradigm WHERE Domain = ? AND Url = ?",
    [
      request.headers.host,
      request.originalUrl.split("/")[1]
    ],
    function(error, p){
      response.send('<script>' + ((p[0]) ? p[0]['JS'] : '') + '</script>' + fs.readFileSync(__dirname + '/exp.html').toString() + '<script> document.getElementById("data-html-container").innerHTML += ' + "'" + ((p[0]) ? p[0]['HTML'] : '') + "<br/>'" + ';</script>');
      response.end();
    }
  );  
})

server.listen(port);
