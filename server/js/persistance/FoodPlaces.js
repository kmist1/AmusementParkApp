"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodPlaces = void 0;
var Mongoose = __importStar(require("mongoose"));
var foodPlacesSchema = new Mongoose.Schema({
    restaurantName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'restaurants name may only contain letters'
        }
    },
    shopName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'shop name may only contain letters'
        }
    },
    hotelName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'hotel name may only contain letters'
        }
    },
    shopInfo: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'shop info may only contain letters and numbers'
        }
    },
    hotelInfo: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'hotel info may only contain letters and numbers'
        }
    },
});
// Export the compiled model
exports.FoodPlaces = Mongoose.model('foodPlaces', foodPlacesSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9vZFBsYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wZXJzaXN0YW5jZS9Gb29kUGxhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBcUM7QUFJckMsSUFBTSxnQkFBZ0IsR0FBaUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFjO0lBRXBGLGNBQWMsRUFBRTtRQUNaLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFFZCxRQUFRLEVBQUU7WUFFTixTQUFTLEVBQUUsVUFBVSxLQUFhO2dCQUU5QixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUVELE9BQU8sRUFBRSwyQ0FBMkM7U0FDdkQ7S0FDSjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFFZCxRQUFRLEVBQUU7WUFFTixTQUFTLEVBQUUsVUFBVSxLQUFhO2dCQUU5QixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUVELE9BQU8sRUFBRSxvQ0FBb0M7U0FDaEQ7S0FDSjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFFZCxRQUFRLEVBQUU7WUFFTixTQUFTLEVBQUUsVUFBVSxLQUFhO2dCQUU5QixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUVELE9BQU8sRUFBRSxxQ0FBcUM7U0FDakQ7S0FDSjtJQUdELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFFZCxRQUFRLEVBQUU7WUFFTixTQUFTLEVBQUUsVUFBVSxLQUFhO2dCQUU5QixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUVELE9BQU8sRUFBRSxnREFBZ0Q7U0FDNUQ7S0FDSjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFFZCxRQUFRLEVBQUU7WUFFTixTQUFTLEVBQUUsVUFBVSxLQUFhO2dCQUU5QixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUVELE9BQU8sRUFBRSxpREFBaUQ7U0FDN0Q7S0FDSjtDQUdKLENBQUMsQ0FBQztBQUtILDRCQUE0QjtBQUNmLFFBQUEsVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQWMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUMifQ==