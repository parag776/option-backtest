// Example authService.js file
import 'dotenv/config'
const secret = process.env.API_KEY;

export const api_key_authentication = (token) => {
  try {
    if(token!==secret) throw new Error("Invalid Token");
    return;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
