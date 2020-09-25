import { Document } from 'mongoose';

export interface IRidesEvents extends Document {

    rideName: string,
    eventName: string,
    rideTicketPrice: number,
    eventTicketPrice: number,
    rideMonthlyPass: number,
}