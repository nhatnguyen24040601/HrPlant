import React from 'react';
import styled from 'styled-components/native';

import SVGIcon from 'assets/svg';

import Text from 'components/Text';
import {useShouldShowBalance} from 'modules/setting/src/selector';

import {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const ItemActivity = () => {
    const showBalance = useShouldShowBalance();
    const Colors = useColors();

    return (
        <Wrapper>
            <ViewIcon>
                <SVGIcon name="ic-arrow-up" size={scales(20)} color={Colors.red5} />
            </ViewIcon>
            <ViewCenter>
                <Name type="s_14_21">Transfer to Isaac Ojo</Name>
                <Desc type="r_12_18">Just now</Desc>
            </ViewCenter>
            <ViewBalance>
                <Balance showBalance={showBalance} type="s_14_21">
                    {showBalance ? '-415.77' : '****'} GBP
                </Balance>
                <Convert type="r_12_18">{showBalance ? '-580,000.00' : '****'} NGN</Convert>
            </ViewBalance>
        </Wrapper>
    );
};

export default ItemActivity;

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: ${scales(14)}px ${scales(16)}px;
    gap: ${scales(12)}px;
`;

const ViewIcon = styled.View`
    width: ${scales(40)}px;
    height: ${scales(40)}px;
    border-radius: ${scales(20)}px;
    background-color: ${(p) => p.theme.pink};
    justify-content: center;
    align-items: center;
`;

const ViewCenter = styled.View`
    flex: 1;
    gap: ${scales(4)}px;
`;

const Name = styled(Text)``;

const Desc = styled(Text)`
    color: ${(p) => p.theme.grey1};
`;

const ViewBalance = styled.View`
    gap: ${scales(4)}px;
`;

const Balance = styled(Text)<{showBalance?: boolean}>`
    color: ${(p) => (p.showBalance ? p.theme.red2 : p.theme.black1)};
    text-align: right;
`;

const Convert = styled(Text)`
    color: ${(p) => p.theme.grey1};
    text-align: right;
`;
