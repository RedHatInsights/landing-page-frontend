import { Brand, Flex, FlexItem, PageSection } from '@patternfly/react-core';
import React from 'react';

import './FooterMarketing.scss';

const FooterTraditional = () => {
  return (
    <PageSection className="ins-c-footer-marketing" isWidthLimited>
      <footer role="contentinfo">
        <Flex
          direction={{ default: 'column', lg: 'row' }}
          alignItems={{ lg: 'alignItemsCenter' }}
          spaceItems={{ default: 'spaceItemsXl' }}
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
                src="https://cloud.redhat.com/apps/frontend-assets/logos/logo__insights.svg"
                alt="Insights logo"
              />
            </a>
          </FlexItem>
          <Flex
            spaceItems={{ default: 'spaceItemsSm' }}
            flex={{ default: 'flex_1' }}
            direction={{ default: 'column', md: 'row' }}
          >
            <p>Copyright ©2021 Red Hat, Inc.</p>
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
                <li>
                  <a href="">Cookie preference</a>
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
