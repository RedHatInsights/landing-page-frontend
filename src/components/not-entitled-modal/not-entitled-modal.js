import {
  Button,
  Modal,
  ModalVariant,
  Stack,
  StackItem,
  Title,
} from '@patternfly/react-core';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import notEntitledData from './not-entitled-data';

import './styles.scss';

const NOT_ENTITLED_PARAM = 'not_entitled';

/**
 * Remove on Jan 12th
 * @deprecated
 */
const NotEntitledModal = () => {
  const { replace } = useHistory();
  const { isProd, isBeta } = useChrome();
  const { search, pathname } = useLocation();
  const params = new URLSearchParams(search);
  const notEntitled = params.has(NOT_ENTITLED_PARAM);
  const notEntitledValue = params.get(NOT_ENTITLED_PARAM);
  const entitlementData = notEntitledData.find(
    ({ entitlement }) => entitlement === notEntitledValue
  );

  // make sure we don't have double modal in pre prod stable envs
  if (!(isProd() && !isBeta())) {
    return null;
  }

  const handleModalToggle = () => {
    replace({
      pathname,
      search: undefined,
    });
  };

  if (!notEntitled || !entitlementData) {
    return null;
  }

  return (
    <Modal
      className="landing chr-c-error-modal"
      variant={ModalVariant.medium}
      app-entitlement={entitlementData.emptyID}
      isOpen={true}
      onClose={handleModalToggle}
      aria-label={entitlementData.emptyTitle}
      header={
        <Title
          headingLevel="h2"
          size="2xl"
          className="chr-c-error-modal__header"
        >
          {entitlementData.emptyTitle}
        </Title>
      }
    >
      <Stack hasGutter className="chr-c-error-modal__content">
        <StackItem className="chr-c-error-modal__content--image">
          {entitlementData.image && (
            <img
              className="chr-c-application-info__logo"
              aria-hidden
              src={entitlementData.image}
              alt={`${entitlementData.title} logo`}
            />
          )}
        </StackItem>
        <StackItem className="chr-c-error-modal__content--body">
          {entitlementData.emptyText}
        </StackItem>
        <StackItem className="chr-c-error-modal__content--footer">
          {entitlementData.emptyAction?.primary && (
            <Button
              variant="primary"
              onClick={() => {
                if (entitlementData.emptyAction?.primary?.navigate) {
                  window.location.href =
                    entitlementData.emptyAction.primary.navigate;
                }
              }}
            >
              {entitlementData.emptyAction.primary.title}
            </Button>
          )}
          <section className="chr-c-error-modal__content--footer-secondary">
            {entitlementData.emptyAction?.secondary &&
              entitlementData.emptyAction.secondary.navigate && (
                <Button
                  variant="link"
                  onClick={() => {
                    window.location.href =
                      entitlementData.emptyAction?.secondary?.navigate || '#';
                  }}
                >
                  Learn more
                </Button>
              )}
            {entitlementData.emptyAction?.secondary &&
              !entitlementData.emptyAction.secondary.navigate && (
                <Button variant="link">Learn more</Button>
              )}
            <Button variant="link" onClick={handleModalToggle}>
              {entitlementData.emptyAction?.close
                ? `${entitlementData.emptyAction.close.title}`
                : 'Close'}
            </Button>
          </section>
        </StackItem>
      </Stack>
    </Modal>
  );
};

export default NotEntitledModal;
