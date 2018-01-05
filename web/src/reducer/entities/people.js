import { Record, Map, List } from 'immutable';

const Person = Record({
  id: '',
  name: ''
})

const State = Record({
  people: {
    byId: Map({
      janetjackson: new Person({
        id: 'janetjackson', 
        name: 'Janet Jackson'
      }),
      michealJ: new Person({
        id: 'michealJ', 
        name: 'Michael Jackson'
      }),
      'toby.s': new Person({
        id: 'toby.s', 
        name: 'Toby Sullivan'
      })
    })
  }
});

export default (state = new State(), action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const getAllPeopleIds = (state) => state.people.byId.keySeq();
export const findPersonById = (state, personId) => state.people.byId.get(personId);
