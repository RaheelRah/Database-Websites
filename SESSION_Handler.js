/* IMPORT DEPENDENCIES. */
hostname = require('os');
var mysql = require('mysql');
var DATABASE = require(__dirname + '/DATABASE.js');
/* MYSQL CONNECTION */
var db;
function choke(){
	db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "DEFINITION991337OVER9000DIVIDEDBY10",
	  multipleStatements: true
	});
	/* CONNECT TO THE DB */
	db.connect(function(err){
		if(err){
		}
	});
	/* ERROR HANDLER */
	db.on('error', function(err){
		if(err.code == 'PROTOCOL_CONNECTION_LOST'){
			choke();
		}
	});
}
choke()

module.exports.handle = function(request, response, cb){
	function newsession(request){
		list = {};
		rc = request.headers.cookie;
		rc && rc.split(';').forEach(function( cookie ) {
	        var parts = cookie.split('=');
	        list[parts.shift().trim()] = decodeURI(parts.join('='));
	    });
	    os = ((list['_ga']) ? list['_ga'] : '') ? (list['_ga']) ? list['_ga'] : '' : '';
		db.query(
			"SELECT * FROM Client.Sessions WHERE IP = ? AND MachineName = ? AND OS = ? ORDER BY ID DESC LIMIT 1",
			[
				request.ip,
				encodeURIComponent(request.header('User-Agent')),
				os
			],
			function(error, results){
				if(results){
					if(results.length > 0){	
						cb(results[0]);
					}else{
						response.clearCookie('session');
						KeyVal = "[" + Math.random() * 999999999 + "][" + Date.now() + "]";
						db.query(
							"INSERT INTO Client.Sessions SET ?",
							session = {
								KeyVal: KeyVal,
								Username: "~",
								Href: encodeURIComponent(request.originalUrl),
								Online: "offline",
								Status: "Active",
								IP: request.ip,
								OS: os,
								MachineName: encodeURIComponent(request.header('User-Agent')),
								SocketID: (request.cookies.io) ? request.cookies.io : "",
								Latest: Date.now(),
								Since: Date.now()
							},
							function(error, result){
								if(session){
									delete session['MachineName'];
									delete session['OS'];
									delete session['IP'];
								}
								cb(session);
							}
						);
					}
				}else{
					response.clearCookie('session');
					KeyVal = "[" + Math.random() * 999999999 + "][" + Date.now() + "]";
					db.query(
						"INSERT INTO Client.Sessions SET ?",
						session = {
							KeyVal: KeyVal,
							Username: "~",
							Href: encodeURIComponent(request.originalUrl),
							Online: "offline",
							Status: "Active",
							IP: request.ip,
							OS: os,
							MachineName: encodeURIComponent(request.header('User-Agent')),
							SocketID: (request.cookies.io) ? request.cookies.io : "",
							Latest: Date.now(),
							Since: Date.now()
						},
						function(error, result){
							if(session[0]){
									delete session[0]['MachineName'];
									delete session[0]['OS'];
									delete session[0]['IP'];
							}
							cb(session[0]);
						}
					);
				}
			}
		);
	}
	DATABASE.getKeyVal(request, function(KeyVal){		
		list = {};
		rc = request.headers.cookie;
		rc && rc.split(';').forEach(function( cookie ) {
	        var parts = cookie.split('=');
	        list[parts.shift().trim()] = decodeURI(parts.join('='));
	    });
	    os = ((list['_ga']) ? list['_ga'] : '') ? (list['_ga']) ? list['_ga'] : '' : '';
		if(KeyVal){
			db.query(
				"SELECT * FROM Client.Sessions WHERE KeyVal = ? LIMIT 1",
				[
					KeyVal,
				],
				function(error, session){
					if(session){
						if(session.length > 0){
							if(session[0]){
								delete session[0]['MachineName'];
								delete session[0]['OS'];
								delete session[0]['IP'];
							}
							cb(session[0]);
						}else{
							response.clearCookie('session');
							newsession(request);
						}
					}else{
						response.clearCookie('session');
						newsession(request);
					}
				}
			);
		}else{
			db.query(
				"SELECT * FROM Client.Sessions WHERE IP = ? AND MachineName = ? AND OS = ? ORDER BY ID DESC LIMIT 1",
				[
					request.ip,
					encodeURIComponent(request.header('User-Agent')),
					os
				],
				function(error, results){
					if(results){
						if(results.length > 0){	
							if(results[0]){
								delete results[0]['MachineName'];
								delete results[0]['OS'];
								delete results[0]['IP'];
							}
							cb(results[0]);
						}else{
							response.clearCookie('session');
							newsession(request)
						}
					}else{
						response.clearCookie('session');
						newsession(request)
					}
				}
			);
		}
	});
}