import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AddDetailButton from './AddDetailButton';
import Card from '../Card';

const Name = styled.h1``;
const Title = styled.h2``;
const FactSummary = styled.section``;
const Fact = styled.p``;
const ConvoList = styled.ul``;
const ConvoSummary = styled.li``;
const ConvoDate = styled.span``;
const NoteList = styled.ul``;
const Note = styled.li``;

const PersonCard = ({fullName, facts, conversations, notes, onClickAddFact, onClickAddConversation, onClickAddNote}) => {
  return (
    <Card>
      <Name>{fullName}</Name>
      <Title>Facts <AddDetailButton onClick={onClickAddFact} /></Title>
      <FactSummary>
        {facts.map(fact => (
          <Fact key={fact}>{fact}</Fact>
        ))}
      </FactSummary>
      <Title>Conversations <AddDetailButton onClick={onClickAddConversation} /></Title>
      <ConvoList>
        {conversations.map(({date, summary}) => (
          <ConvoSummary key={date+summary}>
            <ConvoDate>{date}</ConvoDate> {summary}
          </ConvoSummary>
        ))}
      </ConvoList>
      <Title>Notes <AddDetailButton onClick={onClickAddNote} /></Title>
      <NoteList>
        {notes.map(note => (
          <Note key={note}>{note}</Note>
        ))}
      </NoteList>
    </Card>
  );
};

PersonCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  facts: PropTypes.arrayOf(PropTypes.string).isRequired,
  conversations: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired
  })).isRequired,
  notes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickAddFact: PropTypes.func,
  onClickAddConversation: PropTypes.func,
  onClickAddNote: PropTypes.func
};

PersonCard.defaultProps = {
  onClickAddFact: () => {},
  onClickAddConversation: () => {},
  onClickAddNote: () => {}
};

export default PersonCard;
