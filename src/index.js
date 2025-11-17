"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.send("CRM API running with Bun + Express");
});
app.listen(3000, function () {
    console.log("Server running at http://localhost:3000");
});
