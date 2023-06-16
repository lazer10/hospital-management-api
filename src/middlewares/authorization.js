/* eslint-disable import/prefer-default-export */
import out from '../helpers/response';
import { verify } from '../helpers/jwt';

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const decodeToken = (req) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = verify(token);
    return user;
  } catch (error) {
    throw error;
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return out(res, 401, 'Invalid access token', null, 'AUTHENTICATION_ERROR');
    }
    req.user = await decodeToken(req, res);
    if (req.user.role !== 'Admin') {
      return out(res, 403, 'You don\'t have access to do that action', null, 'FORBIDDEN');
    }
    return next();
  } catch (error) {
    return out(res, 401, capitalize(error.message || error), null, 'AUTHENTICATION_ERROR');
  }
};

export const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return out(res, 401, 'Invalid access token', null, 'AUTHENTICATION_ERROR');
    }
    req.user = await decodeToken(req, res);
    if (req.user.role !== 'Doctor') {
      return out(res, 403, 'You don\'t have access to do that action', null, 'FORBIDDEN');
    }
    return next();
  } catch (error) {
    return out(res, 401, capitalize(error.message || error), null, 'AUTHENTICATION_ERROR');
  }
};
