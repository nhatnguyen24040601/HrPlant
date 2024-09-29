import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {MaterialIndicator} from 'react-native-indicators';
import CommonSize, {scales} from 'theme/CommonSize';
import Text from 'components/Text';
import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import {useColors} from 'theme/provider/ThemeProvider';

interface IDataDisplay {
    value: string;
    type: 'phone' | 'email';
}

export interface IHandleSendEmailPhone {
    showModal: (data: IDataDisplay) => void;
}

interface IProps {}

const SendEmailOrPhoneSuccess = forwardRef<IHandleSendEmailPhone, IProps>((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const dataRef = useRef<IDataDisplay>();
    const Colors = useColors();

    useImperativeHandle(ref, () => ({
        showModal,
    }));

    const showModal = async (data: IDataDisplay) => {
        dataRef.current = data;
        setVisible(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    const hideModal = () => {
        setVisible(false);
    };

    const onDismiss = () => {
        setLoading(true);
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

    const renderViewSuccess = () => {
        return (
            <>
                <ViewIcon>
                    <SVGIcon name="ic-check" size={scales(30)} color={Colors.green10} strokeWidth={scales(3.5)} />
                </ViewIcon>
                <Title type="s_20_26">{`Your transfer to ${
                    dataRef.current.type === 'email' ? 'email address' : 'phone number'
                }\nhas been sent`}</Title>
                <Desc type="r_14_21">
                    Your transfer to <Desc type="s_14_21">{dataRef.current.value}</Desc>
                    {` has been\nsent to their ${dataRef.current.type === 'email' ? 'email' : 'phone number'}`}
                </Desc>
            </>
        );
    };

    return (
        // @ts-ignore
        <SModal onBackButtonPress={hideModal} onBackdropPress={hideModal} isVisible={visible} onDismiss={onDismiss}>
            <Wrapper
                style={{
                    backgroundColor: Colors.white,
                }}>
                {loading ? renderLoading() : renderViewSuccess()}
            </Wrapper>
        </SModal>
    );
});

export default SendEmailOrPhoneSuccess;

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
    background-color: ${(p) => p.theme.green9};
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
    color: ${(p) => p.theme.grey1};
    text-align: center;
    margin-top: ${scales(8)}px;
`;

const ButtonFund = styled(GlobalSubmitButton)`
    margin-top: ${scales(40)}px;
`;
