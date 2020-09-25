import * as Mongoose from 'mongoose';
import {IbuyTickets} from '../model/IbuyTickets';


const ticketSchema: Mongoose.Schema<IbuyTickets> = new Mongoose.Schema<IbuyTickets>({

    email: {
        type: String,
        required: true,
    },

    startDate: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/.test(value);
            },

            message: 'start date should only contains date formate'
        }
    },

    endDate: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/.test(value);
            },

            message: 'end date should only contains date formate'
        }
    },

    numPeople: {
        type: Number,
        required: true,

        validate: {

            validator: function (value: number): boolean {

                return value > 0 && value < 7;
            },

            message: 'Number of people should only contains numbers between 0 to 7'
        }
    },

    whichPark: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 1 && /^(?![\s.]+$)[a-zA-Z\s.]*$/.test(value);
            },

            message: 'Name of the park location should only contains stings'
        }
    },


});




// Export the compiled model
export const BuyTickets = Mongoose.model<IbuyTickets>('buyTickets', ticketSchema);
