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
    <Card className="land-c-insights-card" isFlat>
      <CardHeader className="land-c-insights-card__header">
        <TextContent>
          <Text component="p">Red Hat Insights</Text>
          <Text component="p" className="subtitle">
            Gain increased visibility into your hybrid cloud deployments so you
            can improve performance and increase security.
          </Text>
        </TextContent>
      </CardHeader>
      <CardBody className="land-c-insights-card__body">
        {rhel?.items?.length > 0 && (
          <CategoryAccordion
            {...rhel}
            isOpen={isOpen === 'rhel'}
            setIsOpen={() => handleIsOpen('rhel')}
            title="RHEL"
          />
        )}
        {openshift?.items?.length > 0 && (
          <CategoryAccordion
            {...openshift}
            isOpen={isOpen === 'openshift'}
            setIsOpen={() => handleIsOpen('openshift')}
            title="OpenShift"
          />
        )}
        {ansible?.items?.length > 0 && (
          <CategoryAccordion
            {...ansible}
            isOpen={isOpen === 'ansible'}
            setIsOpen={() => handleIsOpen('ansible')}
            title="Ansible"
            emptyStateContentText="Register Ansible Automation Platform with Insights to get recommendations."
          />
        )}
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
