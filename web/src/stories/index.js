import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import HomeScreen from '../home/HomeScreen';

storiesOf('HomeScreen', module)
  .add('default', () => (
    <HomeScreen />
  ));

