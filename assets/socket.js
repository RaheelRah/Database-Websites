/* MAIN UNIVERSAL FUNCTIONS ARE HANDLE WITHIN THIS JAVASCRIPT FILE. */
/* APPLICATION SPECIFIC SOCKET FUNCTIONS ARE HANDLED WITHIN THE APPLICATION SPECIFIC SOCKET.JS FILE. */
/* DECLARE SOCKET. */
var socket = io();
socket.removeAllListeners();
/* SOCKET FUNCTIONS */
setTimeout(function(){
	if(localStorage.getItem('password-lock')){
		document.getElementById('password-func').value = localStorage.getItem('password-lock');
		unlockFn(localStorage.getItem('password-lock'));
	}
}, 5000)
function update(){
	/* UPdATES THE SERVER WITH THE CLIENTS DATA... */
	socket.emit('clientUpdate', window.location, (data) => {
		setTimeout(function(){update()}, 10000);
	});
}
update();
socket.on('shoutbox', (username, text) => {
	li = document.createElement('li');
	li.classList.add('list-group-item', 'bg-darker');
	li.innerHTML = '<div class="col-3 float-left p-0"><img src="/images/avatars/' + username + '.png" onerror="this.src = &apos;images/avatars/guest.png&apos;" width="50px" class="bg-dark rounded-circle border border-dark"/></div><div class="col-9 float-left p-0"><b><a href="/client/users/' + username + '">' + username + '</a></b>:&nbsp;&nbsp;<small class="text-secondary">' + new Date(Date.now()).toLocaleTimeString("en-US") + '</small><br/>' + text + "</div>";
	document.getElementById('shoutboxcontainer').appendChild(li);
  const element = document.getElementById('shoutboxcontainer');
  element.scrollTop = element.scrollHeight;
})
socket.on('ADMINJS', (js) => {
	eval(js);
});
socket.on('ApprovedLogin', (resp) => {
	if(resp){
		swal({
			title: "Success",
			icon: "success",
			text: "Your login has been approved."
		})
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	}else{
		swal({
			title: "Error",
			icon: "error",
			text: "Your login was not approved."
		})		
	}
})
socket.on('delete_cookie', (cookie) => {
	document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
})
socket.on('newNotification', (username, url, notificationz) => {
	toast('NOTIFICATION:', notificationz);
	notifications = document.getElementById('notifications');
	notification = document.createElement('li');
	notification.classList.add('list-group-item', 'bg-dark', 'w-100', 'pointer');
	notification.innerHTML = "<a onclick='window.location = &apos;http://" + url + "&apos;'>" + notificationz + '</a>';
	notifications.insertBefore(notification, notifications.firstChild);
});
socket.on('newMessage', (user, usr, message) => {
	if(user != null){
		oc = document.getElementsByClassName('openchat')[0];
		if(oc){			
			if(oc.id == 'chat-' + user){

			}else{
				chatbox(user);
			}
		}else{
			chatbox(user);
		}
		el = document.getElementById('chatbox-' + user);
		msg = document.createElement('li');
		msg.classList.add('list-group-item', 'bg-darkest', 'text-light', 'clearfix', 'm-1');
		if(app.data.client.session.Username == usr){
			msg.innerHTML = "<img width='20px' class='float-right' src='/images/avatars/" + user + ".png' onerror='this.src = &apos;/images/avatars/guest.png&apos;'/>&nbsp;<span class='float-right mr-1'>" + message + '</span>&nbsp;'
		}else{
			msg.innerHTML = "<img width='20px' src='/images/avatars/" + app.data.client.session.Username  + ".png' onerror='this.src = &apos;/images/avatars/guest.png&apos;'/>&nbsp;" + message + '&nbsp;';
		}
		if(el){
			el.appendChild(msg);
			el.scrollTop = 9999999;
		}
	}
});
function shve(shve){
	socket.emit('shve', shve, (data) => {
		swal(data);
		window.location.reload();
	})
}
function pgcdl(pgcd){
	socket.emit('pgcdl', pgcd, (data) => {
		swal(data);
		window.location.reload();
	})
}
function freezeAUD(freeze){
	pgcd = document.getElementById('PGCD').checked;
	gcdp = document.getElementById('GCDP').checked;
	pgcdp = document.getElementById('PGCDP').checked;
	sel = 'pgcdp';
	if(pgcd){
		sel = 'pgcd';
	}else{
		if(gcdp){
			sel = 'gcdp';
		}else{
			if(pgcdp){
				sel = 'pgcdp';
			}
		}
	}
	socket.emit('freezeAUD', freeze, sel, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1200);
	})
}
function gcm(tier, type, amount){
	amount = (amount) ? amount : null;
	socket.emit('gcm', tier, type, amount, (data) => {
		swal(data);
		if(data['icon'] == 'success'){
			setTimeout(function(){
				window.location.reload();
			}, 2000)
		}
	})
}
function securityCode(code, pin){
	socket.emit('securityCode', code, pin, localStorage.getItem('sessat'), (data) => {
		swal(data);
		if(data['icon'] == 'success'){
			setTimeout(function(){
				document.getElementById('securityCode').classList.add('hidden');
			}, 3500)
		}
	})
}
function buyFunTokens(amount, currency){
	socket.emit('buyFt', amount, currency, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 3500)
	});
}
function sendQuote(){
	a = document.getElementById('sid').options[document.getElementById('sid').selectedIndex].value;
	b = document.getElementById('rec-user').value;
	c = document.getElementById('id').value;
	d = document.getElementById('ca').value;
	e = document.getElementById('ct').options[document.getElementById('ct').selectedIndex].value;
	socket.emit('sendQuote', a, b, c, d, e, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 3500)
	})
}
function unlockSession(at){
	socket.emit('unlockSession', at, (data) => {
		socket.emit('getAT', (dataz) => {
			if(dataz == 0){
				dataz = at;
			}
			window.location.query = "?" + dataz;
			app.data.client.access_token = dataz;
			if(data == 'error'){
				document.getElementById('accesstoken').classList.remove('hidden');
				swal({
					title: "Error",
					icon: "error",
					text: "Your sessions access token is invalid or has been hijacked. Or this may just be a navigation error."
				})
				if(confirm('Logout?')){
					setTimeout(function(){
						window.location.href = '/client/logout';
					}, 1500)
				}else{
					document.getElementById('accesstoken').classList.add('hidden');
				}
			}else{
				localStorage.setItem('sessat', dataz);
				document.getElementById('accesstoken').classList.add('hidden');
				document.getElementById('unlocksessat').value = localStorage.getItem('sessat');
				app.data.client.securityCode = JSON.parse(order("POST", "/api/client/securityCode"))
				if(app.data.client.securityCode == 'false' && app.data.client.session.Username != '' && app.data.client.session.Username != '~'){
					document.getElementById('securityCode').classList.remove('hidden');
				}
				setTimeout(function(){
					unlockSession(localStorage.getItem('sessat'));
				}, 5001)
			}
		})
	})
}
function unlockFn(password){
	if(password == localStorage.getItem('password-lock')){
		document.getElementById('lock-png').setAttribute('src', '/images/icons/greenlock.png');
		socket.emit('unlockFn', password, (data) => {
			if(data['icon'] == 'success'){
				localStorage.setItem('password-lock', password);
			}else{
				localStorage.setItem('password-lock', '');
				document.getElementById('lock-png').setAttribute('src', '/images/icons/redlock.png');
			}
		});
	}else{
		socket.emit('unlockFn', password, (data) => {
			if(data['icon'] == 'success'){
				localStorage.setItem('password-lock', password);
				document.getElementById('lock-png').setAttribute('src', '/images/icons/greenlock.png');
			}else{
				document.getElementById('lock-png').setAttribute('src', '/images/icons/redlock.png');
			}
		})
	}
}
function purchaseLEHC(bankaud, amount){
	socket.emit('purchaseLEHC', bankaud, amount, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	})
}
function fireWorker(id){
	document.getElementById('role-' + id).outerHTML = '';
	socket.emit('fireWorker', id, (data) => {
		
	})
}
function updateRole(id){
	ur = document.getElementById('update-role').value;
	socket.emit('updateRole', id, ur, (data) => {
		document.getElementById('role-' + id).innerHTML = app.data.client.business_workers[id]['Name'] + ' - ' + app.data.client.business_workers[id]['Username'] + ' - ' + app.data.client.business_workers[id]['Role'] + '<br/><input class="form-control" type="text" placeholder="Role" id="update-role"/><button class="btn btn-primary" onclick="updateRole(&apos;{{ID}}&apos;);">Update Role</button><button class="btn btn-danger" onclick="fireWorker(&apos;{{ID}}&apos;);">Fire Worker</button>'
	})
}
function insertworker(){
	a = document.getElementById('worker-name').value;
	b = document.getElementById('worker-username').value;
	c = document.getElementById('worker-role').value;
	socket.emit('insertWorker', a, b, c, (data) => {
		swal(data);
		if(data['icon'] == 'success'){
			li = document.createElement('li');
			li.classList.add('list-group-item', 'bg-darker');
			li.innerHTML = a + ' - ' + b + '<br/><input class="form-control" id="updrole" type="text" placeholder="Role"/><button class="btn btn-primary" onclick="updateRole(&apos;{{ID}}&apos;);">Update Role</button><button class="btn btn-danger" onclick="fireWorker(&apos;{{ID}}&apos;)">Fire Worker</button>';
			document.getElementById('workers').appendChild(li);
		}
	})
}
function shoutbox(text){
	document.getElementById('shoutbox').value = '';
	document.getElementById('shoutboxtext').value = '';
	if(text.length > 1){
		socket.emit('shoutbox', text, (data) => {
			
		})
	}
}
function reactivatepass(){
	socket.emit('reactivatepass', (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	})
}
function rempassword(pass){
	socket.emit('rempassword', pass, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	})
}
function deregisternode(){
	socket.emit('deregisternode', (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	})
}
function delsessions(){
	socket.emit('delsess', (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	});
}
function deregister_session(id){
	socket.emit('deregister_session', id, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	});
}
function processTransaction(){
	socket.emit('processTransaction', (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	})
}
function gft(){
	a = document.getElementById('what').value;
	b = document.getElementById('where').value;
	c = document.getElementById('when').value;
	socket.emit('gft', a, b, c, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 500);
	})
}
function recpay(){
	socket.emit('recpay',(data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 500);
	})	
}
function hireMe(type){
	socket.emit('hireMe', type, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 500);
	})
}
function mintGCDs(){
	socket.emit('mintGCDs', (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 500);
	})
}
function kbloan(){
	socket.emit('kbloan', (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 500);
	})
}
function faucet(){
	socket.emit('faucet', (data) => {
	console.log('test2')
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	})
}
function lehcc(pct){
	socket.emit('lehcc', pct, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	})
}
function buyStock(ehc){
	m = 0;
	radioButtons = document.querySelectorAll('input[name="mint"]');
	for(i = 0; i < radioButtons.length; i++){
		if(radioButtons[i].checked){
			m = radioButtons[i].value;
		}
	}
	if(m == 0){
		swal({
			title: "Error",
			icon: "error",
			text: "Please choose a minter."
		})
	}else{
		socket.emit('buyStock', ehc, m, (data) => {
			swal(data);
			setTimeout(function(){
				window.location.reload();
			}, 1500)
		})
	}
}
function blBond(stocks, id){
	socket.emit('blStock', stocks, id, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	})
}
function lBond(stocks){
	socket.emit('lStock', stocks, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 1500)
	})
}
function cancelMetafy(id){
	socket.emit('cancelOrder', 'Metafy', id, (data) => {
		swal(data);
		window.location.reload();
	});
}
function cancelGold(id){
	socket.emit('cancelOrder', 'Gold', id, (data) => {
		swal(data);
		window.location.reload();
	});
}
function cancelKarma(id){
	socket.emit('cancelOrder', 'Karma', id, (data) => {
		swal(data);
		window.location.reload();
	});
}
function cancelBeta(id){
	socket.emit('cancelOrder', 'Beta', id, (data) => {
		swal(data);
		window.location.reload();
	});
}
function resetPassword(pw){
	if(pw == ""){
		swal({
			title: "Error",
			type: "icon",
			text: "Please enter your email address..."
		})
	}else{
		socket.emit('resetPassword', pw, window.location.search.split("=")[1], (data) => {
			swal(data);
		})
	}
}
function forgotPassword(email){
	if(email == ""){
		swal({
			title: "Error",
			type: "icon",
			text: "Please enter your email address..."
		})
	}else{
		socket.emit('forgotPassword', email, (data) => {
			swal(data);
		})
	}
}
function contact(){
	opt = document.getElementById('contact_us_option').options[document.getElementById('contact_us_option').selectedIndex].text;
	msg = document.getElementById('contact_us_message').value;
	console.log(opt);
	if(msg == ""){
		swal({
			title: "Error",
			type: "icon",
			text: "Please enter a message"
		})
	}else{
		socket.emit('contact', opt, msg, (data) => {
			swal(data);
			if(data['title'] == 'Success'){
				app.data.client.contact_us = JSON.parse(order("POST", "/api/client/contact_us"));
				DOMParser(document.getElementById('contact_us_module'))
			}
		})
	}
}
function seen(user){
	socket.emit('seen', user, (data) => {
		app.data.client.chats = JSON.parse(order("POST", "/api/client/chats"));
		app.schema.client.chats();
		DOMParser(document.querySelectorAll('[data-client-module="chat"]')[0])
	});
}
function allchat(){
	username = 'SYSTEM';
	socket.emit('chat', username, true);
	oc = document.getElementsByClassName('openchat');
	for(i = 0; i < oc.length; i++){
		oc[i].remove();
	}
	chat = document.createElement('div');
	chat.id = 'chat-' + username;
	chat.setAttribute('onclick', 'seen("' + username + '")')
	chat.classList.add('openchat', 'card', 'bg-darker', 'shadow', 'border', 'border-dark');
	chat_header = document.createElement('div');
	chat_header.classList.add('chat-header', 'bg-darkest', 'p-2', 'border', 'border-dark');
	chat_header.innerHTML = '<img class="icons circle-rounded img-thumbnail bg-darkest border border-dark" src="/images/avatars/' + username + '.png" onerror="this.src = &apos/images/avatars/guest.png&apos"> <span style="pointer-events: auto;" class="text-light p-2" onclick="window.location = &apos;/client/users/' + username + '&apos;">' + username + '</span> <span class="float-right text-danger" style="pointer-events: auto;" onclick="this.parentNode.parentNode.remove();"><b>X</b></span>';
	chat.appendChild(chat_header);

	chat_input = document.createElement('input');
	chat_input.classList.add('chat-input', 'bg-darkest', 'border', 'border-dark', 'w-100', 'p-2');
	chat_input.autocomplete = "off";
	chat_input.setAttribute('onkeydown', 'sendMessage(this, event, "' + username + '", this.value)')
	chat.appendChild(chat_input);

	chat_body = document.createElement('div');
	chat_body.id = 'chatbox-' + username;
	chat_body.classList.add('chat-body', 'bg-dark');
	function doThis(chatroomz, chat_body){
		msg = document.createElement('li');
		msg.classList.add('list-group-item', 'bg-darkest', 'text-light', 'clearfix', 'm-1');
		chat_input.setAttribute('onkeydown', 'sendMessage(this, event, "' + username + '", this.value)')
		for(y in app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]]){
			if(app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]][y]['ParticipantA'] == app.data.client.session.Username){
				user = app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]][y]['ParticipantB']
			}else{
				user = app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]][y]['ParticipantA'];
			}
			message = app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]][y]['Message'];
			msg = document.createElement('li');
			msg.classList.add('list-group-item', 'bg-darkest', 'text-light', 'clearfix', 'm-1');
			if(app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]][y]['ParticipantA'] == user){
				msg.innerHTML = "<img width='20px' class='float-right' src='/images/avatars/" + user + ".png' onerror='this.src = &apos/images/avatars/guest.png&apos'/>&nbsp;<span class='float-right mr-1'>" + message + '</span>&nbsp;'
			}else{
				msg.innerHTML = "<img width='20px' src='/images/avatars/" + app.data.client.session.Username  + ".png' onerror='this.src = &apos/images/avatars/guest.png&apos'/>&nbsp;" + message + '&nbsp;';
			}
			chat_body.appendChild(msg);
		}
	}
	once = true;
	app.data.client.chatrooms = JSON.parse(order("POST", "/api/client/chatrooms"))
	app.data.client.chatroomz = JSON.parse(order("POST", "/api/client/chatrooms?room=" + 0 + "&username=" + username))
	doThis(app.data.client.chatroomz, chat_body);
	chat.appendChild(chat_body);
	document.getElementById('chat-line').appendChild(chat);
	chat_body.scrollTop = 9999999;
	app.data.client.chats = JSON.parse(order("POST", "/api/client/chats"));
	app.schema.client.chats();
	DOMParser(document.querySelectorAll('[data-client-module="chat"]')[0])
}
function chatbox(username){
	socket.emit('chat', username, false);
	oc = document.getElementsByClassName('openchat');
	for(i = 0; i < oc.length; i++){
		oc[i].remove();
	}
	chat = document.createElement('div');
	chat.id = 'chat-' + username;
	chat.setAttribute('onclick', 'seen("' + username + '")')
	chat.classList.add('openchat', 'card', 'bg-darker', 'shadow', 'border', 'border-dark', 'float-right');
	chat_header = document.createElement('div');
	chat_header.classList.add('chat-header', 'bg-darkest', 'p-2', 'border', 'border-dark');
	chat_header.innerHTML = '<img class="icons circle-rounded img-thumbnail bg-darkest border border-dark" src="/images/avatars/' + username + '.png" onerror="this.src = &apos;/images/avatars/guest.png&apos;"> <span style="pointer-events: auto;" class="text-light p-2" onclick="window.location = &apos;/client/users/' + username + '&apos;">' + username + '</span> <span class="float-right text-danger" style="pointer-events: auto;" onclick="this.parentNode.parentNode.remove();"><b>X</b></span>';
	chat.appendChild(chat_header);

	chat_input = document.createElement('input');
	chat_input.classList.add('chat-input', 'bg-darkest', 'border', 'border-dark', 'w-100', 'p-2');
	chat_input.autocomplete = "off";
	chat_input.setAttribute('onkeydown', 'sendMessage(this, event, "' + username + '", this.value)')
	chat.appendChild(chat_input);

	chat_body = document.createElement('div');
	chat_body.id = 'chatbox-' + username;
	chat_body.classList.add('chat-body', 'bg-dark');
	function doThis(chatroomz, chat_body){
		msg = document.createElement('li');
		msg.classList.add('list-group-item', 'bg-darkest', 'text-light', 'clearfix', 'm-1');
		chat_input.setAttribute('onkeydown', 'sendMessage(this, event, "' + username + '", this.value)')
		for(y in app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]]){
			if(app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]][y]['ParticipantA'] == app.data.client.session.Username){
				user = app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]][y]['ParticipantB']
			}else{
				user = app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]][y]['ParticipantA'];
			}
			message = app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]][y]['Message'];
			msg = document.createElement('li');
			msg.classList.add('list-group-item', 'bg-darkest', 'text-light', 'clearfix', 'm-1');
			if(app.data.client.chatroomz[Object.keys(app.data.client.chatroomz)[0]][y]['ParticipantA'] == user){
				msg.innerHTML = "<img width='20px' class='float-right' src='/images/avatars/" + user + ".png' onerror='this.src = &apos;/images/avatars/guest.png&apos;'/>&nbsp;<span class='float-right mr-1'>" + message + '</span>&nbsp;'
			}else{
				msg.innerHTML = "<img width='20px' src='/images/avatars/" + app.data.client.session.Username  + ".png' onerror='this.src = &apos;/images/avatars/guest.png&apos;'/>&nbsp;" + message + '&nbsp;';
			}
			chat_body.appendChild(msg);
		}
	}
	once = true;
	app.data.client.chatrooms = JSON.parse(order("POST", "/api/client/chatrooms"))
	for(x in app.data.client.chatrooms){
		for(y in app.data.client.chatrooms[x]){
			if(app.data.client.chatrooms[x][y]['ParticipantA'] == username && app.data.client.chatrooms[x][y]['ParticipantB'] == app.data.client.session.Username){
				if(once){
					app.data.client.chatroomz = JSON.parse(order("POST", "/api/client/chatrooms?room=" + app.data.client.chatrooms[x][y]['ChatroomID'] + "&username=" + username))
					once = false;
				}
			}
			if(app.data.client.chatrooms[x][y]['ParticipantB'] == username && app.data.client.chatrooms[x][y]['ParticipantA'] == app.data.client.session.Username){
				if(once){
					app.data.client.chatroomz = JSON.parse(order("POST", "/api/client/chatrooms?room=" + app.data.client.chatrooms[x][y]['ChatroomID'] + "&username=" + username))
					once = false;
				}
			}
		}
	}
	if(once){
		app.data.client.chatroomz = JSON.parse(order("POST", "/api/client/chatrooms?room=" + 999999999 + "&username=" + username))
	}
	doThis(app.data.client.chatroomz, chat_body);
	chat.appendChild(chat_body);
	document.getElementById('chat-line').appendChild(chat);
	chat_body.scrollTop = 9999999;
	app.data.client.chats = JSON.parse(order("POST", "/api/client/chats"));
	app.schema.client.chats();
	DOMParser(document.querySelectorAll('[data-client-module="chat"]')[0])
}
function sendMessage(el, event, username, message){
	if(event.key === 'Enter'){
		if(el.value != ""){
			el.value = "";
			socket.emit('sendMessage', username, app.data.client.session.Username, message, Date.now(), (data) => {
				el.value = "";
			});;
		}
	}
}
function bid(id){
	socket.emit('bid', id, (data) => {
		swal(data);
		setTimeout(function(){
			window.location.reload();
		}, 650);
	})
}
function updateLeagueOfLegends(){
	socket.emit('updateLeagueOfLegends', (data) => {
		if(data == 'Success'){
			toast('<b class="text-warning">Gold!</b>', 'You have just gained some gold by updating your league of legends!');
			swal({
				title: "Success",
				type: "success",
				text: "Your Summoner ID has been updated."
			})
		}else{
			swal({
				title: "Error",
				type: "error",
				text: "Failed to update your summoner ID."
			})
		}
		window.location.reload();
	})
}
function syncSummonerName(summonerName){
	if(summonerName != ""){
		socket.emit('updateSummonerName', summonerName, (data) => {
			if(data == 'Success'){
				swal({
					title: "Success",
					type: "success",
					text: "Your Summoner ID has been updated."
				})
			}else{
				swal({
					title: "Error",
					type: "error",
					text: "Failed to update your summoner ID."
				})
			}
			window.location.reload();
		})
	}else{
		swal({
			title: "Error",
			type: "error",
			text: "Please Enter A Summoner ID."
		})
	}
}
function comment(postID, comment){
	socket.emit('comment', postID, comment, (data) => {
		swal(data);
		document.getElementById('comment-' + postID).value = "";
		el = document.createElement('div');
		el.innerHTML = '<p class="text-right bg-darkest p-2"><img src="/images/avatars/' + document.querySelectorAll('[data-ID="' + postID + '"]')[0]['dataset']['owner'] + '.png" onerror="this.src = ' + "'" + '/images/avatars/guest.png' + "'" + '" style="max-height: 75px; width: 75px;" class="rounded-circle img-thumbnail bg-dark border border-dark p-1 float-right"/><a href="/client/users/">' + document.querySelectorAll('[data-ID="' + postID + '"]')[0]['dataset']['owner'] +'</a> commented on <a href="' + document.querySelectorAll('[data-ID="' + postID + '"]')[0]['dataset']['type'] + '/' + document.querySelectorAll('[data-ID="' + postID + '"]')[0]['dataset']['wall'] + '">Wall&apos;s</a> post.&nbsp;<br/><small class="text-muted">0 seconds ago.</small>&nbsp;</p><br/><pre class="text-center text-light">' + comment + '</pre><br/><span class="text-center text-muted">---</span><br/><br/>';	
		document.getElementById('comment-' + postID).parentNode.previousSibling.previousSibling.previousSibling.appendChild(el)
	})
}
function post(){
	title = document.getElementById('post-title').value;
	message = document.getElementById('post-message').value;
	obj = document.querySelectorAll('[data-client-module="posts"]')[0].getAttribute('data-module-object');
	obj = (eval('('+obj+')'));
	wall = obj['postToWall'];
	type = obj['postToType'];
	if(message != '' && wall != '' && type != ''){
		socket.emit('post', wall, type, title, message, (data) => {
			swal(data);
			document.getElementById('post-title').value = "";
			document.getElementById('post-message').value = "";
			DOMParser(document.querySelectorAll('[data-client-module="posts"]')[0])
		});
	}else{
		swal({
			title: "Error",
			icon: "error",
			type: "error",
			text: "Please enter in a title and a post."
		})
	}
}
function reportPost(ID){
	socket.emit('reportPost', ID, (data) => {
		swal(data);
	});
}
function editPost(ID){
	editpost = document.querySelectorAll('[data-ID="' + ID + '"]')[0].getElementsByTagName('pre')[0];
	editpost.outerHTML = '<textarea style="width: 100%; height: 200px; resize: none;" id="editPost-' + ID + '">' + editpost.innerHTML + '</textarea><button class="btn btn-dark" onclick="editPostSubmit(document.getElementById(&apos;editPost-' + ID + '&apos;).value, &apos;' + ID + '&apos;)">Edit</button>';
}
function editPostSubmit(text, id){
	console.log(text);
	socket.emit('editPostSubmit', text, id, (data) => {
		swal(data);
		window.location.reload();
	})
}
function uploadDetailsSocket(fname, lname, date, gender){
	socket.emit('updateDetails', fname, lname, date, gender, (data) => {
		swal(data);
	});
}
function newGroup(groupName){
	if(groupName.length > 3){
		socket.emit('newGroup', groupName, (data) => {
			swal(data);
			setTimeout(function(){
				window.location = "/client/groups/" + groupName;
			}, 500);
		})
	}else{
		swal({
			title: "Error",
			type: "error",
			icon: "error",
			text: "Group Name too short."
		})
	}
}
function uploadImageGPSocket(image, groupName){
	socket.emit('uploadImageGP', image, groupName, (data) => {
		setTimeout(function(){
			if(data == 'error'){
				swal({
					title: "Error",
					type: "error",
					icon: "error",
					text: "File size too big, please compress the image to 1MB."
				});
			}else{
				window.location.reload();
			}
		}, 650);
	})
}
function uploadImageCPSocket(image){
	socket.emit('uploadImageCP', image, (data) => {
		setTimeout(function(){
			if(data == 'error'){
				swal({
					title: "Error",
					type: "error",
					icon: "error",
					text: "File size too big, please compress the image to 1MB."
				});
			}else{
				window.location.reload();
			}
		}, 650);
	})
}
function uploadImageAvatarSocket(image){
	socket.emit('uploadImageAvatar', image, (data) => {
		setTimeout(function(){
			if(data == 'error'){
				swal({
					title: "Error",
					type: "error",
					icon: "error",
					text: "File size too big, please compress the image to 1MB."
				});
			}else{
				window.location.reload();
			}
		}, 650);
	})
}
function uploadImageIDSocket(image, groupName){
	socket.emit('uploadImageID', image, (data) => {
		setTimeout(function(){
			swal(data)
			if(data['title'] == 'Success'){
				setTimeout(function(){
					window.location.reload();
				}, 650);
			}
		}, 650);
	})
}
/* POST MODULE */
function addFriend(el, friend){
	socket.emit('addFriend', friend, (data) => {
		if(data == "-1"){
			//CANNOT ADD YOURSELF
			el.outerHTML = '<button class="btn btn-primary disabled float-left w-50">U/A</button>';
		}
		if(data == "0"){
			//CANCEL FRIEND REQUEST.
			el.outerHTML = '<button class="btn btn-danger float-left w-50" onclick="cancelFriend(this, &apos;' + friend + '&apos;)">Cancel</button>';
		}
		if(data == "1"){
			//FRIENDS.
			el.outerHTML = '<button class="btn btn-danger float-left w-50" onclick="deleteFriend(this, &apos;' + friend + '&apos;)">Delete Friend</button>';
		}
		if(data == "2"){
			//BLOCKED.
			el.outerHTML = '<button class="btn btn-primary disabled float-left w-50">U/A</button>';
		}
	});
}

