import { combineReducers } from 'redux';

import entities, * as fromEntities from './entities';

export default combineReducers({
  entities
});

export const getAllPeopleIds = (state) => fromEntities.getAllPeopleIds(state.entities);
export const findPersonById = (state, personId) => fromEntities.findPersonById(state.entities, personId);
