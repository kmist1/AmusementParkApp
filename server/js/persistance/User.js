"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
/**
 * User schema with custom validations.
 */
var userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'First name may only contain letters'
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'last name may only contain letters'
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value);
            },
            message: 'email should contain @ and .'
        }
    },
    passWord: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 7 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'password should contain more than seven characters'
        }
    },
});
userSchema.virtual('fullName')
    .get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    // If the full name doesn't have a any kind of whiteSpace, throw an error
    if (!/\s/.test(fullName)) {
        throw new Error('Full name must have space between the first and last name');
    }
    var _a = fullName.split(" "), firstName = _a[0], lastName = _a[1];
    this.firstName = firstName;
    this.lastName = lastName;
});
// Export the compiled model
exports.User = mongoose_1.model('user', userSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wZXJzaXN0YW5jZS9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUF1QztBQUd2Qzs7R0FFRztBQUNILElBQU0sVUFBVSxHQUFrQixJQUFJLGlCQUFNLENBQVE7SUFFaEQsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUVkLFFBQVEsRUFBRTtZQUVOLFNBQVMsRUFBRSxVQUFVLEtBQWE7Z0JBRTlCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6RCxDQUFDO1lBRUQsT0FBTyxFQUFFLHFDQUFxQztTQUNqRDtLQUNKO0lBRUQsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUVkLFFBQVEsRUFBRTtZQUVOLFNBQVMsRUFBRSxVQUFVLEtBQWE7Z0JBRTlCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6RCxDQUFDO1lBRUQsT0FBTyxFQUFFLG9DQUFvQztTQUNoRDtLQUNKO0lBRUQsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUVkLFFBQVEsRUFBRTtZQUVOLFNBQVMsRUFBRSxVQUFVLEtBQWE7Z0JBRTlCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksMERBQTBELENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RHLENBQUM7WUFFRCxPQUFPLEVBQUUsOEJBQThCO1NBQzFDO0tBQ0o7SUFFRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBRWQsUUFBUSxFQUFFO1lBRU4sU0FBUyxFQUFFLFVBQVUsS0FBYTtnQkFFOUIsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFFRCxPQUFPLEVBQUUsb0RBQW9EO1NBQ2hFO0tBQ0o7Q0FHSixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztLQUN6QixHQUFHLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFFaEQsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQXVCLFFBQWdCO0lBRTFDLHlFQUF5RTtJQUN6RSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUV0QixNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7S0FDaEY7SUFFSyxJQUFBLEtBQWtDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQXBELFNBQVMsUUFBQSxFQUFFLFFBQVEsUUFBaUMsQ0FBQztJQUU1RCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUM3QixDQUFDLENBQ0osQ0FBQztBQUVGLDRCQUE0QjtBQUNmLFFBQUEsSUFBSSxHQUFHLGdCQUFLLENBQVEsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDIn0=