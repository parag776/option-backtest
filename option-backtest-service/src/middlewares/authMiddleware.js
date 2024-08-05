import {api_key_authentication} from '../services/authService.js';

export default (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = api_key_authentication(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};
