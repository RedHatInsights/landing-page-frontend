import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import { Card } from '@patternfly/react-core/dist/js/components/Card/Card';
import { CardBody } from '@patternfly/react-core/dist/js/components/Card/CardBody';
import { CardHeader } from '@patternfly/react-core/dist/js/components/Card/CardHeader';
import { CardFooter } from '@patternfly/react-core/dist/js/components/Card/CardFooter';
import { Grid } from '@patternfly/react-core/dist/js/layouts/Grid/Grid';
import { GridItem } from '@patternfly/react-core/dist/js/layouts/Grid/GridItem';
import { Stack } from '@patternfly/react-core/dist/js/layouts/Stack/Stack';
import { StackItem } from '@patternfly/react-core/dist/js/layouts/Stack/StackItem';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import { PageSection } from '@patternfly/react-core/dist/js/components/Page/PageSection';
import { Tooltip, TooltipPosition } from '@patternfly/react-core/dist/js/components/Tooltip/Tooltip';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import BinocularsIcon from '@patternfly/react-icons/dist/js/icons/binoculars-icon';
import CodeIcon from '@patternfly/react-icons/dist/js/icons/code-icon';
import OutlinedEyeIcon from '@patternfly/react-icons/dist/js/icons/outlined-eye-icon';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Body.scss';
import { PermissionContext } from '../App';

function isBeta() {
    return (window.insights.chrome.isBeta() === true ? '/beta/' : '/');
}

const checkIfUnderMaintenance = (appName, isUnderMaintenanceApps) => {
    return isUnderMaintenanceApps && isUnderMaintenanceApps.includes(appName) ? true : false;
};

const Body = ({ technologies }) => {
    const [ needsRBACTour, setNeedsRBACTour ] = useState();
    const permission = useContext(PermissionContext);

    useEffect(() => {
        fetch('/api/entitlements/v1/services') // We cannot use chrome's function here
        .then(response => response.json())
        .then(entitlements => {
            !entitlements.insights.is_entitled && entitlements.openshift.is_entitled ? setNeedsRBACTour(false) : setNeedsRBACTour(true);
        })
        .catch(setNeedsRBACTour(false));
    }, []);

    return (
        <PageSection
            className='pf-m-fill ins-p-landing__content'
            landing-page-type='authenticated'
            needs-rbac-tour={ permission.isOrgAdmin ? `${needsRBACTour}` : 'false' }>
            <Grid md={ 6 } lg={ 4 } hasGutter>
                { technologies.map(({ icon: Icon, image, iconProps, title, url, apps, baseApp, body, isPreview, isEarlyAccess, isDevPreview, isUnderMaintenance, isUnderMaintenanceApps, id }, key) => ( // eslint-disable-line max-len
                    <GridItem key={ key } className='ins-c-application-card'>
                        <Card className="ins-c-application-info" application-id={ id }>
                            <CardHeader>
                                <Stack>
                                    <StackItem>
                                        { image && <img
                                            className="ins-c-application-info__logo"
                                            aria-hidden
                                            src={ image }
                                            alt={ `${title} logo` } /> }
                                        { Icon && <Icon
                                            className="ins-c-application-info__logo ins-c-icon__active"
                                            aria-hidden
                                            size="xl"
                                            alt={ `${title} logo` }
                                            { ...iconProps } /> }
                                    </StackItem>
                                    <StackItem>
                                        <Title headingLevel='h2'>
                                            { title }
                                        </Title>
                                    </StackItem>
                                </Stack>
                            </CardHeader>
                            <CardBody>
                                <Stack hasGutter className='ins-c-application-info__content'>
                                    { isPreview &&
                                        <StackItem>
                                            <div className="ins-m-tech-preview">
                                                <BinocularsIcon size="sm" /> Tech preview
                                            </div>
                                        </StackItem>
                                    }
                                    { isDevPreview &&
                                        <StackItem>
                                            <div className="ins-m-dev-preview">
                                                <CodeIcon size="sm" /> Developer preview
                                            </div>
                                        </StackItem>
                                    }
                                    { isEarlyAccess &&
                                        <StackItem>
                                            <Tooltip
                                                position={ TooltipPosition.bottom }
                                                content={ <span>Available to limited customers</span> }>
                                                <div className="ins-m-early-preview">
                                                    <OutlinedEyeIcon size="sm" /> Early access preview
                                                </div>
                                            </Tooltip>
                                        </StackItem>
                                    }
                                    <StackItem>
                                        <span className='ins-m-gray'>{ body }</span>
                                    </StackItem>
                                    <StackItem className='ins-c-application-info__content-applist'>
                                        { apps && Object.entries(apps).map(([ appName, appPath ]) => (
                                            <Button
                                                component='a'
                                                isDisabled={ isUnderMaintenance || checkIfUnderMaintenance(appName, isUnderMaintenanceApps) }
                                                isInline
                                                variant="link"
                                                key={ appName }
                                                href={ `${isBeta()}${url}${appPath}` }>
                                                { appName }
                                            </Button>
                                        )) }
                                    </StackItem>
                                </Stack>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    component='a'
                                    isInline
                                    isDisabled={ isUnderMaintenance }
                                    variant="link"
                                    className={ `ins-c-application-info__open ins-c-application-info__open-${url}` }
                                    href= { baseApp ? `${isBeta()}${url}${baseApp}` : `${isBeta()}${url}` }>
                                    <span> Open </span>
                                    <ArrowRightIcon size="sm" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                )) }
            </Grid>
        </PageSection>
    );
};

Body.propTypes = {
    technologies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
        body: PropTypes.node,
        title: PropTypes.node,
        isPreview: PropTypes.bool,
        isEarlyAccess: PropTypes.bool,
        url: PropTypes.string,
        apps: PropTypes.object,
        baseApp: PropTypes.string,
        isUnderMaintenance: PropTypes.bool,
        isUnderMaintenanceApps: PropTypes.array
    }))
};

Body.defaultProps = {
    technologies: []
};

function mapStateToProps({ technologies } = { technologies: { activeTechnologies: []}}) {
    return {
        technologies: technologies && technologies.activeTechnologies.filter(({ disabled }) => !disabled)
    };
}

export { mapStateToProps };
export default connect(mapStateToProps)(Body);
