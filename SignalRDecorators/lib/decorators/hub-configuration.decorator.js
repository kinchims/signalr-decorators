"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_routes_1 = require("../helpers/setup-routes");
function HubConfiguration(options) {
    return function f(target) {
        const keys = Object.keys(options);
        if (keys.length > 1)
            throw "Only one hub connected accepted";
        return class extends target {
            constructor() {
                super();
                for (const prop in options) {
                    const builder = options[prop]();
                    const connection = builder.build();
                    setup_routes_1.setUpRoutes(this, connection);
                    this[prop] = connection;
                    Object.getPrototypeOf(this).__connection = connection;
                }
            }
        };
    };
}
exports.HubConfiguration = HubConfiguration;
