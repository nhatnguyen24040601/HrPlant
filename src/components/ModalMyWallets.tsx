import React, {useEffect, useRef, useState} from 'react';
import Config from 'react-native-config';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import styled, {css, toStyleSheet} from 'styled-components/native';

import GlobalInput from './GlobalInput';
import GlobalSubmitButton from './GlobalSubmitButton';
import Text from './Text';

import SVGIcon from 'assets/svg';
import {selectWalletAction} from 'modules/wallets/src/actions';
import {useMyWallets} from 'modules/wallets/src/selector';

import {navigate} from 'navigation/src/utils';
import {getColors} from 'theme/CommonColors';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const ModalMyWallets = () => {
    const Colors = useColors();
    const myWallets = useMyWallets();
    const [visible, setVisible] = useState(false);
    const cb = useRef<(wallet: wallet.IWallet) => void>();

    const dispatch = useDispatch();

    useEffect(() => {
        global.showMyWallets = showModal;
    }, []);

    const showModal = (callback?: (wallet: wallet.IWallet) => void) => {
        setVisible(true);
        cb.current = callback;
    };

    const hideModal = () => {
        setVisible(false);
        cb.current = null;
    };

    const onAddWalletPressed = () => {
        hideModal();
        navigate('AddWalletScreen');
    };

    const renderHeader = () => {
        return (
            <ViewHeader>
                <ViewTitle>
                    <TextTile type="s_16_24">My wallets</TextTile>
                    <ButtonClose onPress={hideModal}>
                        <SVGIcon name="ic-x" size={scales(24)} color={Colors.black1} />
                    </ButtonClose>
                </ViewTitle>
                <GlobalInput
                    containerStyle={toStyleSheet(styleSearch)}
                    viewLeft={<SVGIcon name="ic-search" size={scales(20)} color={Colors.black1} />}
                    placeholder="Search..."
                />
            </ViewHeader>
        );
    };

    const renderItem = ({item}: {item: wallet.IWallet | unknown}) => {
        const i = item as wallet.IWallet;

        const onSelect = () => {
            if (!!cb.current) {
                cb.current?.(i);
            } else {
                dispatch(
                    selectWalletAction({
                        walletId: i.id,
                    })
                );
            }

            hideModal();
        };

        return (
            <Item onPress={onSelect}>
                <Image source={{uri: `${Config.API_URL}${i.image}`}} />
                <WalletCode type="m_14_17">{i.code}</WalletCode>
                <WalletName type="m_14_17">{i.name}</WalletName>
            </Item>
        );
    };

    const renderBottom = () => {
        return (
            <ViewBottom>
                <ButtonAddWallet
                    onPress={onAddWalletPressed}
                    text="Add wallet"
                    textType="s_14_17"
                    iconLeft={<SVGIcon name="ic-plus" size={scales(18)} color={Colors.white} />}
                />
            </ViewBottom>
        );
    };

    const renderEmpty = () => {
        return (
            <ViewEmpty>
                <ViewIcon>
                    <SVGIcon name="ic-payment-wallet" size={scales(28)} />
                </ViewIcon>
                <TitleEmpty type="s_14_21">Nothing to see yet</TitleEmpty>
                <ContentEmpty type="r_12_18">You have not added any wallet</ContentEmpty>
            </ViewEmpty>
        );
    };

    return (
        // @ts-ignore
        <SModal onBackButtonPress={hideModal} onBackdropPress={hideModal} isVisible={visible}>
            <Wrapper>
                {renderHeader()}
                <ListWallet
                    data={myWallets}
                    renderItem={renderItem}
                    contentContainerStyle={{paddingHorizontal: scales(16)}}
                    ListEmptyComponent={renderEmpty}
                />
                {renderBottom()}
            </Wrapper>
        </SModal>
    );
};

export default React.memo(ModalMyWallets);

const styleSearch = css`
    background-color: ${getColors().white};
    height: ${scales(48)}px;
    margin: ${scales(16)}px 0px;
`;

const SModal = styled(Modal)`
    flex: 1;
    margin: 0;
    justify-content: flex-end;
`;

const Wrapper = styled.View`
    padding-top: ${scales(24)}px;
    height: 70%;
    border-top-right-radius: ${scales(16)}px;
    border-top-left-radius: ${scales(16)}px;
    background-color: ${(p) => p.theme.white};
`;

const ViewHeader = styled.View`
    padding: 0px ${scales(16)}px;
`;

const ViewTitle = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TextTile = styled(Text)``;

const ButtonClose = styled.TouchableOpacity``;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace + scales(10)}px;
    border-top-width: ${scales(1)}px;
    border-color: ${(p) => p.theme.grey2};
`;

const ButtonAddWallet = styled(GlobalSubmitButton)`
    height: ${scales(48)}px;
`;

const ListWallet = styled.FlatList`
    flex: 1;
`;

const ViewEmpty = styled.View`
    align-items: center;
    margin-top: ${scales(40)}px;
`;

const ViewIcon = styled.View`
    width: ${scales(48)}px;
    height: ${scales(48)}px;
    border-radius: ${scales(24)}px;
    background-color: ${(p) => p.theme.green8};
    justify-content: center;
    align-items: center;
`;

const TitleEmpty = styled(Text)`
    margin-top: ${scales(16)}px;
`;

const ContentEmpty = styled(Text)`
    margin-top: ${scales(8)}px;
    color: ${(p) => p.theme.grey1};
`;

const Item = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(16)}px;
    padding: ${scales(12)}px 0px;
`;

const Image = styled.Image`
    width: ${scales(30)}px;
    height: ${scales(30)}px;
    border-radius: ${scales(15)}px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

const WalletCode = styled(Text)``;

const WalletName = styled(Text)`
    flex: 1;
`;
