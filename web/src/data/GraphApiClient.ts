import axios, { AxiosResponse } from 'axios';
import { List } from 'immutable';
import { CardSummary, ID, RelationshipCard } from "./DataTypes";

const GRAPH_API_URL = process.env.GRAPH_API_URL || 'http://localhost:8080/query';

const cardSummariesQuery = `{
  me {
    relationshipCards {
      id
      name
      isFavourite
    }
  }
}`;

interface CardSummariesResponse {
  data: {
    me: {
      relationshipCards: ReadonlyArray<{
        id: string;
        name: string;
        isFavourite: boolean;
      }>;
    };
  };
}

const relationshipCardQuery = `{
  me {
    relationshipCards {
      id
      name
      memo
      isFavourite
      notes {
        deltaJson
      }
    }
  }
}`;

interface RelationshipCardResponse {
  data: {
    me: {
      relationshipCards: ReadonlyArray<{
        id: string;
        name: string;
        memo: string;
        notes: {
          deltaJson: string;
        };
        isFavourite: boolean;
      }>;
    };
  };
}

const updateRelationshipCardNameQuery = `
mutation($id: ID!, $name: String!) {
  updateRelationshipCardName(cardId: $id, name: $name)
}
`;

const updateRelationshipCardNotesQuery = `
mutation($id: ID!, $deltaJson: String!) {
  replaceRelationshipCardNotes(cardId: $id, deltaJson: $deltaJson)
}
`;

const createRelationshipCardQuery = `
mutation($name: String!) {
  newCard: createRelationshipCard(name: $name) {
    id
  }
}`;

interface CreateRelationshipCardResponse {
  data: {
    newCard: {
      id: string;
    };
  };
}

const deleteRelationshipCardQuery = `
mutation($id: ID!) {
  deleteRelationshipCard(cardId: $id)
}
`;

interface Delta {
  operations: ReadonlyArray<{
    insert?: {
      content: string;
    };
  }>;
}

class GraphApiClient {
  constructor() {
    console.info(`Creating Client: ${GRAPH_API_URL}`);
  }

  async fetchCardSummaries(): Promise<List<CardSummary>> {
    const res = await this.graphRequest<CardSummariesResponse>(cardSummariesQuery);

    const summaries = res.data.me.relationshipCards.map(
      ({id, name, isFavourite}) => ({id, name, favourite: isFavourite}));

    return List(summaries);
  }

  async fetchCardSummary(id: ID): Promise<CardSummary> {
    const res = await this.graphRequest<CardSummariesResponse>(cardSummariesQuery);

    for (let card of res.data.me.relationshipCards) {
      if (card.id === id) {
        const {id, name, isFavourite: favourite} = card;
        return {id, name, favourite};
      }
    }

    throw 'Relationship card not found: '+id;
  }

  async fetchRelationshipCard(id: ID): Promise<RelationshipCard> {
    // TODO: Update the API so we can fetch a single card.
    const res = await this.graphRequest<RelationshipCardResponse>(relationshipCardQuery);

    for (let card of res.data.me.relationshipCards) {
      if (card.id === id) {
        const {id, name, memo: tagline, notes: {deltaJson}, isFavourite: favourite} = card;
        const notes = GraphApiClient.convertToPlainText(JSON.parse(deltaJson));
        return {id, name, tagline, notes, favourite};
      }
    }

    throw 'Relationship card not found: '+id;
  }

  async updateRelationshipCardName(id: ID, name: string) {
    await this.graphRequest<{}>(updateRelationshipCardNameQuery, {id, name});
  }

  async updateRelationshipCardNotes(id: ID, notes: string) {
    const deltaJson = GraphApiClient.convertToDelta(notes);
    const jsonString = JSON.stringify(deltaJson);
    await this.graphRequest<{}>(updateRelationshipCardNotesQuery, {id, deltaJson: jsonString});
  }

  async createRelationshipCard(name: string): Promise<ID> {
    const result = await this.graphRequest<CreateRelationshipCardResponse>(
      createRelationshipCardQuery,
      {name}
    );

    return result.data.newCard.id;
  }

  async deleteRelationshipCard(id: ID) {
    await this.graphRequest<{}>(deleteRelationshipCardQuery, {id});
  }

  private async graphRequest<T>(query: string, variables?: object): Promise<T> {
    const resp = await axios.post<T>(GRAPH_API_URL, { query, variables });
    return resp.data;
  }

  private static convertToPlainText(delta: Delta): string {
    let out = '';

    for (let op of delta.operations) {
      if (op.insert) {
        out += op.insert.content;
      }
    }

    return out;
  }

  private static convertToDelta(notes: string): Delta {
    const lines = notes.split("\n");
    const result = { operations: Array() };

    for (let line of lines) {
      result.operations.push({
        insert: {
          content: line + "\n",
        },
      });
    }

    return result;
  }
}

export default GraphApiClient;
