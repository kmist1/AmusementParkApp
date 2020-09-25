import { Document } from 'mongoose';

export interface IFAQs extends Document {

    FAQs: string,
    HelpClientMessage: string,

}