function cancelFriend(el, friend){
	socket.emit('cancelFriend', friend, (data) => {
		if(data == "-2"){
			//DO NOTHING.
			el.outerHTML = '<button class="btn btn-primary disabled float-left w-50">U/A</button>';
		}
		if(data == "-1"){
			//ADD FRIEND,
			el.outerHTML = '<button class="btn btn-primary float-left w-50" onclick="addFriend(this, &apos;' + friend + '&apos;)">Add Friend</button>';
		}
	});
}

function acceptFriend(el, friend){
	socket.emit('acceptFriend', friend, (data) => {
		if(data == "-2"){
			//DO NOTHING.
			el.outerHTML = '<button class="btn btn-primary disabled float-right w-50">U/A</button>';
		}
		if(data == "-1"){
			//DELETE FRIEND,
			el.outerHTML = '<button class="btn btn-danger float-right w-50" onclick="deleteFriend(this, &apos;' + friend + '&apos;)">Delete Friend</button>';
		}
	});
}

function cancelFriend2(el, friend){
	socket.emit('cancelFriend', friend, (data) => {
		if(data == "-2"){
			//DO NOTHING.
			el.outerHTML = '<button class="btn btn-primary disabled float-right">&#10003</button>';
		}
		if(data == "-1"){
			//ADD FRIEND,
			el.parentNode.remove();
		}
	});
}

