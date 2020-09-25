"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrongParams = void 0;
function StrongParams(params) {
    return function (request, response, next) {
        var strongParams = {};
        var weakParams = request.body;
        Object.entries(params).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            var weakParam = weakParams[key];
            if (weakParam && typeof weakParam === value) {
                strongParams[key] = weakParam;
            }
        });
        response.locals.strongParams = strongParams;
        request.body = null;
        return next();
    };
}
exports.StrongParams = StrongParams;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Ryb25nUGFybXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9TdHJvbmdQYXJtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFnQixZQUFZLENBQUUsTUFBZ0M7SUFDMUQsT0FBTyxVQUFDLE9BQWdCLEVBQUUsUUFBa0IsRUFBRSxJQUFrQjtRQUU1RCxJQUFNLFlBQVksR0FBNEIsRUFBRSxDQUFDO1FBQ2pELElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFFaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFXO2dCQUFWLEdBQUcsUUFBQSxFQUFDLEtBQUssUUFBQTtZQUV0QyxJQUFNLFNBQVMsR0FBVyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFMUMsSUFBRyxTQUFTLElBQUksT0FBTyxTQUFTLEtBQUssS0FBSyxFQUFDO2dCQUV2QyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDNUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFcEIsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUVsQixDQUFDLENBQUE7QUFDTCxDQUFDO0FBdEJELG9DQXNCQyJ9