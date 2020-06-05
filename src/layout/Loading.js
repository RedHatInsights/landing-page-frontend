import React from 'react';

import { Main } from '@redhat-cloud-services/frontend-components/components/Main';
import { Spinner } from  '@redhat-cloud-services/frontend-components/components/Spinner';

const Loading = () => (
    <Main>
        <Spinner centered/>
    </Main>
);

export default Loading;
