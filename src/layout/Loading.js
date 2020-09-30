import React from 'react';

import { Main } from '@redhat-cloud-services/frontend-components/components/cjs/Main';
import { Spinner } from '@redhat-cloud-services/frontend-components/components/cjs/Spinner';

const Loading = () => (
    <Main>
        <Spinner centered/>
    </Main>
);

export default Loading;
