import React from 'react';
import { useSelector } from 'react-redux';
import { CardMidContent, RegularCard, SpecialCard } from '@components/Card';
import styled from 'styled-components';
import {
  ArrowForwardIcon,
  CardBody,
  Flex,
  Heading,
} from '@pancakeswap-libs/uikit';
import { selectTokensAmount } from '@store/information';
import type { TokenAmount } from '@pancakeswap-libs/sdk';

const ResultContainer = styled.div`
  width: 100%;
  max-width: 900px;

  & > div {
    margin-top: 50px;
  }
`;

interface IResultProps {}
export const Result = (props: IResultProps) => {
  const tokensAmount = useSelector(selectTokensAmount);
  /*
  const tokens = Object.entries<TokenAmount>(tokensAmount);
  const items = tokens
    .sort(
      (a, b) =>
        b[1].amount * Number(b[1].price?.price ?? 0) -
        a[1].amount * Number(a[1].price?.price ?? 0),
    )
    .map(([contract, { amount, price }]) => {
      return (
        price &&
        amount * Number(price.price) > 0.01 && (
          <div key={contract}>
            <RegularCard>
              <CardBody>
                <Heading color="contrast">
                  {price.name} ({price.symbol})
                </Heading>
                <Flex justifyContent="space-between">
                  <CardMidContent>
                    $ {(amount * Number(price.price)).toFixed(2)}
                  </CardMidContent>
                  <ArrowForwardIcon mt={30} color="primary" />
                </Flex>
              </CardBody>
            </RegularCard>
          </div>
        )
      );
    });
    */
  return (
    <ResultContainer>
      <SpecialCard>
        <CardBody>
          <Heading color="contrast">Binance Coin (BNB)</Heading>
          <Flex justifyContent="space-between">
            <CardMidContent color="invertedContrast">$ BNBPRICE</CardMidContent>
            <ArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </SpecialCard>
      ITEMS
    </ResultContainer>
  );
};
