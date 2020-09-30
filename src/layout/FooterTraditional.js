import React, { useState } from 'react';
import { RhLogo } from '../components';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import { Modal, ModalVariant } from '@patternfly/react-core/dist/js/components/Modal/Modal';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import { PageSection } from '@patternfly/react-core/dist/js/components/Page/PageSection';

import './FooterTraditional.scss';

const FooterTraditional = () => {

    const [ isModalOpen, setIsModalOpen ] = useState(false);

    return (
        <React.Fragment>
            <PageSection className='ins-c-footer__traditional pf-m-no-fill'>
                <footer role='contentinfo' className='pf-l-flex pf-m-column pf-m-row-on-lg pf-m-align-items-center-on-lg'>
                    <a href='https://www.redhat.com' className='ins-p-footer__logo' target='_blank' rel='noopener noreferrer'><RhLogo /></a>
                    <div className='ins-c-footer__traditional-nav
                                    pf-l-flex pf-m-column
                                    pf-m-row-on-lg
                                    pf-m-flex-1-on-lg pf-m-justify-content-flex-end-on-lg'>
                        <p className='copyright pf-m-spacer-xl-on-lg'>Copyright © 2020 Red Hat, Inc.</p>
                        <nav>
                            <ul className='pf-l-flex pf-m-column pf-m-row-on-md'>
                                <li>
                                    <Button variant='link' className='nav-link ins-p-footer__browser-support' onClick={ () => setIsModalOpen(true) }>
                                        Browser Support
                                    </Button>
                                </li>
                                <li>
                                    <a className='nav-link ins-p-footer__privacy-policy' href='https://www.redhat.com/en/about/privacy-policy'>
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a className='nav-link ins-p-footer__terms' href='https://access.redhat.com/help/terms/'>
                                        Terms of Use
                                    </a>
                                </li>
                                <li>
                                    <a className='nav-link ins-p-footer__all-policies' href='https://www.redhat.com/en/about/all-policies-guidelines'>
                                        All Policies and Guidelines
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>
            </PageSection>
            <Modal
                title="Browser support"
                isOpen={ isModalOpen }
                variant={ ModalVariant.small }
                className='ins-p-browser-support'
                onClose={ () => setIsModalOpen(false) }
                isFooterLeftAligned>
                <p>
                    Red Hat captures and regularly reviews statistical data from our actual web visitors and registered users,
                    rather than generic industry data,
                    to identify the browsers we need to support in alignment with our customers’ needs.
                    Additionally, to safeguard customer data,
                    only browsers which receive security updates from the browser manufacturer are considered for support.
                    We have implemented this policy to ensure that we can provide an excellent experience to a wide user base.
                </p>
                <Title headingLevel="h4"> Cookies and Javascript </Title>
                <p> To successfully interact with our websites and services, your browser must meet the following feature requirements: </p>
                <ul>
                    <li> The browser must be configured to accept cookies </li>
                    <li> The browser must be configured to execute JavaScript </li>
                </ul>
                <Title headingLevel="h4"> Specific browser support </Title>
                <p> We validate against and fully support our customers&#39; use of the past two major releases of the following browsers: </p>
                <ul>
                    <li> Mozilla Firefox </li>
                    <li> Google Chrome </li>
                    <li> Apple Safari </li>
                    <li> Microsoft Edge </li>
                </ul>
            </Modal>
        </React.Fragment>
    );
};

export default FooterTraditional;
