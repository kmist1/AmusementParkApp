import { Document } from 'mongoose';

export interface IbuyTickets extends Document {

    email: string
    startDate: string
    endDate: string
    numPeople: number
    whichPark: string   //or location of park for example park in new london or new haven?
}