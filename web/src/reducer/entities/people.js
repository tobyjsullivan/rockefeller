import { Record, Map, List } from 'immutable';

const Conversation = Record({
  date: '',
  summary: ''
})

const Person = Record({
  id: '',
  name: '',
  facts: List([]),
  convos: List([]),
  notes: List([])
})

const People = Record({
  byId: Map()
});

const State = Record({
  people: new People()
});

const addPerson = (people, id, name, facts, convos, notes) => {
  console.log('Adding person. Id:', id, 'Name:', name, 'Facts:', facts, 'notes', notes)
  return people.set('byId', people.byId.set(id, {
    id,
    name,
    facts: List(facts),
    convos: List(
      convos ? convos.map(({date, summary}) => new Conversation({
        date,
        summary
      })) : []
    ),
    notes: List(notes)
  }));
}

const storePerson = (state, {id, name, facts, convos, notes}) => {
  return state.merge({
    people: addPerson(state.people, id, name, facts, convos, notes)
  });
};

export default (state = new State(), action) => {
  switch (action.type) {
    case 'ENTITY_STORE_PERSON':
      return storePerson(state, action.payload);
    default:
      return state;
  }
}

export const getAllPeopleIds = (state) => state.people.byId.keySeq();
export const findPersonById = (state, personId) => state.people.byId.get(personId);
