import React, {forwardRef, useImperativeHandle, useState} from 'react';

import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import styled, {toStyleSheet} from 'styled-components/native';
import {useMyWallets} from 'modules/wallets/src/selector';
import {SvgUri} from 'react-native-svg';
import Config from 'react-native-config';
import Modal from 'react-native-modal';
import {FlatList} from 'react-native';
import {css} from 'styled-components';

interface IProps {
    onSelectWallet: (wallet: wallet.IWallet) => void;
}

export interface IHandleSelectWallet {
    show: () => void;
}

const SelectWallet = forwardRef<IHandleSelectWallet, IProps>((props, ref) => {
    const {onSelectWallet} = props;
    const [visible, setVisible] = useState(false);

    const myWallets = useMyWallets();

    useImperativeHandle(ref, () => ({
        show: showModal,
    }));

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    const renderItem = ({item}: {item: wallet.IWallet}) => {
        const onSelect = () => {
            onSelectWallet(item);
            hideModal();
        };

        return (
            <Item onPress={onSelect}>
                <Image source={{uri: `${Config.API_URL}${item.image}`}} />
                <CountryCode type="m_14_17">{item.code as string}</CountryCode>
                <CountryName type="m_14_17">{item.name as string}</CountryName>
            </Item>
        );
    };

    return (
        // @ts-ignore
        <SModal
            onBackButtonPress={hideModal}
            onBackdropPress={hideModal}
            isVisible={visible}
            animationOut={'slideOutDown'}
            animationIn={'slideInUp'}>
            <Wrapper>
                <Title type="s_20_26">Select wallet</Title>
                <FlatList
                    data={myWallets}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={toStyleSheet(ContentList)}
                />
                <Line />
                <Close type="s_14_17" onPress={hideModal} suppressHighlighting={true}>
                    Close
                </Close>
            </Wrapper>
        </SModal>
    );
});

export default SelectWallet;

const ContentList = css`
    gap: ${scales(12)}px;
`;

const SModal = styled(Modal)`
    flex: 1;
    margin: 0;
    justify-content: flex-end;
`;

const Title = styled(Text)`
    text-align: center;
    margin-bottom: ${scales(12)}px;
`;

const Wrapper = styled.View`
    padding: 0px ${scales(12)}px;
    padding-top: ${scales(16)}px;
    border-radius: ${scales(16)}px;
    max-height: 50%;
    background-color: ${(p) => p.theme.white};
    padding-bottom: ${CommonSize.bottomSpace}px;
`;

const Item = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(16)}px;
    padding: ${scales(12)}px 0px;
    background-color: ${(p) => p.theme.white};
    border-width: ${scales(1)}px;
    border-color: ${(p) => p.theme.grey13};
    padding: ${scales(16)}px;
    border-radius: ${scales(8)}px;
`;

const Image = styled.Image`
    width: ${scales(30)}px;
    height: ${scales(30)}px;
    border-radius: ${scales(15)}px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

const CountryCode = styled(Text)``;

const CountryName = styled(Text)`
    flex: 1;
`;

const Close = styled(Text)`
    padding: ${scales(16)}px;
    text-align: center;
`;

const Line = styled.View`
    width: 100%;
    height: ${scales(1)}px;
    background-color: ${(p) => p.theme.grey2};
    margin: ${scales(12)}px 0px;
`;
