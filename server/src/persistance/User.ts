import {Schema, model} from 'mongoose';
import {IUser} from "../model/IUser";

/**
 * User schema with custom validations.
 */
const userSchema: Schema<IUser> = new Schema<IUser>({

    firstName: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },

            message: 'First name may only contain letters'
        }
    },

    lastName: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },

            message: 'last name may only contain letters'
        }
    },

    email: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value);
            },

            message: 'email should contain @ and .'
        }
    },

    passWord: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 7 && /^[a-zA-Z]*$/.test(value);
            },

            message: 'password should contain more than seven characters'
        }
    },


});

userSchema.virtual('fullName')
    .get(function (this: IUser) {

        return this.firstName + ' ' + this.lastName;

    }).set(function (this: IUser, fullName: string) {

        // If the full name doesn't have a any kind of whiteSpace, throw an error
        if (!/\s/.test(fullName)) {

            throw new Error('Full name must have space between the first and last name');
        }

        const [firstName, lastName]: string[] = fullName.split(" ");

        this.firstName = firstName;
        this.lastName = lastName;
    }
);

// Export the compiled model
export const User = model<IUser>('user', userSchema);