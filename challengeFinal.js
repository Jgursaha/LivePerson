const http = require('http')
const axios = require('axios')
//const axios = require('axios').default;

var aMEBaseURI;
var idpBaseURI;
var messageResp;
var convID;
const WebSocket = require('ws')
const WebSocketAwait = require('ws-await')
 
const url = 'wss://sy.msg.liveperson.net/ws_api/account/8368687/messaging/consumer?v=3'





const getAMERequest = async() => {
	try{

    //retrieve asyncMessagingEnt baseURI
		const resp = await axios.get('http://api.liveperson.net/api/account/8368687/service/asyncMessagingEnt/baseURI.json?version=1.0');
		aMEBaseURI = resp.data;
		console.log(aMEBaseURI["baseURI"]);

    //retrieve idp baseURI
    const resp1 = await axios.get('http://api.liveperson.net/api/account/8368687/service/idp/baseURI.json?version=1.0');
    idpBaseURI = resp1.data;
    console.log(idpBaseURI["baseURI"]);

    console.log(aMEBaseURI["service"])

    //retrieve consumer JWT
    const resp2 = await axios.post('https://sy.idp.liveperson.net/api/account/8368687/signup', {
      todo: 'consumer jwt'
    })
    consumer_jwt = resp2.data.jwt
    console.log("Consumer JWT Received...")
    console.log(consumer_jwt)

    //Open websocket connection
    var options = {
      headers: {
          Authorization : "jwt " + consumer_jwt
      }
    };

    const connection = new WebSocket(url, options);

    //Send a message
    connection.onopen = () => {
      console.log("IN ON OPEN")
      connection.send(JSON.stringify({
          "kind":"req",
          "id":1,
          "type":"cm.ConsumerRequestConversation"
        }, null, '\t')) 
      }

    //Handle errors
    connection.onerror = (error) => {
      console.log(`WebSocket error: ${error}`)
      console.log(error)
    }

 	//Process Response & extract conversation id
    connection.onmessage = (e) => {
      console.log("IN ON MESSAGE")
      messageResp = JSON.parse(e.data);
      console.log(messageResp);

      convID = messageResp.body.conversationId;
      console.log(convID);

      console.log("sending first message")

      connection.send(JSON.stringify({
          "kind":"req",
          "id":"2",
          "type":"ms.PublishEvent",
          "body": {
            "dialogId": convID,
            "event": {
              "type": "ContentEvent",
              "contentType": "text/plain",
              "message": "My first message"
            }
          }
      }, null, '\t')) 

      connection.close();
      
    }

    /*connection.onopen = () => {
      console.log("IN ON OPEN 2")
      

      //connection.close();
    }*/

    //connection.close();

	}
	catch (err){
		console.error(err);
	}
};

/*
const getIdpRequest = async() => {
  try{
    const resp = await axios.get('http://api.liveperson.net/api/account/8368687/service/idp/baseURI.json?version=1.0');
    idpBaseURI = resp.data;
    console.log(idpBaseURI["baseURI"]);
  }
  catch (err){
    console.error(err);
  }
};
*/

getAMERequest();

//getIdpRequest();


/* Create a Web Socket Connection */
// Create a new WebSocket.


//console.log(baseURI);
/*
axios.get('http://api.liveperson.net/api/account/8368687/service/asyncMessagingEnt/baseURI.json?version=1.0')
    .then(resp => {
    	console.log(resp.data);
    	baseURI = resp.data.service
    })



*/
 //let processed_data = JSON.parse(Buffer.concat(resp_data).toString());
 //console.log(resp_data);




/*
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
*/