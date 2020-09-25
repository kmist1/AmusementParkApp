

const chai = require('chai');
const expect = chai.expect;

const Mongoose = require('mongoose');

const {User} = require('../build/persistance/User');


describe('User model tests', function() {

    before(async function(){

        await Mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

    });

    beforeEach(async function() {

        await User.deleteMany({});
    });



    describe('First name validation tests', function() {

        it('Should prevent setting a non-alpha first name', async function() {

            const user = await new User({ firstName: '12345', lastName: 'mistry', email:'kmist1@mail.com',passWord: 'krunalmistrypassword' });

            try {

                await user.save();
                expect.fail("Expected error not thrown");

            } catch (error) {
                expect(error.message).to.equal('user validation failed: firstName: First name may only contain letters')
            }
        });

    });
    describe('last name validation tests', function() {

        it('Should prevent setting a non-alpha last name', async function() {

            const user = await new User({ firstName: 'Krunal', lastName: '1234',email:'kmist1@mail.com',passWord: 'krunalmistrypassword' });

            try {


                await user.save();
                expect.fail("Expected error not thrown");

            } catch (error) {
                expect(error.message).to.equal('user validation failed: lastName: last name may only contain letters')
            }
        });

    });
    describe('email validation tests', function() {

        it('should prevent entering wrong email', async function() {


            const user = await new User({ firstName: 'Krunal', lastName: 'mistry', email:'kmist1', passWord: 'krunalmistrypassword' });

            try {
                await user.save();
                expect.fail("Expected error not thrown");

            } catch (error) {
                expect(error.message).to.equal('user validation failed: email: email should contain @ and .')
            }
        });

    });
    describe('password validation tests', function() {

        it('Should prevent setting a non-alpha last name', async function() {


            const user = await new User({ firstName: 'Krunal', lastName: 'Mistry',email:'kmist1@mail.com', passWord:'1234' });

            try {


                await user.save();


                expect.fail("Expected error not thrown");

            } catch (error) {
                expect(error.message).to.equal('user validation failed: passWord: password should contain more than seven characters')
            }
        });

    });

    describe('Full name virtual attribute tests', function() {

        it('Should allow setting a full name virtual', async function() {

            const user = await new User({ firstName: 'FIRST_NAME', lastName: 'LAST_NAME', email:'krunal@gmail.com', passWord:'krunalmistrypassword' });

            expect(user.firstName).to.equal('FIRST_NAME');
            expect(user.lastName).to.equal('LAST_NAME');

            user.fullName = 'Krunal Mistry';

            expect(user.firstName).to.equal('Krunal');
            expect(user.lastName).to.equal('Mistry');

            const savedUser = await user.save();

            expect(savedUser.firstName).to.equal('Krunal');
            expect(savedUser.lastName).to.equal('Mistry');
        });
    });
});




