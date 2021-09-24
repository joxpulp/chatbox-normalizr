"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
var mongoose_1 = require("mongoose");
var messagesCollection = 'normalizemensajes';
var messagesSchema = new mongoose_1.Schema({
    author: {
        email: { type: String, required: true, max: 100 },
        name: { type: String, required: true, max: 100 },
        lastname: { type: String, required: true, max: 100 },
        alias: { type: String, required: true, max: 100 },
        age: { type: Number, required: true },
        avatar: { type: String, required: true, max: 100 },
        date: { type: String, required: true, max: 100 },
        time: { type: String, required: true, max: 100 },
    },
    text: { type: String, required: true, max: 1000 },
}, { versionKey: false });
exports.messages = mongoose_1.model(messagesCollection, messagesSchema);
