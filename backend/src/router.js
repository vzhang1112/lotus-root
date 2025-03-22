import { handleAffiliationRequest } from './controllers/affiliationController.js';
import { handleReferenceRequest } from './controllers/referenceRequestController.js';
import { handleUserRequest } from './controllers/userController.js';

const routes = [
  { method: 'POST', path: '/affiliations', handler: handleAffiliationRequest },
  { method: 'PUT', path: '/affiliations/:id', handler: handleAffiliationRequest },
  { method: 'GET', path: '/affiliations/:id', handler: handleAffiliationRequest },
  { method: 'DELETE', path: '/affiliations/:id', handler: handleAffiliationRequest },
  { method: 'POST', path: '/reference-requests', handler: handleReferenceRequest },
  { method: 'PUT', path: '/reference-requests/:id', handler: handleReferenceRequest },
  { method: 'GET', path: '/reference-requests/:id', handler: handleReferenceRequest },
  { method: 'POST', path: '/users', handler: handleUserRequest },
  { method: 'PUT', path: '/users/:id', handler: handleUserRequest },
  { method: 'GET', path: '/users/:id', handler: handleUserRequest },
  { method: 'DELETE', path: '/users/:id', handler: handleUserRequest },
];

export function matchRoute(request) {
  const url = new URL(request.url);
  const { pathname } = url;
  const method = request.method;

  for (const route of routes) {
    const routeRegex = new RegExp(`^${route.path.replace(/:\w+/g, '\\w+')}$`);
    if (method === route.method && routeRegex.test(pathname)) {
      return route.handler;
    }
  }

  return null;
}