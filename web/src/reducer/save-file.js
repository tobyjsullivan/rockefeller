import {Record} from 'immutable';

const State = Record({
  loading: false,
  loaded: false
});

export default (state = new State(), action) => {
  switch (action.type) {
    case 'SAVE_FILE_BEGIN_LOADING':
      return state.merge({loading: true});
    case 'SAVE_FILE_FINISH_LOADING':
      return state.merge({loading: false, loaded: true});
    default:
      return state;
  }
};

export const isSaveFileLoadingStarted = state => state.loading || state.loaded;
export const isSaveFileLoadingFinished = state => state.loaded;
