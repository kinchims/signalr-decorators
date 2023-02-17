"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setUpRoutes(obj, connection) {
    const events = Object.getPrototypeOf(obj).routes;
    if (!events || events.length === 0)
        return;
    for (const ev of events) {
        connection.on(ev.event, ((...e) => {
            ;
            obj[ev.method](...e);
        }).bind(obj));
    }
}
exports.setUpRoutes = setUpRoutes;
