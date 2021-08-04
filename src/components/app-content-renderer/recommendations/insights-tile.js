import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  StackItem,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import CategoryAccordion from './category-accordion';

const InsightsTile = ({ rhel, openshift, ansible }) => (
  <Card className="ins-c-insights-card" isFlat>
    <CardHeader className="ins-c-insights-card__header">
      <TextContent>
        <Text component="p">
          Red Hat Insights
        </Text>
        <Text component="p" className="subtitle">
          Gain increased visibility into your hybrid cloud deployments so you
          can improve performance and increase security.&nbsp;
          {/* Where does the link bellow leads? */}
          <a href="#">Learn more.</a>
        </Text>
      </TextContent>
    </CardHeader>
    <CardBody className="ins-c-insights-card__body">
      <Stack hasGutter>
        <StackItem>
          <CategoryAccordion {...rhel} title="RHEL" />
        </StackItem>
        <StackItem>
          <CategoryAccordion {...openshift} title="OpenShift" />
        </StackItem>
        <StackItem>
          <CategoryAccordion {...ansible} title="Ansible" />
        </StackItem>
      </Stack>
    </CardBody>
  </Card>
);

InsightsTile.propTypes = {
  rhel: PropTypes.object.isRequired,
  openshift: PropTypes.object.isRequired,
  ansible: PropTypes.object.isRequired,
};

export default InsightsTile;
