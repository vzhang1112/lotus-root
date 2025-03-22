import { handleUserRequest } from '../controllers/userController.js';

const userRoutes = [
  { method: 'POST', path: '/users', handler: handleUserRequest },
  { method: 'GET', path: '/users/:id', handler: handleUserRequest },
  { method: 'PUT', path: '/users/:id', handler: handleUserRequest },
  { method: 'DELETE', path: '/users/:id', handler: handleUserRequest },
];

export default userRoutes;