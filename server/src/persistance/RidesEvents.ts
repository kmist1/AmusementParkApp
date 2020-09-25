import * as Mongoose from 'mongoose';
import {IRidesEvents} from '../model/IRidesEvents';


const ridesSchema: Mongoose.Schema<IRidesEvents> = new Mongoose.Schema<IRidesEvents>({

    rideName: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },

            message: 'rides name may only contain letters'
        }
    },
    eventName: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },

            message: 'eventsName name may only contain letters'
        }
    },

    rideTicketPrice: {
        type: Number,
        required: true,

        validate: {

            validator: function (value: number): boolean {

                return !isNaN(value) && value > 0;//return true
            },

            message: 'rideTicketPrice  may only contain numbers from 0-9'
        }
    },
    eventTicketPrice: {
        type: Number,
        required: true,

        validate: {

            validator: function (value: number): boolean {

                return !isNaN(value) && value > 0;//return true
            },

            message: 'eventTicketPrice  may only contain numbers from 0-9'
        }
    },

    rideMonthlyPass: {
        type: Number,
        required: true,

        validate: {

            validator: function (value: number): boolean {

                return !isNaN(value) && value > 0;//return true
            },

            message: 'rideMonthlyPass  may only contain numbers from 0-9'
        }
    },

});




// Export the compiled model
export const RidesEvents = Mongoose.model<IRidesEvents>('ridesEvents', ridesSchema);

