import { v4 as uuidv4 } from 'uuid';
import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

export const findUserByDeviceID = async (deviceId) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_DEVICE_ID, [deviceId]);
  return toCamelCase(rows[0]);
};

export const createUser = async (deviceId) => {
  const id = uuidv4();
  console.log("유저 생성");
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [deviceId]);
  return { deviceId };
};

export const updateUserLogin = async (deviceId) => {
  console.log("유저 로그인");
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [deviceId]);
};

export const updateUserLocation = async (x, y, deviceId) => {
  console.log("유저 포지션 저장");
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOCATION, [x, y, deviceId]);
};
