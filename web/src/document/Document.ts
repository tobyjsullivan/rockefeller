import { List } from "immutable";

export class Document {
  private operations: Array<DocOperation>;

  constructor() {
    this.operations = [];
  }

  public insert(content: string) {
    this.operations.push(new InsertOperation(content))
  }

  public getOperations(): List<DocOperation> {
    return List.of(...this.operations);
  }
}

export interface DocOperation {
  insert?: string;
}

class InsertOperation implements DocOperation {
  insert?: string

  constructor(content: string) {
    this.insert = content;
  }
}
