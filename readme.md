*******************************************************
PROJECT OBJECTIVE
*******************************************************
Create a successful chat conversation with LivePerson's API.
Steps:
1. Signup for a developer account. 
2. Retrieve baseline URIs for the domain APIs.
3. Retrieve JWT using the account details provided post registration.
4. Create a web socket connection with LivePerson's server/API
5. Send a message and receive a response from the server.

*******************************************************
SUBMITTED FILES
*******************************************************
1. ETS APAC Coding Challenge.pdf: Instructions & Brief
2. challenge.js: Source Code / Response to the challenge
3. testPromise.js: Testing 'promises' for sequential code flow
4. readme.md: This file.

*******************************************************
LIBRARIES REQUIRED
*******************************************************
1. ws: To support WebSocket creation
2. axios: To make POST http calls


*******************************************************
OBJECTIVES MET
*******************************************************
1. Successful retrieval of baseline URI for 'idp' domain
2. Successful retrieval of baseline URI for 'asyncMessagingEnt' domain
3. Successful retrieval of consumer jwt



*******************************************************
OBJECTIVES NOT MET
*******************************************************
1. WebSocket connection with jwt
2. Message exchange with the server



*******************************************************
POTENTIAL ISSUES/RESOLUTION
*******************************************************
1. JWT availability
Code sequence needs to be explicitly controlled to ensure jwt is available
before the creation of a secure web socket connection.
(Experiments carried out with 'Promise' construct in testPromises.js file)

2. Syntax
a. potentially, the jwt is not being bound to the web socket correctly
b. potentially, the syntax of the message being sent is incorrect

Server responds with 407 


*******************************************************
IMPROVEMENTS REQUIRED
*******************************************************
1. hardcoded baseline URIs are being used even though these have been retreived dynamically
2. To reduce duplication a function is required which makes HTTP calls 