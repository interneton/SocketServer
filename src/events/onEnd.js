import { getGameSession } from '../sessions/game.session.js';
import { getUserBySocket, removeUser } from '../sessions/user.session.js';

export const onEnd = (socket) => async () => {
  console.log('클라이언트 연결이 종료되었습니다.');

  try {
    const user = getUserBySocket(socket);
    await removeUser(socket);

    const gameSession = getGameSession();
    if (gameSession) {
      gameSession.removeUser(user.id);
      console.log('유저가 게임 세션에서 제거되었습니다.');
    } else {
      console.warn('게임 세션이 존재하지 않습니다. 유저를 제거할 수 없습니다.');
    }
  } catch (error) {
    console.error('onEnd 처리 중 오류 발생:', error);
  }
};
