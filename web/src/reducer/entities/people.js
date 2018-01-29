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
  byId: Map({
    janetjackson2: new Person({
      id: 'janetjackson2',
      name: 'Janet Jackson',
      facts: List(['Previous Partner: Wissam Mana. Split 2017-09.', 'Singer/Songwriter', 'Birthday: May 16']),
      notes: List(['Brother Michael died in 2009.'])
    }),
    michealJ2: new Person({
      id: 'michealJ2',
      name: 'Michael Jackson',
      facts: List(['Died June 29, 2009.', 'Famous Singer']),
      notes: List(['Had a cool house with a theme park called Neverland.', 'Sister, Janet, is also a famous artist.'])
    }),
    'toby.s2': new Person({
      id: 'toby.s2',
      name: 'Toby Sullivan',
      facts: List(['Partner: Jess', 'Lives in Sydney', 'Works in software']),
      convos: List([
        new Conversation({
          date: '2018-01-01',
          summary: 'Exchanged happy new year texts'
        }),
        new Conversation({
          date: '2017-12-16',
          summary: 'Attended his farewell party before he went to Aus. He\'s starting a new job in Feb.'
        }),
        new Conversation({
          date: '2017-11-14',
          summary: 'Wished him happy birthday on Facebook but he snubbed me.'
        })
      ]),
      notes: List(['Instagram and twitter: @tobyjsullivan'])
    })
  })
});

const State = Record({
  people: new People()
});

const addPerson = (people, id, name, facts, notes) => {
  return people.set('byId', people.byId.set(id, {
    id,
    name,
    facts: List(facts),
    notes: List(notes)
  }));
}

const storePerson = (state, {id, name, facts, notes}) => {
  return state.merge({
    people: addPerson(state.people, id, name, facts, notes)
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
