import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Button,
  Card,
  CardBody,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Split,
  SplitItem,
  Title,
} from '@patternfly/react-core';
import AngleDownIcon from '@patternfly/react-icons/dist/js/icons/angle-down-icon';
import AngleUpIcon from '@patternfly/react-icons/dist/js/icons/angle-up-icon';
import ExternalLinkIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import CubesIcon from '@patternfly/react-icons/dist/js/icons/cubes-icon';
import classNames from 'classnames';

import RecommendationEntry from './recommendation-entry';
import './category-accordion.scss';

const AccordionHeader = ({ isOpen, title, count, setIsOpen, link }) => (
  <Split>
    <SplitItem isFilled>
      <Split hasGutter>
        <SplitItem>
          <Title headingLevel="h3" size="lg">
            {title}
          </Title>
        </SplitItem>
        <SplitItem isFilled>{count > 0 && <Badge>{count}</Badge>}</SplitItem>
      </Split>
    </SplitItem>
    {isOpen && link && (
      <SplitItem>
        <a href={link.href}>
          {link.title}
          <ExternalLinkIcon className="pf-u-ml-md" />
        </a>
      </SplitItem>
    )}
    <SplitItem>
      <Button onClick={setIsOpen} variant="plain" aria-label="Action">
        {isOpen ? <AngleUpIcon /> : <AngleDownIcon />}
      </Button>
    </SplitItem>
  </Split>
);

AccordionHeader.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

const EmptyContent = ({ contentText }) => (
  <EmptyState>
    <EmptyStateIcon icon={CubesIcon} />
    <Title headingLevel="h4" size="lg">
      No recommendations
    </Title>
    {contentText && <EmptyStateBody>{contentText}</EmptyStateBody>}
  </EmptyState>
);

EmptyContent.propTypes = {
  contentText: PropTypes.string.isRequired,
};

const OpenedContent = ({
  title,
  items,
  setIsOpen,
  isOpen,
  category,
  emptyStateContentText,
}) => (
  <Card
    isFlat
    className={classNames('ins-c-accordion pf-u-mb-md', {
      highlight: !isOpen && items.length > 0,
      empty: !isOpen && items.length === 0,
      opened: isOpen,
    })}
  >
    <CardBody className="ins-c-accordion__header">
      <AccordionHeader
        setIsOpen={setIsOpen}
        title={title}
        count={items.length}
        isOpen={isOpen}
      />
    </CardBody>
    <CardBody className="ins-c-accordion__body">
      {isOpen && items.length === 0 && (
        <EmptyContent contentText={emptyStateContentText} />
      )}
      {/*
       * We have to render the items at all times to load the items correctly and update the items state
       *It will not be necessary once everybody is on self services schemas
       */}
      <div hidden={!isOpen}>
        {items.map((item) => (
          <RecommendationEntry key={item.id} category={category} {...item} />
        ))}
      </div>
    </CardBody>
  </Card>
);

OpenedContent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired }))
    .isRequired,
  title: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  category: PropTypes.string.isRequired,
  emptyStateContentText: PropTypes.string.isRequired,
};

const CategoryAccordion = ({
  isOpen,
  setIsOpen,
  title,
  items,
  linkTitle,
  category,
  emptyStateContentText,
}) => {
  return (
    <OpenedContent
      setIsOpen={() => setIsOpen((prev) => !prev)}
      title={title}
      items={items}
      linkTitle="Foo"
      link={{
        href: '#',
        title: linkTitle,
      }}
      emptyStateContentText={emptyStateContentText}
      isOpen={isOpen}
      category={category}
    />
  );
};

CategoryAccordion.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isFilled,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkTitle: PropTypes.string,
  category: PropTypes.string.isRequired,
  emptyStateContentText: PropTypes.string,
};

export default CategoryAccordion;
