import { List, Map, Iterable } from 'immutable';
import { decorate, observable, action, computed } from 'mobx';
import * as Fuzzy from 'fuzzy';
import { ID, CardSummary, RelationshipCard } from './DataTypes';

class Store {
  cardSummaries: List<CardSummary> = List();
  relationshipCards: Map<ID, RelationshipCard> = Map();
  searchQuery: string = '';

  getRelationshipCard(id: ID): RelationshipCard {
    return this.relationshipCards.get(id);
  }

  get filteredCardSummaries(): Iterable<number, CardSummary> {
      const filter = this.searchQuery;
      let relationships: Iterable<number, CardSummary> = this.cardSummaries;

      let results = Fuzzy.filter(filter, relationships.toArray(), {extract: rel => rel.name});
      let matches = results.map(el => el.original);
      return List(matches);
  }

  appendCardSummaries(summaries: Iterable<any, CardSummary>) {
    this.cardSummaries = this.cardSummaries.push(...summaries.toArray());
  }

  clearCardSummaries() {
    this.cardSummaries = List();
  }

  setRelationshipCard(card: RelationshipCard) {
    this.relationshipCards = this.relationshipCards.set(card.id, card);
  }
}

decorate(Store, {
  cardSummaries: observable,
  filteredCardSummaries: computed,
  relationshipCards: observable,
  searchQuery: observable,
  appendCardSummaries: action,
  clearCardSummaries: action,
  setRelationshipCard: action,
});

export const store = new Store();
