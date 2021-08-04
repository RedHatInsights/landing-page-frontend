import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  Stack,
  StackItem,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import CategoryAccordion from './category-accordion';

const InsightsTile = ({ rhel, openshift, ansible }) => (
  <Card isFlat>
    <CardBody>
      <Title headingLevel="h3" size="md" className="pf-u-mb-md">
        Red Hat Insights
      </Title>
      <TextContent className="pf-u-mb-md">
        <Text>
          Gain increased visibility into your hybrid cloud deployments so you
          can improve performance and increase security.&nbsp;
          {/* Where does the link bellow leads? */}
          <a href="#">Learn more.</a>
        </Text>
      </TextContent>
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
