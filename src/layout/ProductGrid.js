import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
  Brand,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardHeaderMain,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Modal,
  ModalVariant,
  PageSection,
  PageSectionVariants,
  TextContent,
  Title,
} from '@patternfly/react-core';
import WidthLimiter from '../components/WidthLimiter.js';
import { ArrowRightIcon } from '@patternfly/react-icons';
import { productGridHeader as productGridHeader } from '../consts';
import { productGridLoginText as productGridLoginText } from '../consts';
import { productGridInfoText as productGridInfoText } from '../consts';
import { productGridModalDataSheetText as productGridModalDataSheetText } from '../consts';
import { productGridModalCTAText as productGridModalCTAText } from '../consts';
import { activeTechnologies as technologies } from '../consts';
import './ProductGrid.scss';

export const ProductCardContent = ({
  marketingImage,
  title,
  marketingTitle,
  marketingUrls,
  marketingTitleSecondary,
  marketingContent,
  marketingContentSecondary,
  modalTitle,
  modalImg,
  modalText,
  modalUrls,
  customBlock,
  isExpanded = false,
  isExpandedCallback,
  ...props
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const inlineStyle = {
    '--pf-c-modal-box__header--PaddingTop': 'var(--pf-global--spacer--xl)',
    '--pf-c-modal-box__body--PaddingRight': 'var(--pf-global--spacer--2xl)',
    '--pf-c-modal-box__body--PaddingLeft': 'var(--pf-global--spacer--2xl)',
    '--pf-c-modal-box--c-button--sibling--MarginRight': 0,
  };

  return (
    <React.Fragment>
      {marketingImage && (
        <CardHeader>
          <CardHeaderMain>
            <Brand
              className="ins-c-marketing-card__header-logo"
              src={marketingImage}
              alt={`${title} logo`}
            />
          </CardHeaderMain>
        </CardHeader>
      )}
      <CardBody isFilled={false}>
        <WidthLimiter
          style={{ '--pf-c-width-limiter--MaxWidth-on-lg': '70ch' }}
        >
          <Flex direction={{ default: 'column' }}>
            <Title headingLevel="h3" size="xl">
              {marketingTitle}
            </Title>
            <TextContent className="pf-u-font-size-lg">
              {marketingContent}
            </TextContent>
            {marketingTitleSecondary && (
              <Title headingLevel="h3" size="xl">
                {marketingTitleSecondary}
              </Title>
            )}
            {marketingContentSecondary && (
              <TextContent className="pf-u-font-size-lg">
                {marketingContentSecondary}
              </TextContent>
            )}
          </Flex>
        </WidthLimiter>
      </CardBody>
      {marketingUrls && (
        <CardFooter>
          <Flex
            direction={{ default: 'column' }}
            spaceItems={{ default: 'spaceItemsLg' }}
          >
            <FlexItem>
              <Button
                className="ins-m-marketing"
                variant="secondary"
                isLarge
                href={marketingUrls.login}
                component="a"
              >
                {productGridLoginText}
              </Button>
            </FlexItem>
            {modalTitle && (
              <FlexItem>
                <Button
                  className="ins-m-marketing"
                  variant="link"
                  isInline
                  isLarge
                  onClick={() => {
                    setExpanded(!expanded);
                    isExpandedCallback && isExpandedCallback(!expanded);
                  }}
                  icon={<ArrowRightIcon />}
                  iconPosition="right"
                >
                  {productGridInfoText}
                </Button>
              </FlexItem>
            )}
          </Flex>
        </CardFooter>
      )}
      {customBlock && <React.Fragment>{customBlock}</React.Fragment>}
      {modalTitle && (
        <Modal
          variant={ModalVariant.medium}
          isOpen={expanded}
          onClose={() => {
            setExpanded(!expanded);
            isExpandedCallback && isExpandedCallback(!expanded);
          }}
          {...props}
          style={inlineStyle}
          appendTo={() => document.getElementById("root")}
        >
          <Grid
            hasGutter
            sm={6}
            className="pf-u-py-lg"
            style={{
              '--pf-l-grid--m-gutter--GridGap': 'var(--pf-global--spacer--xl)',
            }}
          >
            <GridItem md={8}>
              <Flex
                direction={{ default: 'column' }}
                spaceItems={{ default: 'spaceItemsLg' }}
              >
                <Title headingLevel="h1" className="" size="xl">
                  {modalTitle}
                </Title>
                <TextContent className="pf-u-font-size-lg">
                  {modalText}
                </TextContent>
                {modalUrls && (
                  <Flex direction={{ default: 'column' }}>
                    {modalUrls.dataSheet && (
                      <FlexItem>
                        <Button
                          className="ins-m-marketing"
                          variant="secondary"
                          isLarge
                          href={modalUrls.dataSheet}
                          component="a"
                        >
                          {productGridModalDataSheetText}
                        </Button>
                      </FlexItem>
                    )}
                    {modalUrls.tryNow && (
                      <FlexItem>
                        <Button
                          className="ins-m-marketing"
                          variant="link"
                          isInline
                          component="a"
                          href={modalUrls.tryNow}
                          isLarge
                          icon={<ArrowRightIcon />}
                          iconPosition="right"
                        >
                          {productGridModalCTAText}
                        </Button>
                      </FlexItem>
                    )}
                  </Flex>
                )}
              </Flex>
            </GridItem>
            <GridItem md={4} className="pf-u-pt-xl">
              <img
                src={modalImg}
                alt={`${title} image`}
                className="pf-u-ml-auto-on-sm"
              />
            </GridItem>
          </Grid>
        </Modal>
      )}
    </React.Fragment>
  );
};

ProductCardContent.propTypes = {
  marketingImage: propTypes.any,
  marketingTitleSecondary: propTypes.any,
  title: propTypes.any,
  marketingTitle: propTypes.any,
  marketingContent: propTypes.any,
  marketingContentSecondary: propTypes.any,
  marketingUrls: propTypes.any,
  modalImg: propTypes.any,
  modalImage: propTypes.any,
  modalTitle: propTypes.string,
  modalText: propTypes.any,
  modalUrls: propTypes.any,
  customBlock: propTypes.any,
  isExpanded: propTypes.bool,
  isExpandedCallback: propTypes.func,
};

const ProductGrid = () => (
  <React.Fragment>
    <PageSection
      className="pf-m-center ins-m-display-md ins-c-product-grid"
      variant={PageSectionVariants.light}
    >
      <Title
        headingLevel="h2"
        className="ins-c-product-grid__section-title pf-u-font-weight-light pf-u-text-align-center pf-u-pb-xl pf-u-pb-2xl-on-md"
        size="4xl"
      >
        {productGridHeader}
      </Title>
      <Grid md={6} className="ins-c-product-grid__layout">
        {technologies
          .filter(({ marketing }) => marketing)
          .map(
            (
              {
                id,
                marketingImage,
                title,
                marketingUrls,
                marketingTitle,
                marketingTitleSecondary,
                marketingContent,
                marketingContentSecondary,
                marketingVideo,
                customBlock,
                featured,
                modalTitle,
                modalImg,
                modalUrls,
                modalText,
              },
              key
            ) => (
              <GridItem
                className={`ins-c-product-grid__item ${
                  featured ? 'pf-m-12-col ins-m-featured' : ''
                }`}
                application-id={id}
                key={key}
              >
                <Card className="pf-m-plain">
                  {featured ? (
                    <Flex
                      direction={{ default: 'column', lg: 'row' }}
                      alignItems={{ lg: 'alignItemsStretch' }}
                      spaceItems={{
                        default: 'spaceItemsLg',
                        lg: 'spaceItemsNone',
                      }}
                      flexWrap={{ lg: 'nowrap' }}
                    >
                      <FlexItem>
                        <ProductCardContent
                          marketingImage={marketingImage}
                          title={title}
                          marketingTitle={marketingTitle}
                          marketingTitleSecondary={marketingTitleSecondary}
                          marketingContent={marketingContent}
                          marketingContentSecondary={marketingContentSecondary}
                          marketingUrls={marketingUrls}
                          modalTitle={modalTitle}
                          modalImg={modalImg}
                          modalUrls={modalUrls}
                          modalText={modalText}
                          customBlock={customBlock}
                        />
                      </FlexItem>
                      {marketingVideo && (
                        <div className="ins-c-product-grid__split-item">
                          <div className="ins-c-card-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src={marketingVideo}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      )}
                    </Flex>
                  ) : (
                    <ProductCardContent
                      marketingImage={marketingImage}
                      title={title}
                      marketingTitle={marketingTitle}
                      marketingContent={marketingContent}
                      marketingContentSecondary={marketingContentSecondary}
                      marketingUrls={marketingUrls}
                      modalTitle={modalTitle}
                      modalImg={modalImg}
                      modalUrls={modalUrls}
                      modalText={modalText}
                      customBlock={customBlock}
                    />
                  )}
                </Card>
              </GridItem>
            )
          )}
      </Grid>
    </PageSection>
  </React.Fragment>
);

export default ProductGrid;
