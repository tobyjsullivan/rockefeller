
export type ID = string;

export interface RelationshipCard {
  id: ID;
  name: string;
  tagline: string;
  notes: string;
  favourite: boolean;
}

export interface CardSummary {
  id: ID;
  name: string;
  favourite: boolean;
}
