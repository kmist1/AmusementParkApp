import { Document } from 'mongoose';

export interface IFoodPlaces extends Document {

    restaurantName: string,
    shopName: string,
    hotelName: string,
    shopInfo: string,// it will have address and contact num at the end
    hotelInfo: string,//it will have address and contact num at the end

}