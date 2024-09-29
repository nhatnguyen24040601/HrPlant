import React, {forwardRef, useImperativeHandle, useMemo, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import CommonSize, {scales} from 'theme/CommonSize';
import Text from './Text';
import SVGIcon from 'assets/svg';
import {PaymentMethods} from 'modules/transaction/src/constant';
import {useColors} from 'theme/provider/ThemeProvider';

export interface IHandleSelectPaymentMethod {
    showModal: (setMethodSelected: (method: transaction.IPaymentMethod) => void) => void;
}

interface IProps {}

const ModalSelectPaymentMethod = forwardRef<IHandleSelectPaymentMethod, IProps>((props, ref) => {
    const Colors = useColors();
    const [visible, setVisible] = useState(false);
    const callback = useRef<(method: transaction.IPaymentMethod) => void>();

    useImperativeHandle(ref, () => ({
        showModal,
    }));

    const showModal = (cb: (method: transaction.IPaymentMethod) => void) => {
        setVisible(true);
        callback.current = cb;
    };

    const hideModal = () => {
        setVisible(false);
        callback.current = null;
    };

    const renderItemPayment = (item: transaction.IPaymentMethod, index: number) => {
        const onItemPressed = () => {
            callback.current?.(item);
            hideModal();
        };

        return (
            <ItemPayment key={index} onPress={onItemPressed}>
                <ViewIcon>
                    <SVGIcon name={item.icon} size={scales(24)} />
                </ViewIcon>
                <ViewDetail>
                    <Label type="s_14_21">{item.name}</Label>
                    <Desc type="r_12_18">{item.desc}</Desc>
                </ViewDetail>
                <SVGIcon name="ic-chevron-right" size={scales(20)} color={Colors.black1} />
            </ItemPayment>
        );
    };

    return (
        // @ts-ignore
        <SModal onBackButtonPress={hideModal} onBackdropPress={hideModal} isVisible={visible}>
            <Wrapper
                style={{
                    backgroundColor: Colors.white,
                }}>
                <Title type="s_16_24">How would you like to make payment?</Title>
                {PaymentMethods.map(renderItemPayment)}
                <Line />
                <Close type="s_14_17" onPress={hideModal} suppressHighlighting={true}>
                    Close
                </Close>
            </Wrapper>
        </SModal>
    );
});

export default ModalSelectPaymentMethod;

const SModal = styled(Modal)`
    flex: 1;
    margin: 0;
    justify-content: flex-end;
`;

const Wrapper = styled.View`
    padding: ${scales(24)}px ${scales(20)}px ${scales(CommonSize.bottomSpace)}px ${scales(20)}px;
    border-top-right-radius: ${scales(16)}px;
    border-top-left-radius: ${scales(16)}px;
`;

const Title = styled(Text)`
    margin-bottom: ${scales(12)}px;
`;

const ItemPayment = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(12)}px;
    padding: ${scales(12)}px 0px;
`;

const ViewIcon = styled.View`
    width: ${scales(40)}px;
    height: ${scales(40)}px;
    border-radius: ${scales(20)}px;
    background-color: ${(p) => p.theme.grey3};
    justify-content: center;
    align-items: center;
`;

const ViewDetail = styled.View`
    flex: 1;
    gap: ${scales(4)}px;
`;

const Label = styled(Text)``;

const Desc = styled(Text)``;

const Line = styled.View`
    width: 100%;
    margin: ${scales(16)}px 0px;
    background-color: ${(p) => p.theme.grey2};
    height: ${scales(1)}px;
`;

const Close = styled(Text)`
    text-align: center;
`;
