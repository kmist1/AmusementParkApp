import {Schema, model} from 'mongoose';
import {IFAQs} from "../model/IFAQs";


const faQsSchema: Schema<IFAQs> = new Schema<IFAQs>({

    FAQs: {
        type: String,
        required: false,
    },

    HelpClientMessage: {
        type: String,
        required: true,
    }
});


// Export the compiled model
export const FAQs = model<IFAQs>('FAQs', faQsSchema);