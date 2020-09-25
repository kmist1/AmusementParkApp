import { Document } from 'mongoose';

export interface ISession extends Document {

    ttl: object,
    sid: string,
    email: string,
}