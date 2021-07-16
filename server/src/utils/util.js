const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import { generator } from "rand-token";

export const encryptPassword = (password) =>
  new Promise((resolve, reject) =>
  {
    bcrypt.genSalt(10, (err, salt) =>
    {
      if (err) {
        reject(err);
        return false;
      }
      bcrypt.hash(password, salt, (err, hash) =>
      {
        if (err) {
          reject(err);
          return false;
        }
        resolve(hash);
        return true;
      });
    });
  });

export const comparePassword = (password, hash) =>
  new Promise(async (resolve, reject) =>
  {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      resolve(isMatch);
      return true;
    } catch (err) {
      reject(err);
      return false;
    }
  });
export const getToken = (payload) =>
{
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 604800, // 1 Week
  });
  return token;
};

export const recupCode = () =>
{
  return generator({ chars: '0-9' }).generate(9);
}

export const getPayload = (token) =>
{
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    return { loggedIn: true, payload };
  } catch (err) {
    // Add Err Message
    return { loggedIn: false };
  }
};

export const emailValidate = (email) =>
{
  const validator = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return validator.test(email);
}

export const fullCalendarDateFormat = (date) =>
{
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = `${formattedDate.getMonth() + 1}`.padStart(2, '0');
  const day = `${formattedDate.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const fullCalendarTimeFormat = (date) =>
{
  const formattedDate = new Date(date);
  const hh = `${formattedDate.getHours()}`.padStart(2, '0');
  const mm = `${formattedDate.getMinutes()}`.padStart(2, '0');
  return `${hh}:${mm}`;
}

// for schedule sharing
export const getScheduleSharingToken = (payload) =>
{
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '356d', 
  });
  return token;
};

export const getScheduleSharingPayload = (token) =>
{
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    return { payload };
  } catch (err) {
    // Add Err Message
    return { payload: null };
  }
};

export const serializeMongoDocument = (document) =>
{
  const doc = { ...document._doc }
  doc['id'] = doc._id;
  delete doc._id;
  delete doc.__v;
  return doc;
}