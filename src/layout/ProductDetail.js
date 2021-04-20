import React from 'react';
import { Flex, FlexItem, PageSection, Title } from '@patternfly/react-core';

import './ProductDetail.scss';
import WidthLimiter from '../components/WidthLimiter.js';
import { productDetail as productDetail } from '../consts';

const ProductDetail = () => {
  return (
    <PageSection
      className="ins-c-content-product-explanation ins-m-display-md pf-m-center"
      isWidthLimited
    >
      <Flex
        direction={{ default: 'column', md: 'row' }}
        spaceItems={{ default: 'spaceItems2xl' }}
        alignItems={{ md: 'alignItemsCenter' }}
        className="pf-m-align-items-center"
      >
        <FlexItem flex={{ default: 'flex_1' }}>
          <WidthLimiter
            style={{
              '--pf-c-width-limiter--MaxWidth-on-md': '40ch',
              '--pf-c-width-limiter--MaxWidth-on-lg': '45ch',
              '--pf-c-width-limiter--MaxWidth-on-xl': '54ch',
            }}
          >
            <Flex
              direction={{ default: 'column' }}
              alignSelf="center"
              spaceItems={{ spaceItems: 'spaceItems2Xl' }}
            >
              <Title headingLevel="h2" size="3xl">
                {productDetail.title}
              </Title>
              <p className="pf-u-font-size-lg">{productDetail.content}</p>
            </Flex>
          </WidthLimiter>
        </FlexItem>
        <Flex
          flex={{ default: 'flex_1' }}
          justifyContent={{ default: 'justifyContentCenter' }}
        >
          <img
            className="ins-c-content-product-explanation__image"
            src="https://cloud.redhat.com/apps/frontend-assets/images/img_cloud-console.svg"
            alt="This is alt text"
          />
        </Flex>
      </Flex>
    </PageSection>
  );
};

export default ProductDetail;
