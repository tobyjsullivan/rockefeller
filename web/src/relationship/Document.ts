export class Document {
  private operations: Array<DocOperation>

  constructor() {
    this.operations = [];
  }

  public insert = (content: string) => {
    this.operations.push(new InsertOperation(content))
  }
}

export interface DocOperation {
  insert?: string
}

class InsertOperation implements DocOperation {
  insert?: string

  constructor(content: string) {
    this.insert = content;
  }
}
