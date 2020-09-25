import {Request, Response, NextFunction} from "express";

export function StrongParams (params: {[key : string]: string}) {
    return (request: Request, response: Response, next: NextFunction) => {

        const strongParams : {[key : string]: any}  = {};
        const weakParams = request.body;

        Object.entries(params).forEach(([key,value])=>{

            const weakParam: string = weakParams[key];

            if(weakParam && typeof weakParam === value){

                strongParams[key] = weakParam;
            }
        });

        response.locals.strongParams = strongParams;
        request.body = null;

        return next();

    }
}