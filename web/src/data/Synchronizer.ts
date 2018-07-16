import { ID } from './DataTypes';
import { store } from './Store';
import GraphApiClient from './GraphApiClient';

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

  async requireRelationshipCard(id: ID) {
    const relationshipCard = await this.client.fetchRelationshipCard(id);
    store.setRelationshipCard(relationshipCard);
  }

  async updateRelationshipCardNotes(id: ID, notes: string) {
    await this.client.updateRelationshipCardNotes(id, notes);
    this.requireRelationshipCard(id);
  }
}

export default sync;
