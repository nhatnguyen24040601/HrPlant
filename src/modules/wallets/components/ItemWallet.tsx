import Text from 'components/Text';
import React from 'react';
import Config from 'react-native-config';
import styled from 'styled-components/native';


import {scales} from 'theme/CommonSize';

interface IProps {
    wallet: wallet.IWallet;
}

const ItemWallet = (props: IProps) => {
    const {wallet} = props;

    const renderViewInfo = () => {
        return (
            <ViewInfo>
                <WalletName type="s_14_21">{wallet.name}</WalletName>
                <WalletCode type="r_12_18">{wallet.code}</WalletCode>
            </ViewInfo>
        );
    };

    const renderViewBalance = () => {
        return (
            <ViewBalance>
                <Balance type="s_14_21">0.00</Balance>
                <Convert type="r_12_18">~ 0.00 NGN</Convert>
            </ViewBalance>
        );
    };

    return (
        <Wrapper>
            <Flag source={{uri: `${Config.API_URL}/${wallet.image}`}} />
            {renderViewInfo()}
            {renderViewBalance()}
        </Wrapper>
    );
};

export default ItemWallet;

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: ${scales(16)}px;
    gap: ${scales(12)}px;
`;

const Flag = styled.Image`
    width: ${scales(32)}px;
    height: ${scales(32)}px;
    border-radius: ${scales(16)}px;
`;

const ViewInfo = styled.View`
    gap: ${scales(4)}px;
    flex: 1;
`;

const WalletName = styled(Text)``;

const WalletCode = styled(Text)`
    color: ${p => p.theme.grey1};
`;

const ViewBalance = styled.View`
    gap: ${scales(4)}px;
`;

const Balance = styled(Text)`
    text-align: right;
`;

const Convert = styled(Text)`
    color: ${p => p.theme.grey1};
    text-align: right;
`;
