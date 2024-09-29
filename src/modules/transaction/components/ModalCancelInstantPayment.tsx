import React, {forwardRef, useImperativeHandle, useState} from 'react';
import Modal from 'react-native-modal';
import styled, {toStyleSheet} from 'styled-components/native';

import Text from 'components/Text';


import CommonSize, {scales} from 'theme/CommonSize';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import {css} from 'styled-components';
import {goBack} from 'navigation/src/utils';
import { getColors } from 'theme/CommonColors';

export interface IHandleCancelInstantPayment {
    showModal: () => void;
}

interface IProps {}

const ModalCancelInstantPayment = forwardRef<IHandleCancelInstantPayment, IProps>((props, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        showModal,
    }));

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    const onCancelPressed = () => {
        goBack();
    };

    return (
        // @ts-ignore
        <SModal onBackButtonPress={hideModal} onBackdropPress={hideModal} isVisible={visible}>
            <Wrapper>
                <Title type="s_16_24">Cancel transfer</Title>
                <Desc type="r_12_18">Are you sure you want to cancel this transfer?</Desc>
                <ViewButtons>
                    <ButtonCancel text="Cancel transfer" onPress={onCancelPressed} />
                    <ButtonContinue
                        text="Continue with payment"
                        textStyle={toStyleSheet(TextContinue)}
                        onPress={hideModal}
                    />
                </ViewButtons>
            </Wrapper>
        </SModal>
    );
});

export default ModalCancelInstantPayment;

const TextContinue = css`
    color: ${getColors().black1};
`;

const SModal = styled(Modal)`
    flex: 1;
    margin: 0;
    justify-content: flex-end;
`;

const Wrapper = styled.View`
    background-color: ${p => p.theme.white};
    padding: ${scales(24)}px;
    border-radius: ${scales(8)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
`;

const Title = styled(Text)``;

const Desc = styled(Text)`
    margin-top: ${scales(8)}px;
    margin-bottom: ${scales(40)}px;
`;

const ViewButtons = styled.View`
    gap: ${scales(8)}px;
`;

const ButtonCancel = styled(GlobalSubmitButton)`
    background-color: ${p => p.theme.red2};
    height: ${scales(42)}px;
`;

const ButtonContinue = styled(GlobalSubmitButton)`
    background-color: ${p => p.theme.grey6};
    height: ${scales(42)}px;
`;
