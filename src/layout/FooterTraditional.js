import React from 'react';
import { RhLogo } from '../components';

import './FooterTraditional.scss';

const FooterTraditional = () => (
    <footer role='contentinfo' className='ins-c-footer__traditional pf-l-flex pf-m-column pf-m-row-on-lg pf-m-align-items-center-on-lg'>
        <RhLogo />
        <div className='ins-c-footer__traditional-nav pf-l-flex pf-m-column pf-m-row-on-lg pf-m-flex-1-on-lg pf-m-justify-content-flex-end-on-lg'>
            <p className='copyright pf-m-spacer-xl-on-lg'>Copyright © 2019 Red Hat, Inc.</p>
            <nav>
                <ul className='pf-l-flex pf-m-column pf-m-row-on-md'>
                    <li>
                        <a className='nav-link' href='https://www.redhat.com/en/about/privacy-policy'>
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a className='nav-link' href='https://access.redhat.com/help/terms/'>
                            Terms of Use
                        </a>
                    </li>
                    <li>
                        <a className='nav-link' href='https://www.redhat.com/en/about/all-policies-guidelines'>
                            All Policies and Guidelines
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </footer>
);

export default FooterTraditional;
