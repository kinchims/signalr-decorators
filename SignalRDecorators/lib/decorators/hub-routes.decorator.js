"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HubRoute(route) {
    return function (target, propertyKey, descriptor) {
        const proto = Object.getPrototypeOf(target);
        const data = proto.routes || [];
        Object.setPrototypeOf(target, Object.assign({}, proto, { routes: [...data, { event: route, method: propertyKey }] }));
    };
}
exports.HubRoute = HubRoute;
