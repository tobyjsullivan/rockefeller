import { fromDocument } from './DraftAdapter';
import { Document } from './document';

test('creates an empty document state', () => {
  const contentState = fromDocument(new Document());
  expect(contentState.hasText()).toBe(false);
});

test('it transforms a plain single line', () => {
  const input = new Document();
  input.insert('Hello, world!');
  const contentState = fromDocument(input);
  expect(contentState.getBlockMap().size).toBe(1);
  expect(contentState.getFirstBlock().getText()).toBe('Hello, world!');
});
