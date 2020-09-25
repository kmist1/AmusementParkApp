import {Schema, model} from 'mongoose';
import {ISession} from "../model/ISession";


const sessionSchema: Schema<ISession> = new Schema<ISession>({

    ttl: {
        type: Date,
        default: Date.now,
        index: {expires: '5m'}
    },
    sid: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    }
});


// Export the compiled model
export const Session = model<ISession>('session', sessionSchema);