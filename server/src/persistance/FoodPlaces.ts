import * as Mongoose from 'mongoose';
import {IFoodPlaces} from '../model/IFoodPlaces';


const foodPlacesSchema: Mongoose.Schema<IFoodPlaces> = new Mongoose.Schema<IFoodPlaces>({

    restaurantName: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },

            message: 'restaurants name may only contain letters'
        }
    },
    shopName: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },

            message: 'shop name may only contain letters'
        }
    },
    hotelName: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },

            message: 'hotel name may only contain letters'
        }
    },


    shopInfo: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },

            message: 'shop info may only contain letters and numbers'
        }
    },
    hotelInfo: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },

            message: 'hotel info may only contain letters and numbers'
        }
    },


});




// Export the compiled model
export const FoodPlaces = Mongoose.model<IFoodPlaces>('foodPlaces', foodPlacesSchema);