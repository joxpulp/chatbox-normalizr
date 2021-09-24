"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var messages_1 = require("../controllers/messages");
var router = express_1.Router();
router.get('/listar', messages_1.messageController.getMessages);
router.post('/agregar', messages_1.messageController.addMessage);
exports.default = router;
