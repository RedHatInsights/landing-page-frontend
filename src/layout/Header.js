import React, { Fragment } from 'react';
import { Bullseye, TextContent, Text, TextVariants } from '@patternfly/react-core';

const Header = () => (
    <Fragment>
        <Bullseye>
            <TextContent>
                <Text component={ TextVariants.h1 } className="ins-m-bold">
                    BUILD HYBRID WITH RED HAT
                </Text>
            </TextContent>
        </Bullseye>
        <Bullseye>
            <TextContent>
                <Text component={ TextVariants.small } className="ins-c-text__regular-size">
                    Build, deploy, and manage applications on your open hybrid cloud environment
                </Text>
            </TextContent>
        </Bullseye>
    </Fragment>
);

export default Header;
