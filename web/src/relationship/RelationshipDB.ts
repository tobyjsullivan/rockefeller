import { decorate, observable } from 'mobx';
import { List } from 'immutable';

interface Database {
  relationships: List<Relationship>
}

interface Relationship {
  name: string;
  favourite: boolean;
}

class RelationshipDB implements Database {
  relationships = List([
    {
      id: '292e497e-7459-48cd-a6ba-017eb270e09b',
      name: 'Fatinah Zahrah Baba',
      favourite: true,
    },
    {
      id: '57ed7d31-8c40-4b0f-9c85-097f2f0fc1b6',
      name: 'Leonardo Lima',
      favourite: true,
    },
    {
      id: '8973e3e9-d05f-45cc-9afb-182bd3a37adc',
      name: 'Ingrid A. Davis',
      favourite: false,
    },
  ]);

  addRelationship(id: string, name: string, favourite: boolean) {
    this.relationships = this.relationships.push({id, name, favourite});
  }
}

const instance = new RelationshipDB();

decorate(instance, {
  relationships: observable,
});

export default instance;
