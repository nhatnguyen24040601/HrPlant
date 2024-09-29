import React from 'react';
import Config from 'react-native-config';
import styled from 'styled-components/native';

import {useMyWallets, useSelectingWallet} from '../src/selector';

import SVGIcon from 'assets/svg';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const HeaderWallet = () => {
    const Colors = useColors();
    const selectingWallet = useSelectingWallet();

    const onMyWalletsPressed = () => {
        global.showMyWallets();
    };

    const renderWalletInfo = () => {
        return (
            <>
                <Image source={{uri: `${Config.API_URL}/${selectingWallet.image}`}} />
                <TextWallet type="s_14_21">{selectingWallet.name}</TextWallet>
            </>
        );
    };

    const renderSelectWallet = () => {
        return (
            <ButtonSelectWallet onPress={onMyWalletsPressed}>
                {selectingWallet ? renderWalletInfo() : <TextWallet type="s_14_21">My wallets</TextWallet>}
                <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black} />
            </ButtonSelectWallet>
        );
    };

    return (
        <Wrapper>
            {renderSelectWallet()}
            {selectingWallet && (
                <ButtonScan>
                    <SVGIcon name="ic-scan" size={scales(24)} color={Colors.black1} />
                </ButtonScan>
            )}
        </Wrapper>
    );
};

export default HeaderWallet;

const Wrapper = styled.View`
    padding: ${scales(16)}px;
    padding-top: ${CommonSize.statusBarHeight + scales(16)}px;
    background-color: ${(p) => p.theme.white};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const ButtonSelectWallet = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(8)}px;
`;

const TextWallet = styled(Text)``;

const Image = styled.Image`
    width: ${scales(24)}px;
    height: ${scales(24)}px;
    border-radius: ${scales(12)}px;
`;

const ButtonScan = styled.TouchableOpacity``;
