import {Record} from 'immutable';
import crypto from 'crypto';

const State = Record({
  passwordHash: ''
});

const setPassword = (state, {password}) => {
  const hash = crypto.createHash('sha256')
                 .update(password)
                 .digest('hex');

  return state.merge({passwordHash: hash});
};

export default (state = new State(), action) => {
  switch(action.type) {
    case 'AUTH_SET_PASSWORD':
      return setPassword(state, action.payload);
    default:
      return state;
  }
}

export const getPasswordHash = (state) => state.passwordHash;
