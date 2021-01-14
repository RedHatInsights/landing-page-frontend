/* eslint-disable */
import React from 'react';
import { 
  Title, 
  Gallery, 
  GalleryItem, 
  Stack, 
  StackItem,
  Split,
  SplitItem
} from '@patternfly/react-core'; 
import './styles/FirstPanel.scss';
import FirstPanelTile from './FirstPanelTile';

const FirstPanel = () => {
  return (
    <>
      <Gallery hasGutter className="ins-c-landing-header">
        <GalleryItem>
          <Stack className="ins-c-landing-header__grouping">
            <StackItem>
              <Title
                className="ins-c-landing-header__groupingTitle"
                headingLevel="h1"
                size="lg"
              >
                Application Services
              </Title>
            </StackItem>
            <StackItem>
              <Split hasGutter>
                <SplitItem>
                  <FirstPanelTile header="###" title="Kafka Clusters" />
                </SplitItem>
                <SplitItem>
                  <FirstPanelTile header="###" title="API Objects" />
                </SplitItem>
                <SplitItem>
                  <FirstPanelTile header="###" title="OpenDataHub Objects" />
                </SplitItem>
              </Split>
            </StackItem>
          </Stack>
        </GalleryItem>
        <GalleryItem>
          <Stack className="ins-c-landing-header__grouping">
            <StackItem>
              <Title className="ins-c-header--title" headingLevel="h1" size="lg">
                Platforms
              </Title>
            </StackItem>
            <StackItem className="ins-c-tile-grouping">
              <Split>
                <SplitItem>
                  <FirstPanelTile header="###" title="API Objects" />
                </SplitItem>
                <SplitItem>
                  <FirstPanelTile header="###" title="API Objects" />
                </SplitItem>
              </Split>
            </StackItem>
          </Stack>
        </GalleryItem>
        <GalleryItem className="ins-c-landing-header__grouping">
          <Stack>
            <StackItem>
              <Title className="ins-c-header--title" headingLevel="h1" size="lg">
                Automation
              </Title>
            </StackItem>
            <StackItem>
              <Split>
                <SplitItem>
                  <FirstPanelTile header="###" title="API Objects" />
                </SplitItem>
              </Split>
            </StackItem>
          </Stack>
        </GalleryItem>
      </Gallery>
    </>
  );
};

export default FirstPanel;
