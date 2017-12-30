import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import SidebarButton from './menu/SidebarButton';
import SearchBar from './search/SearchBar';
import Header from './Header';
import PersonCard from './people/PersonCard';
import AddDetailButton from './people/AddDetailButton'

const RenderBox = styled.div`
  margin: 0;
  border: 8px solid #ddd;
  min-height: 100px;
`;

export default () => (
  <div>
    <h1>Proving Grounds</h1>
    <ul>
      <li><Link to="/proving/SidebarButton">SidebarButton</Link></li>
      <li><Link to="/proving/SearchBar">SearchBar</Link></li>
      <li><Link to="/proving/Header">Header</Link></li>
      <li><Link to="/proving/PersonCard">PersonCard</Link></li>
      <li><Link to="/proving/AddDetailButton">AddDetailButton</Link></li>
      <li><Link to="/proving">Clear</Link></li>
    </ul>
    <Route path="/proving/:id" render={() => (
      <RenderBox>
        <Route path="/proving/SidebarButton" render={() => (
          <SidebarButton onClick={() => alert('Button clicked!')} />
        )} />
        <Route path="/proving/SearchBar" render={() => (
          <SearchBar onSearchClick={() => alert('Search clicked!')} />
        )} />
        <Route path="/proving/Header" render={() => (
          <Header
            onSidebarClick={() => alert('Sidebar clicked!')}
            onSearchClick={() => alert('Search clicked!')} />
        )} />
        <Route path="/proving/PersonCard" render={() => (
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
        )} />
        <Route path="/proving/AddDetailButton" render={() => (
          <AddDetailButton onClick={() => alert('Add clicked!')} />
        )} />
      </RenderBox>
    )}>
    </Route>
  </div>
);
