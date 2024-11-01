import { config } from '../config/config.js';
import { PACKET_TYPE } from '../constants/header.js';
import { getHandlerById } from '../handler/index.js';
import { getProtoMessages } from '../init/loadProtos.js';
import { getUserBySocket } from '../sessions/user.session.js';
import CustomError from '../utils/error/customError.js';
import { ErrorCodes } from '../utils/error/errorCodes.js';
import { handleError } from '../utils/error/errorHandler.js';
import { packetParser } from '../utils/parser/packetParser.js';

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    if (socket.buffer.length >= length) {
      const packet = socket.buffer.subarray(totalHeaderLength, length);
      socket.buffer = socket.buffer.subarray(length);
      try {
        switch (packetType) {
          case PACKET_TYPE.NORMAL:
            {
              const { handlerId, userId, payload } = packetParser(packet);
              const handler = getHandlerById(handlerId);
  
              if (!handler) {
                throw new CustomError(ErrorCodes.HANDLER_NOT_FOUND, 'Handler not found.');
              }
  
              handler({ socket, userId, payload });
            }
            break;
          case PACKET_TYPE.PING:
            {
              const protoMessages = getProtoMessages();
              const Ping = protoMessages.common.Ping;
              const pingMessage = Ping.decode(packet);
              const user = getUserBySocket(socket);
              if (!user) {
                throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
              }
              user.handlePong(pingMessage);
            }
            break;
          case PACKET_TYPE.LOCATION:
            {
            }
            break;
        }
      } catch (error) {
        handleError(socket, error);
      }
    } else {
      break;
    }
  }
};
