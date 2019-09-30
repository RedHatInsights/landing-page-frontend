import React from 'react';

import { Main } from '@red-hat-insights/insights-frontend-components/components/Main';
import { Spinner } from  '@red-hat-insights/insights-frontend-components/components/Spinner';

const Loading = () => (
    <Main>
        <Spinner centered/>
    </Main>
);

export default Loading;
