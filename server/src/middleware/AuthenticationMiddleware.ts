import { Request, Response, NextFunction } from "express";
import {Session} from "../persistance/Session";


export async function AuthenticationMiddleware (request:Request,response:Response,next:NextFunction) {


        console.log("entered in auth middleware")
        if(request.signedCookies?.userCookieName){
            console.log("cookies signed with sid")
            console.log(request.signedCookies);
            console.log(request.signedCookies.userCookieName);
            const sessionID  = await Session.findOne({sid:{$eq :request.signedCookies.userCookieName}});
            console.log(`sessionID found ${sessionID}`);
            if(sessionID && request.signedCookies.userCookieName.length == 32){
                response.locals.userAuth = true;
                console.log("session found!!");
                next();
            }else{
                response.locals.userAuth = false;
                console.log('cookies found but sessionID is wrong');
                response.sendStatus(400);
            }

        }else {

            response.sendStatus(400);
            console.log("not a signed cookie!");
            //return response.redirect('/login');
            response.locals.userAuth = false;
            console.log(response.locals.userAuth);
            console.log("can not find session, request to login back");
        }
}