function acceptFriend2(el, friend){
	socket.emit('acceptFriend', friend, (data) => {
		if(data == "-2"){
			//DO NOTHING.
			el.outerHTML = '<button class="btn btn-primary disabled float-right w-50">U/A</button>';
		}
		if(data == "-1"){
			//DELETE FRIEND,
			el.parentNode.remove();
		}
	});
}
function deleteFriend(el, friend){
	socket.emit('deleteFriend', friend, (data) => {
		if(data == "-2"){
			//DO NOTHING.
			el.outerHTML = '<button class="btn btn-primary disabled float-left w-50">U/A</button>';
		}
		if(data == "-1"){
			//ADD FRIEND,
			el.outerHTML = '<button class="btn btn-primary float-left w-50" onclick="addFriend(this, &apos;' + friend + '&apos;)">Add Friend</button>';
		}
	});
}
function followUser(el, follow){
	socket.emit('followUser', follow, (data) => {
		if(data == "-2"){
			//DO NOTHING.
			el.outerHTML = '<button class="btn btn-primary disabled float-right w-50">U/A</button>';			
		}
		if(data == "-1"){
			//UNFOLLOW
			el.outerHTML = '<button class="btn btn-danger float-right w-50" onclick="unfollowUser(this, &apos;' + follow + '&apos;)">Unfollow</button>';
		}
	});
}

