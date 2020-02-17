import React from 'react';
import { RhLogo } from '../components';
import { PageSection } from '@patternfly/react-core';
import './FooterTraditional.scss';

const FooterTraditional = () => (
    <PageSection className='ins-c-footer__traditional pf-m-no-fill'>
        <footer role='contentinfo' className='pf-l-flex pf-m-column pf-m-row-on-lg pf-m-align-items-center-on-lg'>
            <a href='https://www.redhat.com' className='ins-p-footer__logo' target='_blank' rel='noopener noreferrer'><RhLogo /></a>
            <div className='ins-c-footer__traditional-nav pf-l-flex pf-m-column pf-m-row-on-lg pf-m-flex-1-on-lg pf-m-justify-content-flex-end-on-lg'>
                <p className='copyright pf-m-spacer-xl-on-lg'>Copyright © 2020 Red Hat, Inc.</p>
                <nav>
                    <ul className='pf-l-flex pf-m-column pf-m-row-on-md'>
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
);

export default FooterTraditional;
