import React from 'react';
import { useSelector } from 'react-redux';
import { selectTokenUserData } from '@store/information';
import { CardMidContent, RegularCard, SpecialCard } from '@components/Card';
import styled from 'styled-components';
import {
  ArrowForwardIcon,
  CardBody,
  Flex,
  Heading,
} from '@pancakeswap-libs/uikit';

const ResultContainer = styled.div`
  width: 100%;
  max-width: 900px;

  & > div {
    margin-top: 50px;
  }
`;

interface IResultProps {}
export const Result = (props: IResultProps) => {
  const tokenUserData = useSelector(selectTokenUserData);
  const tokens = Object.entries(tokenUserData.tokens);
  const netWorth = tokens.reduce(
    (pre, [_, { amount, price }]) => pre + amount * Number(price?.price ?? 0),
    0,
  );
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
  return (
    <ResultContainer>
      <SpecialCard>
        <CardBody>
          <Heading color="contrast">Binance Coin (BNB)</Heading>
          <Flex justifyContent="space-between">
            <CardMidContent color="invertedContrast">
              $ {tokenUserData.BNBAmount * tokenUserData.BNBPrice}
            </CardMidContent>
            <ArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </SpecialCard>
      {items}
    </ResultContainer>
  );
};
