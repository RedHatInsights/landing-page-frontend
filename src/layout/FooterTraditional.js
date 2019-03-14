import React from 'react';
import { Level, LevelItem } from '@patternfly/react-core';
import { RhLogo } from '../components';

import './FooterTraditional.scss';

const FooterTraditional = () => (
    <footer className="ins-c-footer__traditional">
        <Level>
            <LevelItem>
                <RhLogo />
            </LevelItem>
            <LevelItem className='ins-c-footer__traditional-nav'>
                <p className="copyright">Copyright © 2019 Red Hat, Inc.</p>
                <nav>
                    <a className="nav-link" href="https://www.redhat.com/en/about/privacy-policy">
                        Privacy Policy
                    </a>
                    <a className="nav-link" href="https://access.redhat.com/help/terms/">
                        Terms of Use
                    </a>
                    <a className="nav-link" href="https://www.redhat.com/en/about/all-policies-guidelines">
                        All Policies and Guidelines
                    </a>
                </nav>
            </LevelItem>
        </Level>
    </footer>
);

export default FooterTraditional;
