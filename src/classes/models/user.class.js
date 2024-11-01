import { createPingPacket } from '../../utils/notification/game.notification.js';

class User {
  constructor(socket, id, playerId, latency, coords){
    this.id = id;
    this.socket = socket;
    this.playerId = playerId;
    this.latency = latency;
    this.x = coords.x;
    this.y = coords.y;
    this.lastX = 0;
    this.lastY = 0;
    this.speed = 3;
    this.lastUpdateTime= Date.now();
}

  updatePosition(x, y) {
    this.lastX = this.x;
    this.lastY = this.y;
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  ping() {
    const now = Date.now();

    this.socket.write(createPingPacket(now));
  }

  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;
    // console.log(`Received pong from user ${this.id} at ${now} with latency ${this.latency}ms`);
  }

  // 추측항법을 사용하여 위치를 추정하는 메서드
  calculatePosition(latency) {
    if(this.x === this.lastX && this.y === this.lastY)
    {
      return {
        x: this.x,
        y: this.y,
      };
    }

    const timeDiff = (Date.now() - this.lastUpdateTime + latency) / 1000; // 레이턴시를 초 단위로 계산
    const distance = this.speed * timeDiff;
    
   const dirX = this.x !== this.lastX ? Math.sign(this.x - this.lastX) : 0;
   const dirY = this.y !== this.lastY ? Math.sign(this.y - this.lastY) : 0;

   return {
    x : this.x + dirX * distance,
    y : this.y + dirY * distance
   };
  }
}

export default User;
