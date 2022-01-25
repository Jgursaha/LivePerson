const https = require('https')
const http = require('http')

/** Retrieve idp domain **/
http.get('http://api.liveperson.net/api/account/8368687/service/idp/baseURI.json?version=1.0', res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const idp_domain = JSON.parse(Buffer.concat(data).toString());
    console.log(idp_domain)
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});


/** Retrieve asyncMessagingEnt domain **/
/** Readability and maintenence improvement opportunity: Function to make http calls **/
http.get('http://api.liveperson.net/api/account/8368687/service/asyncMessagingEnt/baseURI.json?version=1.0', res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const asyncMessagingEnt_domain = JSON.parse(Buffer.concat(data).toString());
    console.log(asyncMessagingEnt_domain)
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});



/** Request Consumer jwt **/
let consumer_jwt = []
const axios = require('axios')

axios
  .post('https://sy.idp.liveperson.net/api/account/8368687/signup', {
    todo: 'consumer jwt'
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    //console.log(res)
    
    consumer_jwt = res.data.jwt

    console.log(consumer_jwt)
  })
  .catch(error => {
    console.error(error)
  })

console.log("NEXT STEP")

/* Create a Web Socket Connection */
// Create a new WebSocket.
const WebSocket = require('ws')
 
const url = 'wss://sy.msg.liveperson.net/ws_api/account/8368687/messaging/consumer?v=3'


var options = {

    headers: {
        Authorization : "jwt " + consumer_jwt
    }
};

//var ws = new WebSocket("wss://sy.msg.liveperson.net/ws_api/account/8368687/messaging/consumer?v=3", options);

const connection = new WebSocket(url, options)

connection.onopen = () => {
  connection.send({"kind":"req","id":1,"type":"cm.ConsumerRequestConversation"}) 
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
  console.log(error)
}
 
connection.onmessage = (e) => {
  console.log(e.data)
}