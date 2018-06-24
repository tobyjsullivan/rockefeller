import * as React from 'react';
import {Text, Link} from '../../ui/Elements';

interface Props {
  name: string;
}

const FavouritesListEntry: React.StatelessComponent<Props> = ({name}) => (
  <Text>★ <Link href="#">{name}</Link></Text>
);

export default FavouritesListEntry;
