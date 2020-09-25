const {Session} = require('../build/persistance/Session');
const httpMocks = require('node-mocks-http');
const Mongoose = require('mongoose');
const sinon = require('sinon');
const expect = require('chai').expect;
//import nanoid from "nanoid";

const nanoid = require('nanoid');

const {AuthenticationMiddleware} = require("../build/middleware/AuthenticationMiddleware");


describe('auth middleware tests', function() {

    before(async function () {

        await Mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

    });

    beforeEach(async function () {

        await Session.deleteMany({});
    });


    describe("Authentication middleware test",  () => {

        it('allow a valid user', async function () {

            const sid = nanoid(32);
            const email = "tests@gmail.com";
            const session = await Session.create({email: email, sid: sid});
            console.log(session);

            const request = httpMocks.createRequest({signedCookies: {userCookieName: sid}});
            const response = httpMocks.createResponse();
            const next = sinon.spy();

            await AuthenticationMiddleware(request, response, next);

            expect(response.locals.userAuth).to.be.true;
        });

        it('block an unsigned cookies', async function () {
            const sid = nanoid(32);
            const email = "tests@gmail.com";
            //response.cookie("userCookieName",sid, {signed:true})
            const session = await Session.create({email: email, sid: sid});
            console.log(session);

            const request = httpMocks.createRequest({signedCookies: {userCookieName: false,sid}});
            const response = httpMocks.createResponse();
            const next = sinon.spy();

            await AuthenticationMiddleware(request, response, next);

            expect(response.locals.userAuth).to.be.false;
        });


        it('allow singed cookie but block invalid sessionID', async function () {
            const sid = 'this is not sessionID';
            const email = "tests@gmail.com";
            const session = await Session.create({email:email,sid: 'this is also not sessionID'});
            const request = httpMocks.createRequest({signedCookies:{userCookieName:true,sid}});
            const response = httpMocks.createResponse();
            const next = sinon.spy();

            await AuthenticationMiddleware(request, response, next);

            expect(response.locals.userAuth).to.be.false;

        });

        it('block user with invalid cookieName', async function () {
           const sid = nanoid(32);
           const email = "tests@gmail.com";
            await Session.create({email:email,sid: sid});
            const request = httpMocks.createRequest({signedCookies:{CookieName:true,sid}});
            const response = httpMocks.createResponse();
            const next = sinon.spy();

            await AuthenticationMiddleware(request, response, next);

            expect(response.locals.userAuth).to.be.false;
        });

        it('block sessionID with the length other than 32bits', async function () {
            const sid = nanoid(16);
            const email = "tests@gmail.com";
            await Session.create({email:email,sid: sid});
            const request = httpMocks.createRequest({signedCookies:{userCookieName:true,sid}});
            const response = httpMocks.createResponse();
            const next = sinon.spy();

            await AuthenticationMiddleware(request, response, next);

            expect(response.locals.userAuth).to.be.false;
        });

        it('allow sessionID with the length of 32bits', async function () {
            const sid = "BZNORCyJk9Ui1Qsj4kJoeR36SNlbfKNP";
            const email = "tests@gmail.com";
            await Session.create({email:email,sid: sid});
            const request = httpMocks.createRequest({signedCookies:{userCookieName:sid}});
            const response = httpMocks.createResponse();
            const next = sinon.spy();

            await AuthenticationMiddleware(request, response, next);

            expect(response.locals.userAuth).to.be.true;
        });

    });
});