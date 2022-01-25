const https = require('https')
const http = require('http')

/** Retrieve idp domain **/
var promise1 = new Promise(function(resolve, reject) {
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

    resolve()
  });

  res.on('error', err => {
  console.log('Error: ', err.message);
  reject()
  });
})
});
   
promise1.
    then(function () {
        console.log('Success, IDP baseURI retreived');
    }).
    catch(function () {
        console.log('Some error has occurred');
    });


/** Retrieve asyncMessagingEnt domain **/
/** Readability and maintenence improvement opportunity: Function to make http calls **/

var promise2 = new Promise(function(resolve, reject) {
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
    const idp_domain = JSON.parse(Buffer.concat(data).toString());
    console.log(idp_domain)

    resolve()
  });

  res.on('error', err => {
  console.log('Error: ', err.message);
  reject()
  });
})
});
   
promise2.
    then(function () {
        console.log('Success, asyncMessagingEnt baseURI retreived');
    }).
    catch(function () {
        console.log('Some error has occurred');
    });


var promise3 = new Promise(function(resolve, reject) {
  const x = "geeksforgeeks";
  const y = "geeksforgeeks"
  if(x === y) {
    resolve();
  } else {
    reject();
  }
});
   
promise3.
    then(function () {
        console.log('Success, You are a GEEK');
    }).
    catch(function () {
        console.log('Some error has occurred');
    });