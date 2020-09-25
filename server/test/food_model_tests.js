const chai = require('chai');
const expect = chai.expect;

const Mongoose = require('mongoose');

const {FoodPlaces} = require('../build/persistance/FoodPlaces');





describe('FoodPlaces model tests', function() {

    before(async function(){

        await Mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
    });

    beforeEach(async function() {

        await FoodPlaces.deleteMany({});
    });



    describe('Restaurant name validation tests', function() {

        it('Should prevent setting a non-alpha Restaurant name', async function() {


            const foodPlaces = await new FoodPlaces({ restaurantName:'1234',shopName:'crocs',hotelName: 'superTWO',shopInfo: 'homesideAve', hotelInfo: 'forestRD' });

            try {


                await foodPlaces.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('foodPlaces validation failed: restaurantName: restaurants name may only contain letters')
            }
        });

    });
    describe('Shop name validation tests', function() {

        it('Should prevent setting a non-alpha Shop name', async function() {


            const foodPlaces = await new FoodPlaces({ restaurantName:'dominoz', shopName:'1234', hotelName:'holidayIn',shopInfo: 'homesideAve',hotelInfo: 'forestRD' });

            try {


                await foodPlaces.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('foodPlaces validation failed: shopName: shop name may only contain letters')
            }
        });

    });
    describe('Hotel name validation tests', function() {

        it('Should prevent setting a non-alpha Hotel name', async function() {


            const foodPlaces = await new FoodPlaces({ restaurantName:'dominoz', shopName:'crocs', hotelName:'1234', shopInfo: 'homeside', hotelInfo: 'forestRD' });

            try {


                await foodPlaces.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('foodPlaces validation failed: hotelName: hotel name may only contain letters')
            }
        });

    });
    describe('Shop info validation tests', function() {

        it('Should prevent setting a non-negative Shop info', async function() {


            const foodPlaces = await new FoodPlaces({ restaurantName:'dominoz', shopName:'crocs', hotelName:'holidayIn', shopInfo:'1234',hotelInfo: 'forestRD' });

            try {


                await foodPlaces.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('foodPlaces validation failed: shopInfo: shop info may only contain letters and numbers')
            }
        });

    });
    describe('hotel info validation tests', function() {

        it('Should prevent setting a non-negative hotel info', async function() {


            const foodPlaces = await new FoodPlaces({ restaurantName:'dominoz', shopName:'crocs', hotelName:'holidayIn', shopInfo:'homesideAve', hotelInfo:'1234' });

            try {


                await foodPlaces.save();


                expect.fail("Expected error not thrown");

            } catch (error) {


                expect(error.message).to.equal('foodPlaces validation failed: hotelInfo: hotel info may only contain letters and numbers')
            }
        });

    });



});