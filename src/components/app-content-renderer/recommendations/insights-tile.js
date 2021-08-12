import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardHeader,
  Text,
  TextContent,
} from '@patternfly/react-core';
import CategoryAccordion from './category-accordion';

const InsightsTile = ({ rhel, openshift, ansible }) => {
  const [isOpen, setIsOpen] = useState('rhel');
  const handleIsOpen = (category) =>
    setIsOpen((prev) => (prev === category ? undefined : category));
  return (
    <Card className="ins-c-insights-card" isFlat>
      <CardHeader className="ins-c-insights-card__header">
        <TextContent>
          <Text component="p">Red Hat Insights</Text>
          <Text component="p" className="subtitle">
            Gain increased visibility into your hybrid cloud deployments so you
            can improve performance and increase security.&nbsp;
            {/* Where does the link bellow leads? */}
            <a href="#">Learn more.</a>
          </Text>
        </TextContent>
      </CardHeader>
      <CardBody className="ins-c-insights-card__body">
        <CategoryAccordion
          {...rhel}
          isOpen={isOpen === 'rhel'}
          setIsOpen={() => handleIsOpen('rhel')}
          title="RHEL"
        />
        <CategoryAccordion
          {...openshift}
          isOpen={isOpen === 'openshift'}
          setIsOpen={() => handleIsOpen('openshift')}
          title="OpenShift"
        />
        <CategoryAccordion
          {...ansible}
          isOpen={isOpen === 'ansible'}
          setIsOpen={() => handleIsOpen('ansible')}
          title="Ansible"
          emptyStateContentText="Register Ansible Automation Platform with Insights to get recommendations."
        />
      </CardBody>
    </Card>
  );
};

InsightsTile.propTypes = {
  rhel: PropTypes.object.isRequired,
  openshift: PropTypes.object.isRequired,
  ansible: PropTypes.object.isRequired,
};

export default InsightsTile;
