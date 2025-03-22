import { handleAffiliationRequest } from '../controllers/affiliationController.js';

const affiliationRoutes = [
  { method: 'POST', path: '/affiliations', handler: handleAffiliationRequest },
  { method: 'GET', path: '/affiliations/:user_id', handler: handleAffiliationRequest },
  { method: 'DELETE', path: '/affiliations/:id', handler: handleAffiliationRequest },
];

export default affiliationRoutes;