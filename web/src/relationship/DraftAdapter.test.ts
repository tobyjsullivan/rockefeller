import DraftAdapter from './DraftAdapter';
import { Document } from './document';

test('creates an empty document state', () => {
  const contentState = DraftAdapter.fromDocument(new Document());
  expect(contentState.hasText()).toBe(false);
});
