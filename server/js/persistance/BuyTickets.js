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
exports.BuyTickets = void 0;
var Mongoose = __importStar(require("mongoose"));
var ticketSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/.test(value);
            },
            message: 'start date should only contains date formate'
        }
    },
    endDate: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/.test(value);
            },
            message: 'end date should only contains date formate'
        }
    },
    numPeople: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0 && value < 7;
            },
            message: 'Number of people should only contains numbers between 0 to 7'
        }
    },
    whichPark: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 1 && /^(?![\s.]+$)[a-zA-Z\s.]*$/.test(value);
            },
            message: 'Name of the park location should only contains stings'
        }
    },
});
// Export the compiled model
exports.BuyTickets = Mongoose.model('buyTickets', ticketSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV5VGlja2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wZXJzaXN0YW5jZS9CdXlUaWNrZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBcUM7QUFJckMsSUFBTSxZQUFZLEdBQWlDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBYztJQUVoRixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBRUQsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUVkLFFBQVEsRUFBRTtZQUVOLFNBQVMsRUFBRSxVQUFVLEtBQWE7Z0JBRTlCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksZ0VBQWdFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVHLENBQUM7WUFFRCxPQUFPLEVBQUUsOENBQThDO1NBQzFEO0tBQ0o7SUFFRCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBRWQsUUFBUSxFQUFFO1lBRU4sU0FBUyxFQUFFLFVBQVUsS0FBYTtnQkFFOUIsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxnRUFBZ0UsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUcsQ0FBQztZQUVELE9BQU8sRUFBRSw0Q0FBNEM7U0FDeEQ7S0FDSjtJQUVELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFFZCxRQUFRLEVBQUU7WUFFTixTQUFTLEVBQUUsVUFBVSxLQUFhO2dCQUU5QixPQUFPLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBRUQsT0FBTyxFQUFFLDhEQUE4RDtTQUMxRTtLQUNKO0lBRUQsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUVkLFFBQVEsRUFBRTtZQUVOLFNBQVMsRUFBRSxVQUFVLEtBQWE7Z0JBRTlCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksMkJBQTJCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7WUFFRCxPQUFPLEVBQUUsdURBQXVEO1NBQ25FO0tBQ0o7Q0FHSixDQUFDLENBQUM7QUFLSCw0QkFBNEI7QUFDZixRQUFBLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFjLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQyJ9