import DraftAdapter from './DraftAdapter';
import { Document } from './document';
import { Record } from 'immutable';

test('creates an empty document state', () => {
  const contentState = DraftAdapter.fromDocument(new Document());
  expect(contentState.hasText()).toBe(false);
});
