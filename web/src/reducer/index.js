import { combineReducers } from 'redux';

import entities, * as fromEntities from './entities';
import auth, * as fromAuth from './auth';
import saveFile, * as fromSaveFile from './save-file';

export default combineReducers({
  entities,
  auth,
  saveFile
});

// Entities Accessors
export const getAllPeopleIds = (state) => fromEntities.getAllPeopleIds(state.entities);
export const findPersonById = (state, personId) => fromEntities.findPersonById(state.entities, personId);

// Auth Accessors
export const getPasswordHash = state => fromAuth.getPasswordHash(state.auth);

// Save File Accessors
export const isSaveFileLoadingStarted = state => fromSaveFile.isSaveFileLoadingStarted(state.saveFile);
export const isSaveFileLoadingFinished = state => fromSaveFile.isSaveFileLoadingFinished(state.saveFile);
