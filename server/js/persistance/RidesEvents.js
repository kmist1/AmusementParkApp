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
exports.RidesEvents = void 0;
var Mongoose = __importStar(require("mongoose"));
var ridesSchema = new Mongoose.Schema({
    rideName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'rides name may only contain letters'
        }
    },
    eventName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'eventsName name may only contain letters'
        }
    },
    rideTicketPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return !isNaN(value) && value > 0; //return true
            },
            message: 'rideTicketPrice  may only contain numbers from 0-9'
        }
    },
    eventTicketPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return !isNaN(value) && value > 0; //return true
            },
            message: 'eventTicketPrice  may only contain numbers from 0-9'
        }
    },
    rideMonthlyPass: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return !isNaN(value) && value > 0; //return true
            },
            message: 'rideMonthlyPass  may only contain numbers from 0-9'
        }
    },
});
// Export the compiled model
exports.RidesEvents = Mongoose.model('ridesEvents', ridesSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmlkZXNFdmVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGVyc2lzdGFuY2UvUmlkZXNFdmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFxQztBQUlyQyxJQUFNLFdBQVcsR0FBa0MsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFlO0lBRWpGLFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFFZCxRQUFRLEVBQUU7WUFFTixTQUFTLEVBQUUsVUFBVSxLQUFhO2dCQUU5QixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUVELE9BQU8sRUFBRSxxQ0FBcUM7U0FDakQ7S0FDSjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFFZCxRQUFRLEVBQUU7WUFFTixTQUFTLEVBQUUsVUFBVSxLQUFhO2dCQUU5QixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUVELE9BQU8sRUFBRSwwQ0FBMEM7U0FDdEQ7S0FDSjtJQUVELGVBQWUsRUFBRTtRQUNiLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFFZCxRQUFRLEVBQUU7WUFFTixTQUFTLEVBQUUsVUFBVSxLQUFhO2dCQUU5QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQSxhQUFhO1lBQ25ELENBQUM7WUFFRCxPQUFPLEVBQUUsb0RBQW9EO1NBQ2hFO0tBQ0o7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFFZCxRQUFRLEVBQUU7WUFFTixTQUFTLEVBQUUsVUFBVSxLQUFhO2dCQUU5QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQSxhQUFhO1lBQ25ELENBQUM7WUFFRCxPQUFPLEVBQUUscURBQXFEO1NBQ2pFO0tBQ0o7SUFFRCxlQUFlLEVBQUU7UUFDYixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBRWQsUUFBUSxFQUFFO1lBRU4sU0FBUyxFQUFFLFVBQVUsS0FBYTtnQkFFOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUEsYUFBYTtZQUNuRCxDQUFDO1lBRUQsT0FBTyxFQUFFLG9EQUFvRDtTQUNoRTtLQUNKO0NBRUosQ0FBQyxDQUFDO0FBS0gsNEJBQTRCO0FBQ2YsUUFBQSxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBZSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMifQ==