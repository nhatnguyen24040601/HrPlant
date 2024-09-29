import React, {useState} from 'react';
import styled from 'styled-components/native';

import {PaymentMethods} from '../src/constant';

import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';
import {TypePaymentMethod} from 'utils/enum';

const PaymentMethodScreen = () => {
    const Colors = useColors();
    const [selectedType, setSelectedType] = useState<TypePaymentMethod | ''>('');

    const onContinuePressed = () => {
        if (selectedType === TypePaymentMethod.WALLET) {
            navigate('PayWithWallet');
        } else if (selectedType === TypePaymentMethod.MANUAL_BANK) {
            navigate('PayManualBank');
        } else if (selectedType === TypePaymentMethod.INSTANT_BANK) {
            navigate('InstantPayment');
        }
    };

    const onItemPressed = (type: TypePaymentMethod) => {
        setSelectedType(type);
    };

    const renderItem = (item: transaction.IPaymentMethod) => {
        const selected = item.type === selectedType;
        return (
            <ViewItem key={item.type} selected={selected} onPress={() => onItemPressed(item.type)}>
                <ViewIcon>
                    <SVGIcon name={item.icon} size={scales(24)} />
                </ViewIcon>
                <ViewCenter>
                    <Name type="s_14_21">{item.name}</Name>
                    <Desc type="r_12_18">{item.desc}</Desc>
                </ViewCenter>
                <SVGIcon name="ic-chevron-right" size={scales(20)} color={Colors.green7} />
            </ViewItem>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Select payment method" />
            <Content>
                <Title type="s_20_26">How would you like to make your payment?</Title>
                {PaymentMethods.map(renderItem)}
            </Content>
            <ButtonContinue text="Continue" onPress={onContinuePressed} disabled={!selectedType} />
        </Wrapper>
    );
};

export default PaymentMethodScreen;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    padding: ${scales(16)}px;
    gap: ${scales(12)}px;
`;

const ButtonContinue = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
    margin-bottom: ${CommonSize.bottomSpace}px;
`;

const Title = styled(Text)``;

const ViewItem = styled.TouchableOpacity<{selected: boolean}>`
    padding: ${scales(16)}px ${scales(12)}px;
    background-color: ${(p) => (p.selected ? p.theme.green8 : p.theme.grey3)};
    border-width: ${scales(1)}px;
    border-color: ${(p) => p.theme.grey14};
    border-radius: ${scales(8)}px;
    gap: ${scales(12)}px;
    flex-direction: row;
    align-items: center;
    border-width: ${(p) => (p.selected ? scales(2) : scales(1))}px;
    border-color: ${(p) => (p.selected ? p.theme.green1 : p.theme.grey14)};
`;

const ViewIcon = styled.View`
    width: ${scales(40)}px;
    height: ${scales(40)}px;
    border-radius: ${scales(20)}px;
    background-color: ${(p) => p.theme.white};
    justify-content: center;
    align-items: center;
`;

const Name = styled(Text)`
    color: ${(p) => p.theme.green7};
`;

const ViewCenter = styled.View`
    flex: 1;
`;

const Desc = styled(Text)`
    color: ${(p) => p.theme.green7};
`;
