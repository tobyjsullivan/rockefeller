import axios, { AxiosResponse } from 'axios';
import { List } from 'immutable';
import { CardSummary } from "./DataTypes";

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
  me: {
    relationshipCards: ReadonlyArray<{
      id: string;
      name: string;
      isFavourite: boolean;
    }>;
  };
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

  private async graphRequest<T>(query: string): Promise<AxiosResponse<T>> {
    return axios({
      url: GRAPH_API_URL,
      method: 'post',
      data: {
        query
      },
    });
  }
}

export default GraphApiClient;
