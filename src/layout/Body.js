import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  PageSection,
  Stack,
  StackItem,
  Title,
  Tooltip,
  TooltipPosition,
} from '@patternfly/react-core';
import {
  ArrowRightIcon,
  BinocularsIcon,
  CodeIcon,
  OutlinedEyeIcon,
} from '@patternfly/react-icons';

import { PermissionContext } from '../App';
import { activeTechnologies as technologies } from '../consts';

import './Body.scss';

function isBeta() {
  return window.insights.chrome.isBeta() === true ? '/beta/' : '/';
}

const checkIfUnderMaintenance = (appName, isUnderMaintenanceApps) => {
  return isUnderMaintenanceApps && isUnderMaintenanceApps.includes(appName)
    ? true
    : false;
};

const Body = () => {
  const [needsRBACTour, setNeedsRBACTour] = useState();
  const permission = useContext(PermissionContext);

  useEffect(() => {
    fetch('/api/entitlements/v1/services') // We cannot use chrome's function here
      .then((response) => response.json())
      .then((entitlements) => {
        !entitlements.insights.is_entitled && entitlements.openshift.is_entitled
          ? setNeedsRBACTour(false)
          : setNeedsRBACTour(true);
      })
      .catch(setNeedsRBACTour(false));
  }, []);

  return (
    <PageSection
      className="pf-m-fill ins-p-landing__content"
      landing-page-type="authenticated"
      needs-rbac-tour={permission.isOrgAdmin ? `${needsRBACTour}` : 'false'}
    >
      <Grid md={6} lg={4} xl={3} hasGutter>
        {technologies
          .filter(({ disabled }) => !disabled)
          .map(
            (
              {
                icon: Icon,
                image,
                iconProps,
                title,
                url,
                apps,
                baseApp,
                body,
                isPreview,
                isEarlyAccess,
                isDevPreview,
                isUnderMaintenance,
                isUnderMaintenanceApps,
                id,
              },
              key // eslint-disable-line max-len
            ) => (
              <GridItem key={key} className="ins-c-application-card">
                <Card
                  className="ins-c-application-info"
                  application-id={id}
                  ouiaId={title.toLowerCase().replace(' ', '_')}
                >
                  <CardHeader>
                    <Stack>
                      <StackItem>
                        {image && (
                          <img
                            className="ins-c-application-info__logo"
                            aria-hidden
                            src={image}
                            alt={`${title} logo`}
                          />
                        )}
                        {Icon && (
                          <Icon
                            className="ins-c-application-info__logo ins-c-icon__active"
                            aria-hidden
                            size="xl"
                            alt={`${title} logo`}
                            {...iconProps}
                          />
                        )}
                      </StackItem>
                      <StackItem>
                        <Title headingLevel="h2">{title}</Title>
                      </StackItem>
                    </Stack>
                  </CardHeader>
                  <CardBody>
                    <Stack
                      hasGutter
                      className="ins-c-application-info__content"
                    >
                      {isPreview && (
                        <StackItem>
                          <div className="ins-m-tech-preview">
                            <BinocularsIcon size="sm" /> Tech preview
                          </div>
                        </StackItem>
                      )}
                      {isDevPreview && (
                        <StackItem>
                          <div className="ins-m-dev-preview">
                            <CodeIcon size="sm" /> Developer preview
                          </div>
                        </StackItem>
                      )}
                      {isEarlyAccess && (
                        <StackItem>
                          <Tooltip
                            position={TooltipPosition.bottom}
                            content={
                              <span>Available to limited customers</span>
                            }
                          >
                            <div className="ins-m-early-preview">
                              <OutlinedEyeIcon size="sm" /> Early access preview
                            </div>
                          </Tooltip>
                        </StackItem>
                      )}
                      <StackItem>
                        <span className="ins-m-gray">{body}</span>
                      </StackItem>
                      <StackItem className="ins-c-application-info__content-applist">
                        {apps &&
                          Object.entries(apps).map(([appName, appPath]) => (
                            <Button
                              component="a"
                              isDisabled={
                                isUnderMaintenance ||
                                checkIfUnderMaintenance(
                                  appName,
                                  isUnderMaintenanceApps
                                )
                              }
                              isInline
                              variant="link"
                              key={appName}
                              href={`${isBeta()}${url}${appPath}`}
                            >
                              {appName}
                            </Button>
                          ))}
                      </StackItem>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <Button
                      component="a"
                      isInline
                      isDisabled={isUnderMaintenance}
                      variant="link"
                      className={`ins-c-application-info__open ins-c-application-info__open-${url}`}
                      href={
                        baseApp
                          ? `${isBeta()}${url}${baseApp}`
                          : `${isBeta()}${url}`
                      }
                    >
                      <span> Open </span>
                      <ArrowRightIcon size="sm" />
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            )
          )}
      </Grid>
    </PageSection>
  );
};

export default Body;
