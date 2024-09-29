import React, {useRef, useState} from 'react';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import ModalCancelInstantPayment, {IHandleCancelInstantPayment} from '../components/ModalCancelInstantPayment';
import ModalConfirmInstantPayment, {IHandleConfirmInstantPayment} from '../components/ModalConfirmInstantPayment';

import Images from 'assets/images';
import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {goBack} from 'navigation/src/utils';
import { getColors } from 'theme/CommonColors';
import CommonSize, {scales} from 'theme/CommonSize';
import { useColors } from 'theme/provider/ThemeProvider';

const InstantPayment = () => {
    const confirmRef = useRef<IHandleConfirmInstantPayment>();
    const cancelRef = useRef<IHandleCancelInstantPayment>();
    const Colors = useColors();

    const [showSuccess, setShowSuccess] = useState(false);

    const onSuccess = () => {
        setShowSuccess(true);
    };

    const onPayPressed = () => {
        confirmRef.current.showModal({cb: onSuccess});
    };

    const onBackPressed = () => {
        if (!showSuccess) {
            cancelRef.current.showModal();
        } else {
            goBack();
        }
    };

    const renderItemDetail = ({label, value}: {label: string; value: string}) => {
        return (
            <ViewItemDetail>
                <Label type="r_12_18">{label}</Label>
                <Value type="m_12_18">{value}</Value>
            </ViewItemDetail>
        );
    };

    const renderViewTop = () => {
        if (showSuccess) {
            return (
                <>
                    <ViewIconSuccess>
                        <SVGIcon
                            name="ic-check"
                            size={scales(24)}
                            color={Colors.green10}
                            strokeWidth={scales(2.5)}
                        />
                    </ViewIconSuccess>
                    <TitleSuccess type="s_24_29">
                        Your transfer of 1,912.00 to Christian Nwaigwe was successful
                    </TitleSuccess>
                </>
            );
        } else {
            return (
                <>
                    <ViewAppName>
                        <SVGIcon name="ic-app" size={scales(24)} color={Colors.green1} />
                        <Image source={Images.AppName} tintColor={Colors.black} />
                    </ViewAppName>
                    <LabelTotal type="s_16_18">TOTAL AMOUNT</LabelTotal>
                    <TotalAmount type="b_28_33">NGN 1,912.00</TotalAmount>
                </>
            );
        }
    };

    return (
        <Wrapper>
            <GlobalHeader text="Instant payment" onBackPressed={onBackPressed} />
            <Content>
                <ViewWrapDetail>
                    {renderViewTop()}
                    <ViewDetail>
                        {renderItemDetail({label: 'From', value: 'Christian Nwaigwe'})}
                        {renderItemDetail({label: 'To', value: 'Christian Nwaigwe'})}
                        {renderItemDetail({label: 'Amount sent', value: '1 GBP '})}
                        {renderItemDetail({label: 'Amount to be received', value: '1,912.00 NGN '})}
                    </ViewDetail>
                </ViewWrapDetail>
            </Content>
            <ViewBottom>
                {showSuccess ? (
                    <ViewButtonsSuccess>
                        <ButtonDownload
                            textType="b_14_17"
                            text="Download receipt"
                            iconLeft={<SVGIcon name="ic-download" size={scales(20)} color={Colors.white} />}
                        />
                        <ButtonShare
                            textType="b_14_17"
                            text="Share receipt"
                            textStyle={toStyleSheet(TextShare)}
                            iconLeft={<SVGIcon name="ic-share" size={scales(20)} color={Colors.black1} />}
                        />
                    </ViewButtonsSuccess>
                ) : (
                    <ButtonContinue text="Pay now" onPress={onPayPressed} />
                )}
            </ViewBottom>
            <ModalConfirmInstantPayment ref={confirmRef} />
            <ModalCancelInstantPayment ref={cancelRef} />
        </Wrapper>
    );
};

export default InstantPayment;

const TextShare = css`
    color: ${getColors().black1};
`;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    background-color: ${p => p.theme.grey15};
    padding: ${scales(24)}px ${scales(16)}px;
`;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
    background-color: ${p => p.theme.grey15};
    border-top-width: ${scales(1)}px;
    border-top-color: ${p => p.theme.grey13};
`;

const ButtonContinue = styled(GlobalSubmitButton)``;

const ViewWrapDetail = styled.View`
    background-color: ${p => p.theme.white};
    align-items: center;
    padding: ${scales(40)}px ${scales(24)}px;
    border-radius: ${scales(8)}px;
`;

const ViewDetail = styled.View`
    gap: ${scales(20)}px;
    width: 100%;
`;

const ViewAppName = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${scales(7)}px;
    justify-content: center;
    margin-bottom: ${scales(48)}px;
`;

const Image = styled.Image`
    height: ${scales(16)}px;
    width: ${scales(112)}px;
`;

const LabelTotal = styled(Text)`
    color: ${p => p.theme.grey1};
    margin-bottom: ${scales(12)}px;
`;

const TotalAmount = styled(Text)`
    margin-bottom: ${scales(48)}px;
`;

const ViewItemDetail = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

const Label = styled(Text)`
    color: ${p => p.theme.grey1};
`;

const Value = styled(Text)``;

const ViewIconSuccess = styled.View`
    width: ${scales(48)}px;
    height: ${scales(48)}px;
    border-radius: ${scales(24)}px;
    background-color: ${p => p.theme.green9};
    justify-content: center;
    align-items: center;
`;

const TitleSuccess = styled(Text)`
    color: ${p => p.theme.green11};
    text-align: center;
    margin-top: ${scales(24)}px;
    margin-bottom: ${scales(48)}px;
`;

const ButtonDownload = styled(GlobalSubmitButton)``;

const ButtonShare = styled(GlobalSubmitButton)`
    background-color: ${p => p.theme.white};
`;

const ViewButtonsSuccess = styled.View`
    gap: ${scales(8)}px;
`;