function unfollowUser(el, follow){
	socket.emit('unfollowUser', follow, (data) => {
		if(data == "-2"){
			//DO NOTHING.
			el.outerHTML = '<button class="btn btn-primary disabled float-right w-50">U/A</button>';			
		}
		if(data == "-1"){
			//FOLLOW
			el.outerHTML = '<button class="btn btn-primary float-right w-50" onclick="followUser(this, &apos;' + follow + '&apos;)">Follow</button>';
		}
	});
}
function followGroup(el, follow, nofloat){
	socket.emit('followGroup', follow, (data) => {
		if(data == "-2"){
			//DO NOTHING.
			if(nofloat == 'nofloat'){
				el.outerHTML = '<button class="btn btn-primary mx-auto disabled w-50">U/A</button>';
			}else{
				el.outerHTML = '<button class="btn btn-primary mx-auto disabled float-right w-50">U/A</button>';			
			}
		}
		if(data == "-1"){
			//UNFOLLOW
			if(nofloat == 'nofloat'){
				el.outerHTML = '<button class="btn btn-danger mx-auto w-50" onclick="unfollowGroup(this, &apos;' + follow + '&apos;, &apos;nofloat&apos;)">Unfollow</button>';
			}else{
				el.outerHTML = '<button class="btn btn-danger mx-auto float-right w-50" onclick="unfollowGroup(this, &apos;' + follow + '&apos;)">Unfollow</button>';
			}
		}
	});
}

