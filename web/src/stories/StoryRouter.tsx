import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { Renderable, RenderFunction } from '@storybook/react';

interface InnerComponentProps {
  story: () => any
}

const InnerComponent: React.StatelessComponent<InnerComponentProps> = ({story}) => story();

const StoryRouter: (story: RenderFunction) => Renderable | null = (story) => (
  <MemoryRouter>
    <InnerComponent story={story} />
  </MemoryRouter>
);

export default StoryRouter;
