const chai = require('chai');
const expect = chai.expect;

const Mongoose = require('mongoose');

const {BuyTickets} = require('../build/persistance/BuyTickets');



describe('buyTickets model tests', function() {

    before(async function(){

        await Mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
    });

    beforeEach(async function() {

        await BuyTickets.deleteMany({});
    });



    describe('Start date validation tests', function() {

        it('Should prevent setting a only sting characters', async function() {


            const buyTickets = await new BuyTickets({ startDate: 'abcd', endDate: '6/5/2001', numPeople: 5, whichPark:'new london', email:'test@gmail.com'});

            try {


                await buyTickets.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('buyTickets validation failed: startDate: start date should only contains date formate')
            }
        });

    });

    describe('End date validation tests', function() {

        it('Should prevent setting a only sting characters', async function() {


            const buyTickets = await new BuyTickets({ startDate: '6/5/2001', endDate:'abcd', numPeople:5, whichPark:'new london',email:'test@gmail.com'});

            try {


                await buyTickets.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('buyTickets validation failed: endDate: end date should only contains date formate')
            }
        });

    });

    describe('Number of people validation tests', function() {

        it('Should prevent setting a only sting characters', async function() {


            const buyTickets = await new BuyTickets({ startDate:'6/5/2001' , endDate:'6/5/2001', numPeople:8, whichPark:'new london',email:'test@gmail.com'});

            try {


                await buyTickets.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('buyTickets validation failed: numPeople: Number of people should only contains numbers between 0 to 7')
            }
        });

    });

    describe('park location name validation tests', function() {

        it('Should prevent setting a numbers and special characters', async function() {


            const buyTickets = await new BuyTickets({ startDate: '6/5/2001', endDate:'6/5/2001', numPeople:5, whichPark:989898,email:'test@gmail.com'});

            try {


                await buyTickets.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('buyTickets validation failed: whichPark: Name of the park location should only contains stings')
            }
        });

    });




});