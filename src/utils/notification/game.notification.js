import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../../constants/header.js';
import { getProtoMessages } from '../../init/loadProtos.js';

export const serializer = (message, type) => {
  const packetLength = Buffer.alloc(TOTAL_LENGTH);
  packetLength.writeUInt32BE(message.length + TOTAL_LENGTH + PACKET_TYPE_LENGTH, 0);

  const packetType = Buffer.alloc(PACKET_TYPE_LENGTH);
  packetType.writeUInt8(type, 0);

  return Buffer.concat([packetLength, packetType, message]);
};

export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages();
  const location = protoMessages.gameNotification.LocationUpdate;

  const payload = { users };
  const message = location.create(payload);
  const locationPacket = location.encode(message).finish();

  return serializer(locationPacket, PACKET_TYPE.LOCATION);
};

export const gameStartNotification = (gameId, timestamp) => {
  const protoMessages = getProtoMessages();
  const Start = protoMessages.gameNotification.Start;

  const payload = { gameId, timestamp };
  const message = Start.create(payload);
  const startPacket = Start.encode(message).finish();
  return serializer(startPacket, PACKET_TYPE.GAME_START);
};

export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages();
  const ping = protoMessages.common.Ping;

  const payload = { timestamp };
  const message = ping.create(payload);
  const pingPacket = ping.encode(message).finish();
  return serializer(pingPacket, PACKET_TYPE.PING);
};
