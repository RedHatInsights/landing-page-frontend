import { Card } from '@patternfly/react-core/dist/dynamic/components/Card';
import { CardBody } from '@patternfly/react-core/dist/dynamic/components/Card';
import { CardFooter } from '@patternfly/react-core/dist/dynamic/components/Card';
import { Icon } from '@patternfly/react-core/dist/dynamic/components/Icon';
import React from 'react';
import {
  Text,
  TextContent,
} from '@patternfly/react-core/dist/dynamic/components/Text';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import { Link } from 'react-router-dom';
import './simple-service-widget.scss';

interface SimpleServiceWidgetProps {
  id: number;
  body: string;
  linkTitle: string;
  url: string;
}

export const SimpleServiceWidget: React.FunctionComponent<
  SimpleServiceWidgetProps
> = (props) => {
  return (
    <Card isPlain>
      <>
        <CardBody>
          <TextContent
            key={props.id}
            className="pf-v5-u-display-flex pf-v5-u-flex-direction-column"
          >
            <Text component="p" className="pf-v5-u-flex-grow-1">
              {props.body}{' '}
            </Text>
          </TextContent>
        </CardBody>
        <CardFooter>
          <Link to={props.url}>
            {props.linkTitle}
            <Icon className="pf-v5-u-ml-sm" isInline>
              <ArrowRightIcon />
            </Icon>
          </Link>
        </CardFooter>
      </>
    </Card>
  );
};
