import React, { Component } from 'react';

import PersonCard from './PersonCard';

class PersonCardContainer extends Component {
  render() {
    return (
      <PersonCard 
        fullName="Janet Jackson"
        facts={['Spouce: Bruce Springsteen', 'Stage Manager at NBC Studios']}
        conversations={[
          {
            date: '2017-12-30',
            summary: 'Tried pickles. Made a funny face.'
          },
          {
            date: '2017-12-13',
            summary: 'Said she had never tried pickles.'
          }
        ]}
        notes={['Doesn\'t like pickles']}
        onClickAddFact={() => alert('Add Fact clicked!')}
        onClickAddConversation={() => alert('Add Convo clicked!')}
        onClickAddNote={() => alert('Add Note clicked!')} />
    );
  }
}

export default PersonCardContainer;
