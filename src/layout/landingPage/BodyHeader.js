import React from 'react'
import {
  Stack,
  StackItem,
  Flex,
  FlexItem, 
  Title,
  Label,   
} from '@patternfly/react-core';


const BodyHeader = () => {
  return (
    <Stack> 
        <StackItem>

        </StackItem>
        <StackItem className={ 'ins-p-landing-content' }>
          <Flex>
            <FlexItem></FlexItem>
          </Flex>
        </StackItem>
    </Stack>
  )
}

export default BodyHeader;
