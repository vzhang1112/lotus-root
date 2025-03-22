import { handleReferenceRequest } from '../controllers/referenceRequestController.js';

const referenceRequestRoutes = [
  { method: 'POST', path: '/reference-requests', handler: handleReferenceRequest },
  { method: 'GET', path: '/reference-requests', handler: handleReferenceRequest },
];

export default referenceRequestRoutes;