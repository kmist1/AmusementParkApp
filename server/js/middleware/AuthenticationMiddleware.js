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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
var Session_1 = require("../persistance/Session");
function AuthenticationMiddleware(request, response, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var sessionID;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("entered in auth middleware");
                    if (!((_a = request.signedCookies) === null || _a === void 0 ? void 0 : _a.userCookieName)) return [3 /*break*/, 2];
                    console.log("cookies signed with sid");
                    console.log(request.signedCookies);
                    console.log(request.signedCookies.userCookieName);
                    return [4 /*yield*/, Session_1.Session.findOne({ sid: { $eq: request.signedCookies.userCookieName } })];
                case 1:
                    sessionID = _b.sent();
                    console.log("sessionID found " + sessionID);
                    if (sessionID && request.signedCookies.userCookieName.length == 32) {
                        response.locals.userAuth = true;
                        console.log("session found!!");
                        next();
                    }
                    else {
                        response.locals.userAuth = false;
                        console.log('cookies found but sessionID is wrong');
                        response.sendStatus(400);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    response.sendStatus(400);
                    console.log("not a signed cookie!");
                    //return response.redirect('/login');
                    response.locals.userAuth = false;
                    console.log(response.locals.userAuth);
                    console.log("can not find session, request to login back");
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25NaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmUvQXV0aGVudGljYXRpb25NaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUErQztBQUcvQyxTQUFzQix3QkFBd0IsQ0FBRSxPQUFlLEVBQUMsUUFBaUIsRUFBQyxJQUFpQjs7Ozs7OztvQkFHM0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO2dDQUN0QyxPQUFPLENBQUMsYUFBYSwwQ0FBRSxjQUFjO29CQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUE7b0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQy9CLHFCQUFNLGlCQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFDLEVBQUMsQ0FBQyxFQUFBOztvQkFBckYsU0FBUyxHQUFJLFNBQXdFO29CQUMzRixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFtQixTQUFXLENBQUMsQ0FBQztvQkFDNUMsSUFBRyxTQUFTLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBQzt3QkFDOUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO3dCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7d0JBQy9CLElBQUksRUFBRSxDQUFDO3FCQUNWO3lCQUFJO3dCQUNELFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzt3QkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO3dCQUNwRCxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUM1Qjs7O29CQUlELFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFDcEMscUNBQXFDO29CQUNyQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDOzs7Ozs7Q0FFdEU7QUE3QkQsNERBNkJDIn0=