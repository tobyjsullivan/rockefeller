import * as React from 'react';
import { Document } from './Document';
import { Group, Text } from '../ui/Els';
import Line from './Line';

interface Props {
  document: Document;
}

const DocumentDisplay: React.StatelessComponent<Props> = ({document}) => {
  const lines = [];
  for (const op of document.getOperations().toArray()) {
    if (op.insert) {
      lines.push((<Line>{op.insert}</Line>));
    }
  }

  return (
    <Group>
      {lines}
    </Group>
  );
}

export default DocumentDisplay;
