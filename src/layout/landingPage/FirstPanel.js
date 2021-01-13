import React from 'react';
import {
  Title,
  Gallery,
  GalleryItem,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import BodyTile from './BodyTile';
import './styles/FirstPanel.scss';

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
            <BodyTile />
          </StackItem>
          <StackItem className="ins-c-landing-grouping--separator">
            <BodyTile />
          </StackItem>
          <StackItem className="ins-c-landing-grouping__title">
            <Title headingLevel="h1" size="xl">
              Automation recommendations
            </Title>
          </StackItem>
          <StackItem>
            <BodyTile />
          </StackItem>
          <StackItem>
            <BodyTile />
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
          <BodyTile title="Operational" />
        </StackItem>
        <StackItem>
          <BodyTile />
        </StackItem>
        <StackItem>
          <BodyTile title="Financial" />
        </StackItem>
        <StackItem>
          <BodyTile />
        </StackItem>
      </Stack>
      <Stack className="ins-c-landing-grouping">
        <StackItem className="ins-c-landing-grouping__title">
          <div style={{ marginBottom: '32px' }} />
        </StackItem>
        <StackItem>
          <BodyTile title="Security" />
        </StackItem>
        <StackItem>
          <BodyTile />
        </StackItem>
      </Stack>
    </Gallery>
  );
};

export default FirstPanel;
