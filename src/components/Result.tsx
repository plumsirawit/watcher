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
import { selectTokensData } from '@store/information';
import {
  Currency,
  CurrencyAmount,
  Fraction,
  JSBI,
  Token,
  TokenAmount,
} from '@pancakeswap-libs/sdk';
import { STokenAmount } from '@models/utils/serializable-types';

const ResultContainer = styled.div`
  width: 100%;
  max-width: 900px;

  & > div {
    margin-top: 50px;
  }
`;

interface IResultProps {}
export const Result = (props: IResultProps) => {
  const tokensData = useSelector(selectTokensData);
  const sTokens =
    tokensData?.tokens && Object.entries<STokenAmount>(tokensData.tokens);
  const tokens = sTokens?.map(([k, v]) => [
    k,
    new TokenAmount(
      new Token(
        v.token.chainId,
        v.token.address,
        v.token.decimals,
        v.token.symbol,
        v.token.name,
      ),
      v.numerator,
    ),
  ]) as [string, TokenAmount][] | undefined;
  const sBNBAmount = useSelector(selectTokensData).BNBAmount;
  const BNBAmount = sBNBAmount && CurrencyAmount.ether(sBNBAmount.numerator);
  const items = tokens
    ?.sort((a, b) => (b[1].lessThan(a[1]) ? -1 : 1))
    ?.map(([contract, tokenAmount]) => {
      return (
        tokenAmount &&
        tokenAmount.greaterThan(
          new Fraction(JSBI.BigInt(1), JSBI.BigInt(1000000)),
        ) && (
          <div key={contract}>
            <RegularCard>
              <CardBody>
                <Heading color="contrast">
                  {tokenAmount.token.name} ({tokenAmount.token.symbol})
                </Heading>
                <Flex justifyContent="space-between">
                  <CardMidContent>{tokenAmount.toFixed(6)}</CardMidContent>
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
              $ {BNBAmount?.toFixed(6)}
            </CardMidContent>
            <ArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </SpecialCard>
      {items}
    </ResultContainer>
  );
};
