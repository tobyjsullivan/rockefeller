import { decorate, observable } from 'mobx';
import { List } from 'immutable';

interface Database {
  relationships: List<Relationship>
}

interface Relationship {
  name: string;
}

class RelationshipDB implements Database {
  relationships = List([
    {
      name: 'Fatinah Zahrah Baba',
    },
    {
      name: 'Leonardo Lima',
    },
  ]);

  addRelationship(name: string) {
    this.relationships = this.relationships.push({name});
  }
}

const instance = new RelationshipDB();

decorate(instance, {
  relationships: observable,
});

export default instance;
