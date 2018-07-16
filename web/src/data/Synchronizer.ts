import { ID } from './DataTypes';
import { store } from './Store';
import GraphApiClient from './GraphApiClient';
import { List } from 'immutable';

const sync = new class Synchronizer {
  private client: GraphApiClient;

  constructor() {
    this.client = new GraphApiClient();
  }

  async requireCardSummaries() {
    const cardSummaries = await this.client.fetchCardSummaries();
    store.clearCardSummaries();
    store.appendCardSummaries(cardSummaries);
  }

  async requireCardSummary(id: ID) {
    const cardSummary = await this.client.fetchCardSummary(id);
    console.log('[requireCardSummary] %o', cardSummary);
    store.appendCardSummaries(List([cardSummary]));
  }

  async requireRelationshipCard(id: ID) {
    const relationshipCard = await this.client.fetchRelationshipCard(id);
    store.setRelationshipCard(relationshipCard);
  }

  async updateRelationshipCardNotes(id: ID, notes: string) {
    await this.client.updateRelationshipCardNotes(id, notes);
    this.requireRelationshipCard(id);
  }

  async createRelationshipCard(name: string): Promise<ID> {
    const id = await this.client.createRelationshipCard(name);
    this.requireCardSummary(id);
    return id;
  }
}

export default sync;
