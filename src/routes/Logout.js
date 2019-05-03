import React from 'react';
import { Title } from '@patternfly/react-core';

import './Logout.scss';

const Logout = () => {
    return (
        <section className="pf-l-page__main-section pf-c-page__main-section ins-c-page__logout">
            <Title size='3xl'> You have logged out of Cloud Services </Title>
            <Title size='xl'><a href={ () => window.insights.chrome.auth.login() }>Log back in</a></Title>
        </section>
    );
};

export default Logout;
