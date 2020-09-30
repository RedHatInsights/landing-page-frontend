import React from 'react';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';

import './Logout.scss';

const onButtonClick = (url) => {
    window.location.href = `./${url}`;
};

const Logout = () => {
    return (
        <section className="pf-l-page__main-section pf-c-page__main-section ins-c-page__logout">
            <Title headingLevel='h1' size='3xl'> You have logged out. </Title>
            <Button variant='link' onClick={ () => onButtonClick('') }>Take me home</Button>
        </section>
    );
};

export default Logout;
