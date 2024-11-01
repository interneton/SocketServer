import { getGameSession } from "../../sessions/game.session.js";

const locationUpdateHandler = ({socket, userId, payload}) => {
    try {
        const { x, y } = payload;
        const gameSession = getGameSession();

        if(!gameSession){
            console.error("Couldn't find game session");
        }

        const user = gameSession.getUser(userId);

        if(!user){
            console.error("Couldn't find user");
        }

        user.updatePosition(x, y);

        const locationData = gameSession.getAllLocations(userId);

        socket.write(locationData);
    } catch (error) {
       console.error(error); 
    }
}

export default locationUpdateHandler;