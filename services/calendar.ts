import { AvailabilitySlot } from '../types';
import { Server } from 'socket.io';

let io: Server | null = null;

export function setSocketServer(server: Server) {
  io = server;
}

export function broadcastAvailabilityUpdate(slot: AvailabilitySlot) {
  if (io) {
    io.emit('availabilityUpdate', slot);
  }
}