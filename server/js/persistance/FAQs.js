"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQs = void 0;
var mongoose_1 = require("mongoose");
var faQsSchema = new mongoose_1.Schema({
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
exports.FAQs = mongoose_1.model('FAQs', faQsSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkFRcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wZXJzaXN0YW5jZS9GQVFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUF1QztBQUl2QyxJQUFNLFVBQVUsR0FBa0IsSUFBSSxpQkFBTSxDQUFRO0lBRWhELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLEtBQUs7S0FDbEI7SUFFRCxpQkFBaUIsRUFBRTtRQUNmLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDLENBQUM7QUFHSCw0QkFBNEI7QUFDZixRQUFBLElBQUksR0FBRyxnQkFBSyxDQUFRLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyJ9