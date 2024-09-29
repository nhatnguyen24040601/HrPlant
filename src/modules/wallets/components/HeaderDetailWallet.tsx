import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';

import SVGIcon from 'assets/svg';
import {goBack} from 'navigation/src/utils';
import CommonSize, {hitSlop, scales} from 'theme/CommonSize';
import Config from 'react-native-config';
import Text from 'components/Text';
import ModalManageWallet, {IHandleManageWallet} from './ModalManageWallet';
import { useColors } from 'theme/provider/ThemeProvider';

interface IProps {
    wallet: wallet.IWallet;
    setWallet: (wallet: wallet.IWallet) => void;
}

const HeaderDetailWallet = (props: IProps) => {
    const Colors = useColors();
    const {wallet, setWallet} = props;

    const manageWalletRef = useRef<IHandleManageWallet>();

    const onChangeWallet = (selectedWallet: wallet.IWallet) => {
        setWallet(selectedWallet);
    };

    const onBackPressed = () => {
        goBack();
    };

    const onMenuPressed = () => {
        manageWalletRef.current.showModal();
    };

    const onSelectWalletPressed = () => {
        global.showMyWallets(onChangeWallet);
    };

    return (
        <Wrapper>
            <Button hitSlop={hitSlop} onPress={onBackPressed}>
                <SVGIcon name="ic-back" size={scales(24)} color={Colors.black1} />
            </Button>
            <SelectWallet onPress={onSelectWalletPressed}>
                <Flag source={{uri: `${Config.API_URL}/${wallet.image}`}} />
                <Name type="s_14_21">{wallet.name}</Name>
                <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
            </SelectWallet>
            <Button hitSlop={hitSlop} onPress={onMenuPressed}>
                <SVGIcon name="ic-menu" size={scales(24)} color={Colors.black1} />
            </Button>
            <ModalManageWallet ref={manageWalletRef} />
        </Wrapper>
    );
};

export default React.memo(HeaderDetailWallet);

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: ${CommonSize.statusBarHeight + scales(16)}px ${scales(20)}px ${scales(16)}px ${scales(20)}px;
`;

const Button = styled.TouchableOpacity``;

const SelectWallet = styled.TouchableOpacity`
    flex: 1;
    margin: 0px ${scales(24)}px;
    flex-direction: row;
    align-items: center;
    gap: ${scales(8)}px;
    justify-content: center;
`;

const Flag = styled.Image`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    border-radius: ${scales(10)}px;
`;

const Name = styled(Text)``;
