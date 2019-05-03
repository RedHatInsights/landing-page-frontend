import React from 'react';
import { Title, Button } from '@patternfly/react-core';

import './Logout.scss';

const onButtonClick = (url) => {
    window.location.href = `./${url}`;
};

const Logout = () => {
    return (
        <section className="pf-l-page__main-section pf-c-page__main-section ins-c-page__logout">
            <Title size='3xl'> You have logged out of Cloud Services </Title>
            <Button variant='link' onClick={ () => onButtonClick('') }>Log back in</Button>
        </section>
    );
};

export default Logout;