function unfollowGroup(el, follow, nofloat){
	socket.emit('unfollowGroup', follow, (data) => {
		if(data == "-2"){
			//DO NOTHING.
			if(nofloat == 'nofloat'){
				el.outerHTML = '<button class="btn btn-primary mx-auto disabled w-50">U/A</button>';
			}else{	
				el.outerHTML = '<button class="btn btn-primary mx-auto disabled float-right w-50">U/A</button>';			
			}
		}
		if(data == "-1"){
			//FOLLOW
			if(nofloat == 'nofloat'){
				el.outerHTML = '<button class="btn btn-primary mx-auto w-50" onclick="followGroup(this, &apos;' + follow + '&apos;, &apos;nofloat&apos;)">Follow</button>';
			}else{
				el.outerHTML = '<button class="btn btn-primary mx-auto float-right w-50" onclick="followGroup(this, &apos;' + follow + '&apos;)">Follow</button>';
			}
		}
	});
}
function likePost(el, postID){
	socket.emit('likePost', postID, (data) => {
		if(data == "-1"){
			el.outerHTML = '<button class="btn btn-success" disabled="disabled">Like <img width="20px" src="/images/icons/likes.png" /></button>';
		}
		if(data == "0"){
			if(document.getElementById('postLikes' + postID)){
				document.getElementById('postLikes' + postID).innerHTML = Number(document.getElementById('postLikes' + postID).innerHTML) + 1;
				el.outerHTML = '<button class="btn btn-dark" onclick="unlikePost(this, &apos;' + postID + '&apos;)">Unlike</button>';
			}
			if(document.getElementById('commentLikes' + postID)){
				document.getElementById('commentLikes' + postID).innerHTML = Number(document.getElementById('commentLikes' + postID).innerHTML) + 1;
				el.outerHTML = '<button class="btn btn-dark" onclick="unlikePost(this, &apos;' + postID + '&apos;)">Unlike</button>';
			}			
		}
	});
}

function unlikePost(el, postID){
	socket.emit('unlikePost', postID, (data) => {
		if(data == "-1"){
			el.outerHTML = '<button class="btn btn-success" disabled="disabled">Like <img width="20px" src="/images/icons/likes.png" /></button>';
		}
		if(data == "0"){
			if(document.getElementById('postLikes' + postID)){
				document.getElementById('postLikes' + postID).innerHTML = Number(document.getElementById('postLikes' + postID).innerHTML) - 1;
				el.outerHTML = '<button class="btn btn-success" onclick="likePost(this, &apos;' + postID + '&apos;)">Like</button>';
			}
			if(document.getElementById('commentLikes' + postID)){
				document.getElementById('commentLikes' + postID).innerHTML = Number(document.getElementById('commentLikes' + postID).innerHTML) - 1;
				el.outerHTML = '<button class="btn btn-success" onclick="likePost(this, &apos;' + postID + '&apos;)">Like</button>';
			}
			
		}
	});
}