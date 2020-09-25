"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
var mongoose_1 = require("mongoose");
var sessionSchema = new mongoose_1.Schema({
    ttl: {
        type: Date,
        default: Date.now,
        index: { expires: '5m' }
    },
    sid: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});
// Export the compiled model
exports.Session = mongoose_1.model('session', sessionSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wZXJzaXN0YW5jZS9TZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUF1QztBQUl2QyxJQUFNLGFBQWEsR0FBcUIsSUFBSSxpQkFBTSxDQUFXO0lBRXpELEdBQUcsRUFBRTtRQUNELElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHO1FBQ2pCLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUM7S0FDekI7SUFDRCxHQUFHLEVBQUU7UUFDRCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBRUQsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtDQUNKLENBQUMsQ0FBQztBQUdILDRCQUE0QjtBQUNmLFFBQUEsT0FBTyxHQUFHLGdCQUFLLENBQVcsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDIn0=