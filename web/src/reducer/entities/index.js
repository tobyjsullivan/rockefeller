import { combineReducers } from 'redux';

import people, * as fromPeople from './people';

export default combineReducers({
  people
});

export const getAllPeopleIds = (state) => fromPeople.getAllPeopleIds(state.people)
export const findPersonById = (state, personId) => fromPeople.findPersonById(state.people, personId);
