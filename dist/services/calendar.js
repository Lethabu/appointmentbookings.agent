"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSocketServer = setSocketServer;
exports.broadcastAvailabilityUpdate = broadcastAvailabilityUpdate;
let io = null;
function setSocketServer(server) {
    io = server;
}
function broadcastAvailabilityUpdate(slot) {
    if (io) {
        io.emit('availabilityUpdate', slot);
    }
}
