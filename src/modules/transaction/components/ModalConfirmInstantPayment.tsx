import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {MaterialIndicator} from 'react-native-indicators';
import Text from 'components/Text';

import {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

export interface IHandleConfirmInstantPayment {
    showModal: (data: IDataRequire) => void;
}

interface IDataRequire {
    cb: () => void;
}

interface IProps {}

const ModalConfirmInstantPayment = forwardRef<IHandleConfirmInstantPayment, IProps>((props, ref) => {
    const Colors = useColors();
    const [visible, setVisible] = useState(false);
    const callback = useRef<() => void>();
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        showModal,
    }));

    const showModal = (data: IDataRequire) => {
        setVisible(true);
        callback.current = data.cb;
    };

    const hideModal = () => {
        if (!loading) {
            setVisible(false);
        }
    };

    const onContinuePressed = () => {
        setLoading(true);
        setTimeout(() => {
            callback.current?.();
            hideModal();
        }, 2000);
    };

    return (
        // @ts-ignore
        <SModal onBackButtonPress={hideModal} onBackdropPress={hideModal} isVisible={visible}>
            {!loading ? (
                <Wrapper>
                    <Title type="s_16_24">Complete your payment</Title>
                    <Desc type="r_12_18">
                        You will be redirected to a third-party payment processing platform to complete your payment. Do
                        you wish to continue?
                    </Desc>
                    <ViewButtons>
                        <Cancel type="s_14_17" onPress={hideModal} suppressHighlighting={true}>
                            Cancel
                        </Cancel>
                        <Continue type="s_14_17" onPress={onContinuePressed} suppressHighlighting={true}>
                            Continue
                        </Continue>
                    </ViewButtons>
                </Wrapper>
            ) : (
                <MaterialIndicator size={scales(48)} color={Colors.green1} />
            )}
        </SModal>
    );
});

export default ModalConfirmInstantPayment;

const SModal = styled(Modal)`
    flex: 1;
    margin: 0;
    padding: ${scales(16)}px;
`;

const Wrapper = styled.View`
    background-color: ${(p) => p.theme.white};
    padding: ${scales(24)}px;
    border-radius: ${scales(8)}px;
`;

const Title = styled(Text)``;

const Desc = styled(Text)`
    margin-top: ${scales(8)}px;
    margin-bottom: ${scales(24)}px;
`;

const ViewButtons = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${scales(8)}px;
    justify-content: flex-end;
`;

const Cancel = styled(Text)`
    padding: ${scales(8)}px;
`;

const Continue = styled(Text)`
    color: ${(p) => p.theme.green1};
    padding: ${scales(8)}px;
`;
