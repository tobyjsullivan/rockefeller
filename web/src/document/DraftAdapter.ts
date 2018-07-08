import {Document} from './Document';
import { ContentState, ContentBlock } from 'draft-js';

export function contentStateFromDocument(doc: Document): ContentState {
  let blocks = new Array<ContentBlock>();
  for (const op of doc.getOperations().toArray()) {
    if (op.insert) {
      blocks.push(new ContentBlock({
        key: randomKey(),
        text: op.insert
      }));
    }
  }

  if (blocks.length === 0) {
    blocks.push(createEmptyBlock());
  }

  return ContentState.createFromBlockArray(blocks);
}

function createEmptyBlock(): ContentBlock {
  return new ContentBlock({
    key: randomKey(),
    text: ''
  });
}

function randomKey(): string {
  return Math.floor(Math.random() * Math.pow(2, 32)).toString(32);
}
