import {Document} from './Document';
import { ContentState } from 'draft-js';

function fromDocument(doc: Document): ContentState {
  // TODO implement
  return ContentState.createFromText('');
}

export default {
  fromDocument
}
