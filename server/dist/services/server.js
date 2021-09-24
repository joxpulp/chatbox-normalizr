"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http = __importStar(require("http"));
var mongoose_1 = require("../db/mongoose");
var index_1 = __importDefault(require("../routes/index"));
mongoose_1.mongoose();
var app = express_1.default();
var server = new http.Server(app);
app.set('json spaces', 2);
app.use(express_1.default.json()); // Indica que el body viene como JSON
app.use(express_1.default.urlencoded({ extended: true })); // Indica que el body puede tener un informacion como no string
app.get('/', function (req, res) {
    res.json({ msg: 'Connected to the API' });
});
app.use('/api', index_1.default);
exports.default = server;
