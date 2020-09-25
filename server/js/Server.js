"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var User_1 = require("./persistance/User");
var Session_1 = require("./persistance/Session");
var FAQs_1 = require("./persistance/FAQs");
var BuyTickets_1 = require("./persistance/BuyTickets");
var mongoose_1 = __importDefault(require("mongoose"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var StrongParms_1 = require("./middleware/StrongParms");
var AuthenticationMiddleware_1 = require("./middleware/AuthenticationMiddleware");
var nanoid_1 = __importDefault(require("nanoid"));
var bodyParser = require('body-parser');
var app = express_1.default();
var path = require('path');
/***************************************** MongoDB Atlas connection ********************************************/
var uri = 'mongodb+srv://krunal:1154krunal@cluster0-3vfpx.mongodb.net/amusementPark?retryWrites=true&w=majority';
mongoose_1.default.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    console.log('Database Connected!');
})
    .catch(function (err) { return console.log(err); });
/***************************************** connection to client directory ********************************************/
var clientAppDirectory = path.join(__dirname, '../public', 'build');
app.use(express_1.default.json());
app.use(express_1.default.static(clientAppDirectory));
app.get('/*', function (request, response) {
    var indexPath = path.join(clientAppDirectory, 'index.html');
    return response.sendFile(indexPath);
});
app.use(bodyParser.json());
app.use(cookie_parser_1.default("I am secret for now")); // will use cypto later
/***************************************** web-Socket connection ********************************************/
var ws_1 = __importDefault(require("ws"));
var port = 5000;
var webSocketServer = new ws_1.default.Server({ port: port }); // Instantiate a new web socket server on localhost with port 5000
webSocketServer.on('connection', function (webSocketClient) {
    console.log("client has been connected to webSocket server!!");
    webSocketClient.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var faQs, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('received message from client: ', message);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, new FAQs_1.FAQs({ HelpClientMessage: message })];
                case 2:
                    faQs = _a.sent();
                    return [4 /*yield*/, FAQs_1.FAQs.create(faQs)];
                case 3:
                    _a.sent();
                    console.log('FaQs message created', faQs);
                    webSocketServer.clients.forEach(function (client) {
                        if (client.readyState === ws_1.default.OPEN) {
                            client.send(message);
                        }
                    });
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.error('Something went wrong while creating a new message: ' + e_1.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
console.log('Websocket server is up and ready for connections on port', port);
/***************************************** User Login / Session Creation ********************************************/
app.post('/login', [
    StrongParms_1.StrongParams({
        email: 'string',
        passWord: 'string',
    })
], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var strongParams, email, passWord, existingUser, sid, session, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                strongParams = (_a = response.locals) === null || _a === void 0 ? void 0 : _a.strongParams;
                email = strongParams === null || strongParams === void 0 ? void 0 : strongParams.email;
                passWord = strongParams === null || strongParams === void 0 ? void 0 : strongParams.passWord;
                console.log(strongParams);
                return [4 /*yield*/, User_1.User.findOne({ email: { $eq: email }, passWord: { $eq: passWord } })];
            case 1:
                existingUser = _b.sent();
                if (!existingUser) return [3 /*break*/, 3];
                sid = nanoid_1.default(32);
                response.cookie("userCookieName", sid, { signed: true });
                return [4 /*yield*/, Session_1.Session.create({ email: email, sid: sid })];
            case 2:
                session = _b.sent();
                response.send(session);
                response.locals.sid = sid;
                return [2 /*return*/, response.redirect('/homepage')];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error('Something went wrong while creating a new user: ' + error_1.message);
                return [2 /*return*/, response.sendStatus(400)];
            case 5: return [2 /*return*/];
        }
    });
}); });
/***************************************** User Creation  ********************************************/
app.post('/user', [
    StrongParms_1.StrongParams({
        email: 'string',
        passWord: 'string',
        firstName: 'string',
        lastName: 'string'
    })
], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var strongParams, email, passWord, firstName, lastName, existingUser, user, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                strongParams = (_a = response.locals) === null || _a === void 0 ? void 0 : _a.strongParams;
                email = strongParams === null || strongParams === void 0 ? void 0 : strongParams.email;
                passWord = strongParams === null || strongParams === void 0 ? void 0 : strongParams.passWord;
                firstName = strongParams === null || strongParams === void 0 ? void 0 : strongParams.firstName;
                lastName = strongParams === null || strongParams === void 0 ? void 0 : strongParams.lastName;
                console.log(strongParams);
                return [4 /*yield*/, User_1.User.findOne({ email: { $eq: email } })];
            case 1:
                existingUser = _b.sent();
                if (!!existingUser) return [3 /*break*/, 3];
                return [4 /*yield*/, User_1.User.create({ email: email, passWord: passWord, firstName: firstName, lastName: lastName })];
            case 2:
                user = _b.sent();
                response.send(user);
                return [3 /*break*/, 4];
            case 3:
                response.sendStatus(400);
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.log('Error creating new user: ', error_2.message);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/***************************************** User Deletion ********************************************/
app.delete('/user', AuthenticationMiddleware_1.AuthenticationMiddleware, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var email, deletedUser;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = (_a = request.body) === null || _a === void 0 ? void 0 : _a.email;
                response.clearCookie("userCookieName", response.locals.sid);
                return [4 /*yield*/, User_1.User.deleteOne({
                        email: email
                    })];
            case 1:
                deletedUser = _b.sent();
                response.send(deletedUser);
                return [2 /*return*/];
        }
    });
}); });
/***************************************** Session Deletion ********************************************/
app.delete('/logout', AuthenticationMiddleware_1.AuthenticationMiddleware, [
    StrongParms_1.StrongParams({
        email: 'string',
    })
], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var strongParams, email, deletedSession;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                strongParams = (_a = response.locals) === null || _a === void 0 ? void 0 : _a.strongParams;
                email = strongParams === null || strongParams === void 0 ? void 0 : strongParams.email;
                return [4 /*yield*/, Session_1.Session.deleteOne({
                        email: email
                    })];
            case 1:
                deletedSession = _b.sent();
                response.send(deletedSession);
                return [2 /*return*/];
        }
    });
}); });
/***************************************** Buying Tickets / Session Retrieval ********************************************/
app.post('/buyTickets', AuthenticationMiddleware_1.AuthenticationMiddleware, [
    StrongParms_1.StrongParams({
        email: 'string',
        startDate: 'string',
        endDate: 'string',
        numPeople: 'string',
        whichPark: 'string'
    })
], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var strongParams, email, startDate, endDate, numPeople, whichPark, existingUser, pass, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                strongParams = (_a = response.locals) === null || _a === void 0 ? void 0 : _a.strongParams;
                email = strongParams === null || strongParams === void 0 ? void 0 : strongParams.email;
                startDate = strongParams === null || strongParams === void 0 ? void 0 : strongParams.startDate;
                endDate = strongParams === null || strongParams === void 0 ? void 0 : strongParams.endDate;
                numPeople = strongParams === null || strongParams === void 0 ? void 0 : strongParams.numPeople;
                whichPark = strongParams === null || strongParams === void 0 ? void 0 : strongParams.whichPark;
                console.log(strongParams);
                console.log(endDate);
                return [4 /*yield*/, BuyTickets_1.BuyTickets.findOne({ email: { $eq: email } })];
            case 1:
                existingUser = _b.sent();
                if (!existingUser) return [3 /*break*/, 2];
                response.sendStatus(204);
                console.log("User has already bought this ticket");
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, BuyTickets_1.BuyTickets.create({ email: email, startDate: startDate, endDate: endDate, numPeople: numPeople, whichPark: whichPark })];
            case 3:
                pass = _b.sent();
                console.log(pass);
                response.send(pass);
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                console.log('Error creating new pass: ', error_3.message);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//tried a lot here using get but did not work,
// i was unable to send by data using get request from server by config the second params of get method.
app.post('/userAuth', AuthenticationMiddleware_1.AuthenticationMiddleware, [
    StrongParms_1.StrongParams({
        email: 'string',
    })
], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var strongParams, email, userData;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                strongParams = (_a = response.locals) === null || _a === void 0 ? void 0 : _a.strongParams;
                console.log('strongParamEmail', strongParams);
                email = strongParams === null || strongParams === void 0 ? void 0 : strongParams.email;
                return [4 /*yield*/, User_1.User.findOne({ email: { $eq: email } })];
            case 1:
                userData = _b.sent();
                try {
                    if (response.locals.userAuth) {
                        if (userData) {
                            response.send(userData);
                            response.sendStatus(200);
                            console.log(userData);
                        }
                    }
                }
                catch (error) {
                    console.error('Something went wrong while authenticate user: ' + error.message);
                    return [2 /*return*/, response.sendStatus(400)];
                }
                return [2 /*return*/];
        }
    });
}); });
var mainPort = process.env.PORT || '4000';
app.set('port', mainPort);
app.listen(mainPort, function () { return console.log("server is up!"); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUF1RjtBQUN2RiwyQ0FBd0M7QUFDeEMsaURBQThDO0FBQzlDLDJDQUF3QztBQUN4Qyx1REFBb0Q7QUFDcEQsc0RBQXVDO0FBQ3ZDLGdFQUF5QztBQUN6Qyx3REFBc0Q7QUFDdEQsa0ZBQStFO0FBQy9FLGtEQUE0QjtBQUM1QixJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUMsSUFBTSxHQUFHLEdBQWdCLGlCQUFPLEVBQUUsQ0FBQztBQUNuQyxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHN0IsaUhBQWlIO0FBQ2pILElBQU0sR0FBRyxHQUFHLHNHQUFzRyxDQUFBO0FBQ2xILGtCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7S0FDbkUsSUFBSSxDQUFDO0lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQztLQUNELEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQztBQUlwQyx1SEFBdUg7QUFDdkgsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFdEUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFDdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0Is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