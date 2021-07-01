import { Brand, Flex, FlexItem, PageSection } from '@patternfly/react-core';
import React from 'react';

import './FooterMarketing.scss';

const FooterTraditional = () => {
  return (
    <PageSection className="ins-c-footer-marketing" isWidthLimited>
      <footer>
        <Flex
          direction={{ default: 'column', md: 'row' }}
          alignItems={{
            default: 'alignItemsFlexStart',
            md: 'alignItemsCenter',
          }}
          spaceItems={{ default: 'spaceItemsXl', lg: 'spaceItemsNone' }}
        >
          <FlexItem flex={{ flex: 'flexNone' }}>
            <a
              href="https://www.redhat.com"
              className="ins-c-footer-marketing__logo-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Brand
                className="ins-c-footer-marketing__logo"
                src="https://cloud.redhat.com/apps/frontend-assets/red-hat-logos/logo.svg"
                alt="Insights logo"
              />
            </a>
          </FlexItem>
          <Flex
            spaceItems={{ default: 'spaceItemsSm', lg: 'spaceItemsXl' }}
            flex={{ default: 'flex_1' }}
            direction={{ default: 'column', lg: 'row' }}
          >
            <p>©2021 Red Hat, Inc.</p>
            <nav>
              <ul className="pf-l-flex">
                <li>
                  <a href="https://www.redhat.com/en/about/privacy-policy">
                    Privacy statement
                  </a>
                </li>
                <li>
                  <a href="https://www.redhat.com/en/about/terms-use">
                    Terms of use
                  </a>
                </li>
                <li>
                  <a href="https://www.redhat.com/en/about/all-policies-guidelines">
                    All policies and guidelines
                  </a>
                </li>
              </ul>
            </nav>
          </Flex>
        </Flex>
      </footer>
    </PageSection>
  );
};

export default FooterTraditional;
