var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import CryptoJS from "crypto-js";
import constants from "./constants";
import { getProductAndCategory, getById, getSelectedProdsAndCats, filterByCategory, } from "./handler";
import root_config from "./root_config";
var _isEmpty = function (val) {
    var _a;
    return val === undefined ||
        val === null ||
        (typeof val === "object" && !((_a = Object.keys(val)) === null || _a === void 0 ? void 0 : _a.length)) ||
        (typeof val === "string" && !val.trim().length);
};
var decrypt = function (transitmessage, pass) {
    var _a, _b, _c, _d, _e, _f, _g;
    var salt = (_b = (_a = CryptoJS === null || CryptoJS === void 0 ? void 0 : CryptoJS.enc) === null || _a === void 0 ? void 0 : _a.Hex) === null || _b === void 0 ? void 0 : _b.parse(transitmessage === null || transitmessage === void 0 ? void 0 : transitmessage.substr(0, 32));
    var iv = (_d = (_c = CryptoJS === null || CryptoJS === void 0 ? void 0 : CryptoJS.enc) === null || _c === void 0 ? void 0 : _c.Hex) === null || _d === void 0 ? void 0 : _d.parse(transitmessage === null || transitmessage === void 0 ? void 0 : transitmessage.substr(32, 32));
    var encrypted = transitmessage === null || transitmessage === void 0 ? void 0 : transitmessage.substring(64);
    var key = CryptoJS === null || CryptoJS === void 0 ? void 0 : CryptoJS.PBKDF2(pass, salt, {
        keySize: constants.DECRYPTION.keySize / 32,
        iterations: constants.DECRYPTION.iterations,
    });
    var decrypted = (_e = CryptoJS === null || CryptoJS === void 0 ? void 0 : CryptoJS.AES) === null || _e === void 0 ? void 0 : _e.decrypt(encrypted, key, {
        iv: iv,
        padding: (_f = CryptoJS === null || CryptoJS === void 0 ? void 0 : CryptoJS.pad) === null || _f === void 0 ? void 0 : _f.Pkcs7,
        mode: (_g = CryptoJS === null || CryptoJS === void 0 ? void 0 : CryptoJS.mode) === null || _g === void 0 ? void 0 : _g.CBC,
    });
    return decrypted === null || decrypted === void 0 ? void 0 : decrypted.toString(CryptoJS.enc.Utf8);
};
var handler = function (_a) {
    var query = _a.queryStringParameters, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var message, statusCode, configKeys, configKeysLength, i, key, value, resErr, e_1, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    statusCode = constants.HTTP_ERROR_CODES.OK;
                    configKeys = Object.keys(body);
                    configKeysLength = configKeys === null || configKeys === void 0 ? void 0 : configKeys.length;
                    for (i = 0; i < configKeysLength; i += 1) {
                        key = configKeys[i];
                        value = body[key];
                        // body will have the config object
                        if (root_config.SENSITIVE_CONFIG_KEYS.indexOf(key) > -1) {
                            body[key] = decrypt(value, constants.DECRYPTION.password);
                        }
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, , 11]);
                    console.info(constants.LOGS.REQ_BODY, body);
                    console.info(constants.LOGS.QUERY_PARAMS, query);
                    resErr = new Error();
                    if (_isEmpty(body)) {
                        resErr.statusCode = constants.HTTP_ERROR_CODES.BAD_REQ;
                        resErr.message = constants.HTTP_ERROR_TEXTS.QUERY_MISSING;
                        throw resErr;
                    }
                    /** Below block of code is just for illustration.
                     * Actuall logic of getting products or categories or any other data,
                     * might change based on the ecommerce platform that you are using to integrate.
                     * Please update the code accordingly.
                     * */
                    query.limit =
                        (query === null || query === void 0 ? void 0 : query.limit) > constants.FETCH_PRODUCT_LIMIT ?
                            constants.FETCH_PRODUCT_LIMIT
                            : query === null || query === void 0 ? void 0 : query.limit;
                    if (!(query["sku:in"] || query["id:in"])) return [3 /*break*/, 3];
                    return [4 /*yield*/, getSelectedProdsAndCats(query, body)];
                case 2:
                    message = _b.sent();
                    return [3 /*break*/, 9];
                case 3:
                    if (!query["categories:in"]) return [3 /*break*/, 5];
                    return [4 /*yield*/, filterByCategory(query, body)];
                case 4:
                    message = _b.sent();
                    return [3 /*break*/, 9];
                case 5:
                    if (!(query === null || query === void 0 ? void 0 : query.id)) return [3 /*break*/, 7];
                    return [4 /*yield*/, getById(query, body)];
                case 6:
                    message = _b.sent();
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, getProductAndCategory(query, body)];
                case 8:
                    message = _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    e_1 = _b.sent();
                    statusCode = (e_1 === null || e_1 === void 0 ? void 0 : e_1.statusCode) || constants.HTTP_ERROR_CODES.SOMETHING_WRONG;
                    message = (e_1 === null || e_1 === void 0 ? void 0 : e_1.message) || constants.HTTP_ERROR_TEXTS.SOMETHING_WENT_WRONG;
                    console.error("Error: stack_api_key: ".concat(query === null || query === void 0 ? void 0 : query.stack_apiKey, ", status_code: ").concat(statusCode, ", error_message: ").concat(message));
                    return [3 /*break*/, 11];
                case 11:
                    res = {
                        statusCode: statusCode,
                        headers: __assign(__assign({}, constants.HTTP_RESPONSE_HEADERS), { authToken: "" }),
                        // body: JSON.stringify(message), // For deploying the code to AWS Lambda
                        body: message, // For Localhost
                    };
                    return [2 /*return*/, res];
            }
        });
    });
};
export default handler;
export { handler as lambdaHandler, };
