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

const State = Record({
  people: {
    byId: Map({
      janetjackson: new Person({
        id: 'janetjackson', 
        name: 'Janet Jackson',
        facts: List(['Previous Partner: Wissam Mana. Split 2017-09.', 'Singer/Songwriter', 'Birthday: May 16']),
        notes: List(['Brother Michael died in 2009.'])
      }),
      michealJ: new Person({
        id: 'michealJ', 
        name: 'Michael Jackson',
        facts: List(['Died June 29, 2009.', 'Famous Singer']),
        notes: List(['Had a cool house with a theme park called Neverland.', 'Sister, Janet, is also a famous artist.'])
      }),
      'toby.s': new Person({
        id: 'toby.s', 
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
