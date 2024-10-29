import { PACKET_TYPE } from "../../constants/header.js";
import { getProtoMessages } from "../../init/loadProtos.js"
import { serializer } from "../notification/game.notification.js";

export const createResponse = (handlerId, responseCode, data = null) => {
    const protoMessages = getProtoMessages();
    const Response = protoMessages.response.Response;
    
    const response = {
        handlerId,
        responseCode,
        timestamp: Date.now(),
        data: data ? Buffer.from(JSON.stringify(data)) : null,
    };
    
    const buffer = Response.encode(response).finish();

    return serializer(buffer, PACKET_TYPE.NORMAL);
}