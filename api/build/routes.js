"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middy_1 = __importDefault(require("middy"));
const companyController_1 = require("./logic/companyController");
const errorHandlingMiddleware_1 = require("./plumbing/errorHandlingMiddleware");
/*
 * Entry points for business logic
 */
class Routes {
    getCompanyList(event, context) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('routes');
            const data = yield companyController_1.CompanyController.getCompanyList();
            return JSON.stringify(data);
        });
    }
    getCompanyTransactions(event, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield companyController_1.CompanyController.getCompanyTransactions();
            return JSON.stringify(data);
        });
    }
}
/*
 * Plug in middleware
 */
console.log('DEBUG');
console.log(typeof errorHandlingMiddleware_1.errorHandlingMiddleware);
const routes = new Routes();
const getCompanyList = middy_1.default(routes.getCompanyList)
    .use(errorHandlingMiddleware_1.errorHandlingMiddleware);
exports.getCompanyList = getCompanyList;
const getCompanyTransactions = middy_1.default(routes.getCompanyTransactions)
    .use(errorHandlingMiddleware_1.errorHandlingMiddleware);
exports.getCompanyTransactions = getCompanyTransactions;