import React from 'react';
import {
  Title,
  Gallery,
  GalleryItem,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import SecondPanelTile from './SecondPanelTile';
import './styles/SecondPanel.scss';

const FirstPanel = () => {
  return (
    <Gallery hasGutter className="ins-c-landing-body">
      <GalleryItem>
        <Stack className="ins-c-landing-grouping">
          <StackItem className="ins-c-landing-grouping__title">
            <Title headingLevel="h1" size="xl">
              Application Services Recommendations
            </Title>
          </StackItem>
          <StackItem>
            <SecondPanelTile />
          </StackItem>
          <StackItem className="ins-c-landing-grouping--separator">
            <SecondPanelTile />
          </StackItem>
          <StackItem className="ins-c-landing-grouping__title">
            <Title headingLevel="h1" size="xl">
              Automation recommendations
            </Title>
          </StackItem>
          <StackItem>
            <SecondPanelTile />
          </StackItem>
          <StackItem>
            <SecondPanelTile />
          </StackItem>
        </Stack>
      </GalleryItem>
      <Stack className="ins-c-landing-grouping">
        <StackItem className="ins-c-landing-grouping__title">
          <Title headingLevel="h1" size="xl">
            Platform insights
          </Title>
        </StackItem>
        <StackItem>
          <SecondPanelTile title="Operational" />
        </StackItem>
        <StackItem>
          <SecondPanelTile />
        </StackItem>
        <StackItem>
          <SecondPanelTile title="Financial" />
        </StackItem>
        <StackItem>
          <SecondPanelTile />
        </StackItem>
      </Stack>
      <Stack className="ins-c-landing-grouping">
        <StackItem className="ins-c-landing-grouping__title">
          <div style={{ marginBottom: '32px' }} />
        </StackItem>
        <StackItem>
          <SecondPanelTile title="Security" />
        </StackItem>
        <StackItem>
          <SecondPanelTile />
        </StackItem>
      </Stack>
    </Gallery>
  );
};

export default FirstPanel;
