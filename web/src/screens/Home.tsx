import * as React from 'react';
import Screen from '../ui/Screen';
import Omnibar from '../omnibar/Omnibar';
import Favourites from '../relationship/Favourites';
import Recents from '../relationship/Recents';

export default () => (
  <Screen>
    <Omnibar />
    <Favourites />
    <Recents />
  </Screen>
);
