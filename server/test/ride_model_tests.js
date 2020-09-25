const chai = require('chai');
const expect = chai.expect;

const Mongoose = require('mongoose');
const {RidesEvents} = require('../build/persistance/RidesEvents');


describe('Rides model tests', function() {

    before(async function(){

        await Mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
    });

    beforeEach(async function() {

        await RidesEvents.deleteMany({});
    });



    describe('Ride name validation tests', function() {

        it('Should prevent setting a non-alpha ride name', async function() {

            const ride = await new RidesEvents({ rideName: '12345', eventName: 'stuffingToys', rideTicketPrice:100,eventTicketPrice: 100, rideMonthlyPass: 1234567890 });

            try {

                await ride.save();

                expect.fail("Expected error not thrown");

            } catch (error) {

                expect(error.message).to.equal('ridesEvents validation failed: rideName: rides name may only contain letters')
            }
        });

    });
    describe('Event name validation tests', function() {

        it('Should prevent setting a non-alpha event name', async function() {


            const ride = await new RidesEvents({ rideName: 'Jocker', eventName:'1234',rideTicketPrice:100,eventTicketPrice: 100,rideMonthlyPass: 1234567890 });

            try {


                await ride.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('ridesEvents validation failed: eventName: eventsName name may only contain letters')
            }
        });

    });

    describe('RideTicketPrice validation tests', function() {

        it('Should prevent setting a characters', async function() {


            const ride = await new RidesEvents({ rideName: 'Jocker', eventName:'cityGotham', rideTicketPrice:'PRICE',eventTicketPrice:100,rideMonthlyPass: 1234567890 });

            try {


                await ride.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('ridesEvents validation failed: rideTicketPrice: Cast to Number failed for value "PRICE" at path "rideTicketPrice"')
            }
        });

    });
    describe('EventTicketPrice validation tests', function() {

        it('Should prevent setting a characters', async function() {


            const ride = await new RidesEvents({ rideName: 'Jocker', eventName:'cityGotham', rideTicketPrice: 100, eventTicketPrice:'PRICE',rideMonthlyPass: 1234567890 });

            try {


                await ride.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('ridesEvents validation failed: eventTicketPrice: Cast to Number failed for value "PRICE" at path "eventTicketPrice"')
            }
        });

    });

    describe('rideMonthlyPass validation tests', function() {

        it('Should prevent setting a characters', async function() {


            const ride = await new RidesEvents({ rideName: 'Jocker', eventName:'cityGotham', rideTicketPrice: 100, eventTicketPrice:100, rideMonthlyPass:'abcd' });

            try {


                await ride.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('ridesEvents validation failed: rideMonthlyPass: Cast to Number failed for value "abcd" at path "rideMonthlyPass"')
            }
        });

    });



});