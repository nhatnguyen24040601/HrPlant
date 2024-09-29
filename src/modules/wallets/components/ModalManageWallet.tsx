import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import SVGIcon, {TNameOfIconSVG} from 'assets/svg';
import CommonSize, {scales} from 'theme/CommonSize';
import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';
import { useColors } from 'theme/provider/ThemeProvider';

export interface IHandleManageWallet {
    showModal: () => void;
}

interface IAction {
    icon: TNameOfIconSVG;
    title: string;
    desc: string;
    colorIcon?: string;
    onPress: () => void;
}

interface IProps {}

const ModalManageWallet = forwardRef<IHandleManageWallet, IProps>((props, ref) => {
    const Colors = useColors();
    const [visible, setVisible] = useState(false);

    const onWalletAccountDetailPressed = () => {
        hideModal();
        navigate('WalletAccountDetail');
    };

    const dataActions = useMemo<IAction[]>(
        () => [
            {
                icon: 'ic-wallet-detail',
                title: 'Account details',
                desc: 'Switch to see another wallet',
                onPress: onWalletAccountDetailPressed,
            },
            {
                icon: 'ic-calendar-wallet',
                title: 'Set up direct debit',
                desc: 'Switch to see another wallet',
                onPress: () => {
                    hideModal();
                },
            },
            {
                icon: 'ic-trash-bin',
                title: 'Delete wallet',
                desc: 'Switch to see another wallet',
                colorIcon: Colors.red2,
                onPress: () => {
                    hideModal();
                },
            },
        ],
        []
    );

    useImperativeHandle(ref, () => ({
        showModal,
    }));

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    const renderAction = (item: IAction, index: number) => {
        return (
            <Action key={index} onPress={item.onPress}>
                <SVGIcon name={item.icon} size={scales(24)} color={item?.colorIcon || Colors.black1} />
                <ViewDetail>
                    <Name type="s_14_21">{item.title}</Name>
                    <Desc type="r_12_18">{item.desc}</Desc>
                </ViewDetail>
            </Action>
        );
    };

    return (
        // @ts-ignore
        <SModal onBackButtonPress={hideModal} onBackdropPress={hideModal} isVisible={visible}>
            <Wrapper
                style={{
                    backgroundColor: Colors.white,
                }}>
                <Title type="s_16_24">Manage wallet</Title>
                {dataActions.map(renderAction)}
                <Line />
                <Close type="s_14_17" onPress={hideModal} suppressHighlighting={true}>
                    Close
                </Close>
            </Wrapper>
        </SModal>
    );
});

export default React.memo(ModalManageWallet);

const SModal = styled(Modal)`
    flex: 1;
    margin: 0;
    justify-content: flex-end;
`;

const Wrapper = styled.View`
    padding: ${scales(24)}px ${scales(20)}px ${CommonSize.bottomSpace}px ${scales(20)}px;
    border-top-right-radius: ${scales(16)}px;
    border-top-left-radius: ${scales(16)}px;
`;

const Title = styled(Text)`
    margin-bottom: ${scales(12)}px;
`;

const Action = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(12)}px;
    padding: ${scales(12)}px 0px;
`;

const ViewDetail = styled.View`
    gap: ${scales(4)}px;
`;

const Name = styled(Text)``;

const Desc = styled(Text)`
    color: ${p => p.theme.grey1};
`;

const Line = styled.View`
    width: 100%;
    height: ${scales(1)}px;
    background-color: ${p => p.theme.grey2};
    margin: ${scales(16)}px 0px;
`;

const Close = styled(Text)`
    text-align: center;
`;
