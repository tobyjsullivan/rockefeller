import { combineReducers } from 'redux';

import entities, * as fromEntities from './entities';
import auth, * as fromAuth from './auth';

export default combineReducers({
  entities,
  auth
});

// Entities Accessors
export const getAllPeopleIds = (state) => fromEntities.getAllPeopleIds(state.entities);
export const findPersonById = (state, personId) => fromEntities.findPersonById(state.entities, personId);

// Auth Accessors
export const getPasswordHash = state => fromAuth.getPasswordHash(state.auth);
