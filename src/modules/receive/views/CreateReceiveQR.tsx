import React, {useState} from 'react';
import styled from 'styled-components/native';

import GlobalHeader from 'components/GlobalHeader';

import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import GlobalInput from 'components/GlobalInput';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import SVGIcon from 'assets/svg';
import {Switch} from 'react-native-paper';
import {navigate} from 'navigation/src/utils';
import {useColors} from 'theme/provider/ThemeProvider';

interface IItemInput {
    label: string;
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
}

const CreateReceiveQR = () => {
    const Colors = useColors();
    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState('Select payment frequency');
    const [wallet, setWallet] = useState('Select wallet');
    const [isAllowPayee, setIsAllowPayee] = useState(false);

    const onGeneratePressed = () => {
        navigate('QRCodeReceive');
    };

    const renderInput = ({label, value, setValue, placeholder}: IItemInput) => {
        return (
            <ViewItem>
                <Label type="m_14_17">{label}</Label>
                <GlobalInput
                    value={value}
                    onChangeText={setValue}
                    placeholder={placeholder}
                    keyboardType="number-pad"
                />
            </ViewItem>
        );
    };

    const renderSelect = ({
        label,
        value,
        setValue,
    }: {
        label: string;
        value: string;
        setValue: (value: string) => void;
    }) => {
        return (
            <ViewItem>
                <Label type="m_14_17">{label}</Label>
                <ButtonSelect onPress={() => {}}>
                    <TextButtonSelect type="m_14_17">{value}</TextButtonSelect>
                    <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
                </ButtonSelect>
            </ViewItem>
        );
    };

    const renderAllowPayee = () => {
        return (
            <ViewAllow>
                <TextAllow type="s_14_17">Allow payee set amount</TextAllow>
                <Switch value={isAllowPayee} onValueChange={setIsAllowPayee} color={Colors.green1} />
            </ViewAllow>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Receive money with QR code" />
            <Content>
                <Title type="s_20_26">Set up your QR code to receive payment</Title>
                {renderInput({
                    label: 'How much do you want to request?',
                    setValue: setAmount,
                    value: amount,
                    placeholder: 'Enter amount',
                })}
                {renderSelect({
                    label: 'How often do you want to get pad with this QR?',
                    setValue: setFrequency,
                    value: frequency,
                })}
                {renderSelect({
                    label: 'How often do you want to get pad with this QR?',
                    setValue: setWallet,
                    value: wallet,
                })}
                {renderAllowPayee()}
            </Content>
            <ViewBottom>
                <ButtonContinue text="Send" onPress={onGeneratePressed} />
            </ViewBottom>
        </Wrapper>
    );
};

export default CreateReceiveQR;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    padding: ${scales(16)}px;
    gap: ${scales(24)}px;
`;

const Title = styled(Text)``;

const ViewItem = styled.View`
    gap: ${scales(8)}px;
`;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
    background-color: ${(p) => p.theme.white};
    border-top-width: ${scales(1)}px;
    border-top-color: ${(p) => p.theme.grey13};
`;

const Label = styled(Text)``;

const ButtonContinue = styled(GlobalSubmitButton)``;

const ButtonSelect = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${(p) => p.theme.grey6};
    border-radius: ${scales(8)}px;
    gap: ${scales(8)}px;
    padding: ${scales(16)}px;
    justify-content: space-between;

    border-width: ${scales(2)}px;
    border-color: ${(p) => p.theme.grey7};
`;

const TextButtonSelect = styled(Text)`
    color: ${(p) => p.theme.grey1};
`;

const ViewAllow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TextAllow = styled(Text)``;
