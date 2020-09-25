import Express, {Application, Request, Response, NextFunction, request} from 'express';
import {User} from './persistance/User';
import {Session} from "./persistance/Session";
import {FAQs} from "./persistance/FAQs";
import {BuyTickets} from "./persistance/BuyTickets";
import Mongoose, {get} from "mongoose";
import cookieParser from "cookie-parser";
import {StrongParams} from './middleware/StrongParms';
import {AuthenticationMiddleware} from './middleware/AuthenticationMiddleware';
import nanoid from "nanoid";
const bodyParser = require('body-parser');
const app: Application = Express();
const path = require('path');


/***************************************** MongoDB Atlas connection ********************************************/
const uri = 'mongodb+srv://krunal:1154krunal@cluster0-3vfpx.mongodb.net/amusementPark?retryWrites=true&w=majority'
Mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Database Connected!')
    })
    .catch(err => console.log(err));



/***************************************** connection to client directory ********************************************/
const clientAppDirectory = path.join(__dirname, '../public', 'build');

app.use(Express.json())
app.use(Express.static(clientAppDirectory));

app.get('/*', (request, response) => {

    const indexPath = path.join(clientAppDirectory, 'index.html');

    return response.sendFile(indexPath);
});

app.use(bodyParser.json())
app.use(cookieParser("I am secret for now"))// will use cypto later


/***************************************** web-Socket connection ********************************************/


import WebSocket from 'ws';
const port: number = 5000;

const webSocketServer:WebSocket.Server = new WebSocket.Server({ port }); // Instantiate a new web socket server on localhost with port 5000

webSocketServer.on('connection', (webSocketClient:WebSocket) => {   //As soon as webSocket server connects pass the connection and use that wherever you want.
    console.log("client has been connected to webSocket server!!");

    webSocketClient.on('message', async (message) => {  // As soon as someone connects listen to their messages
        console.log('received message from client: ', message);
        try{

            const faQs = await new FAQs({HelpClientMessage:message});
            await FAQs.create(faQs);
            console.log('FaQs message created',faQs);

            webSocketServer.clients.forEach((client) => {

                if (client.readyState === WebSocket.OPEN) {

                    client.send(message);

                }

            });


        } catch (e) {
            console.error('Something went wrong while creating a new message: ' + e.message);
        }

    });
});

console.log('Websocket server is up and ready for connections on port', port);

/***************************************** User Login / Session Creation ********************************************/

app.post('/login',
    [
        StrongParams({
            email:'string',
            passWord:'string',
        })],
    async (request:Request,response:Response) => {

        try {
            const strongParams : any = response.locals?.strongParams;

            const email : string | undefined = strongParams?.email;
            const passWord : string | undefined = strongParams?.passWord;

            console.log(strongParams);
            const existingUser = await User.findOne({ email: { $eq: email } ,passWord: { $eq: passWord } });
            if (existingUser) {
                const sid = nanoid(32);
                response.cookie("userCookieName",sid, {signed:true});
                const session = await Session.create({email:email,sid:sid});
                response.send(session);
                response.locals.sid = sid;
                return response.redirect('/homepage');
                console.log("checkout the cookie");
                return response.sendStatus(200);
            }

        } catch (error) {

            console.error('Something went wrong while creating a new user: ' + error.message);

            return response.sendStatus(400);
        }
    });

/***************************************** User Creation  ********************************************/

app.post(
    '/user',
    [
        StrongParams({
        email:'string',
        passWord:'string',
        firstName:'string',
        lastName: 'string'
    })],

    async (request: Request, response:Response) => {


        try {
            const strongParams : any = response.locals?.strongParams;

            const email : string | undefined = strongParams?.email;
            const passWord : string | undefined = strongParams?.passWord;
            const firstName : string | undefined = strongParams?.firstName;
            const lastName : string | undefined = strongParams?.lastName;

            console.log(strongParams);



            const existingUser = await User.findOne({ email: { $eq: email }});

            if(!existingUser){
                const user = await User.create({email:email, passWord:passWord, firstName:firstName, lastName:lastName});
                response.send(user);
            }else {
                response.sendStatus(400);
            }

        }catch (error) {
            console.log('Error creating new user: ',error.message);
        }


});

/***************************************** User Deletion ********************************************/

app.delete('/user',AuthenticationMiddleware,async (request: Request, response:Response) => {


    const email :string | undefined = request.body?.email;
    response.clearCookie("userCookieName",response.locals.sid);
    const deletedUser = await User.deleteOne({
        email:email
    });
    response.send(deletedUser);

});


/***************************************** Session Deletion ********************************************/

app.delete('/logout',
    AuthenticationMiddleware,
    [
        StrongParams({
            email:'string',
        })],
    async (request: Request, response:Response) => {

        const strongParams : any = response.locals?.strongParams;

        const email : string | undefined = strongParams?.email;

        const deletedSession = await Session.deleteOne({
            email:email
        });

        response.send(deletedSession);

});

/***************************************** Buying Tickets / Session Retrieval ********************************************/

app.post('/buyTickets',
    AuthenticationMiddleware,
    [
        StrongParams({
            email: 'string',
            startDate:'string',
            endDate:'string',
            numPeople: 'string',
            whichPark: 'string'
        })],
    async(request:Request, response:Response) => {

        try {
            const strongParams : any = response.locals?.strongParams;

            const email : string | undefined = strongParams?.email;
            const startDate : string | undefined = strongParams?.startDate;
            const endDate : string | undefined = strongParams?.endDate;
            const numPeople : string | undefined = strongParams?.numPeople;
            const whichPark : string | undefined = strongParams?.whichPark;


            console.log(strongParams);


            console.log(endDate);
            const existingUser = await BuyTickets.findOne({ email: { $eq: email }});
            if(existingUser) {
                response.sendStatus(204);
                console.log("User has already bought this ticket")
            }else {
                const pass = await BuyTickets.create({email:email, startDate:startDate, endDate:endDate, numPeople:numPeople, whichPark:whichPark});
                console.log(pass);
                response.send(pass);
            }
        }catch (error) {
            console.log('Error creating new pass: ',error.message);
        }

});


//tried a lot here using get but did not work,
// i was unable to send by data using get request from server by config the second params of get method.
app.post('/userAuth',
    AuthenticationMiddleware,
    [
        StrongParams({
            email:'string',
        })],
    async (request: Request, response: Response) => {

        const strongParams : any = response.locals?.strongParams;
        console.log('strongParamEmail',strongParams);

        const email : string | undefined = strongParams?.email;
        const userData = await User.findOne({ email: { $eq: email }});

        try {
            if(response.locals.userAuth) {
                if(userData) {
                    response.send(userData);
                    response.sendStatus(200);
                    console.log(userData);
                }
            }

        } catch (error) {

            console.error('Something went wrong while authenticate user: ' + error.message);

            return response.sendStatus(400);
        }


    });

const mainPort = process.env.PORT || '4000';
app.set('port', mainPort);

app.listen(mainPort,()=>console.log("server is up!"));