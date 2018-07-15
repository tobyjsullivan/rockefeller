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

  requireRelationshipCard(id: ID) {

  }
}

export default sync;
