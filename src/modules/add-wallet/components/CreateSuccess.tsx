import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {MaterialIndicator} from 'react-native-indicators';
import CommonSize, {scales} from 'theme/CommonSize';
import Text from 'components/Text';
import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import {replace} from 'navigation/src/utils';
import {DeviceEventEmitter} from 'react-native';
import {addWallet} from '../src/api';
import {DEVICE_EVENT} from 'utils/events';
import { useColors } from 'theme/provider/ThemeProvider';

export interface IHandleShowSuccess {
    showModal: (currencyId: number) => void;
}

interface IProps {}

const CreateSuccess = forwardRef<IHandleShowSuccess, IProps>((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const shouldReplace = useRef(false);
    const Colors = useColors();

    useImperativeHandle(ref, () => ({
        showModal,
    }));

    const showModal = async (id: number) => {
        try {
            setVisible(true);
            const res = await addWallet({currencyId: id});
            if (res) {
                DeviceEventEmitter.emit(DEVICE_EVENT.REFRESH_WALLETS);
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    };

    const hideModal = () => {
        setVisible(false);
    };

    const onDismiss = () => {
        if (shouldReplace.current) {
            replace('FundWalletScreen');
        }
    };

    const onFundPressed = async () => {
        shouldReplace.current = true;
        hideModal();
    };

    const renderLoading = () => {
        return (
            <>
                <ViewLoading>
                    <MaterialIndicator size={scales(60)} color={Colors.green1} />
                </ViewLoading>
                <TextLoading type="s_14_17">Adding your wallet, please wait...</TextLoading>
            </>
        );
    };

    const renderSuccess = () => {
        return (
            <>
                <ViewIcon>
                    <SVGIcon name="ic-check" size={scales(30)} color={Colors.green10} strokeWidth={scales(3.5)} />
                </ViewIcon>
                <Title type="s_20_26">Congratulations you successfully added a wallet.</Title>
                <Desc type="r_14_21">You just need to fund the wallet now to activate it.</Desc>
                <ButtonFund text="Fund wallet" onPress={onFundPressed} />
            </>
        );
    };

    return (
        // @ts-ignore
        <SModal onDismiss={onDismiss} onBackButtonPress={hideModal} onBackdropPress={hideModal} isVisible={visible}>
            <Wrapper
                style={{
                    backgroundColor: Colors.white,
                }}>
                {loading ? renderLoading() : renderSuccess()}
            </Wrapper>
        </SModal>
    );
});

export default CreateSuccess;

const SModal = styled(Modal)`
    flex: 1;
    margin: 0;
    justify-content: flex-end;
`;

const Wrapper = styled.View`
    padding: ${scales(24)}px ${scales(20)}px ${scales(CommonSize.bottomSpace) + scales(15)}px ${scales(20)}px;
    border-top-right-radius: ${scales(16)}px;
    border-top-left-radius: ${scales(16)}px;
`;

const ViewLoading = styled.View`
    width: ${scales(60)}px;
    height: ${scales(60)}px;
    align-self: center;
`;

const TextLoading = styled(Text)`
    text-align: center;
    margin-top: ${scales(24)}px;
`;

const ViewIcon = styled.View`
    width: ${scales(60)}px;
    height: ${scales(60)}px;
    border-radius: ${scales(30)}px;
    background-color: ${p => p.theme.green9};
    justify-content: center;
    align-items: center;
    align-self: center;
`;

const Title = styled(Text)`
    margin-top: ${scales(24)}px;
    margin-bottom: ${scales(8)}px;
    text-align: center;
`;

const Desc = styled(Text)`
    color: ${p => p.theme.grey1};
    text-align: center;
`;

const ButtonFund = styled(GlobalSubmitButton)`
    margin-top: ${scales(40)}px;
`;
