import React, {useState} from 'react';
import styled from 'styled-components/native';
import GlobalHeader from 'components/GlobalHeader';
import GlobalInput from 'components/GlobalInput';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import SVGIcon from 'assets/svg';
import {goBack} from 'navigation/src/utils';
import {useColors} from 'theme/provider/ThemeProvider';

interface IItemInput {
    label: string;
    value: string;
    setValue: (value: string) => void;
}

const AddWithdrawBank = () => {
    const Colors = useColors();
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankSelected, setBankSelected] = useState('Select bank');

    const onSavePressed = () => {
        goBack();
    };

    const renderInput = ({label, value, setValue}: IItemInput) => {
        return (
            <ViewItem>
                <Label type="m_14_17">{label}</Label>
                <GlobalInput value={value} onChangeText={setValue} />
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

    return (
        <Wrapper>
            <GlobalHeader text="Withdrawal bank account" />
            <Content>
                <Title type="s_20_26">Fill in bank information</Title>
                {renderInput({label: 'Account Name', value: accountName, setValue: setAccountName})}
                {renderSelect({label: 'Bank Name', value: bankSelected, setValue: setBankSelected})}
                {renderInput({label: 'Account Number', value: accountNumber, setValue: setAccountNumber})}
            </Content>
            <ViewBottom>
                <ButtonContinue text="Save" onPress={onSavePressed} />
            </ViewBottom>
        </Wrapper>
    );
};

export default AddWithdrawBank;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.white};
`;

const Content = styled.View`
    padding: ${scales(16)}px;
    flex: 1;
    gap: ${scales(24)}px;
`;

const Title = styled(Text)``;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
    background-color: ${(p) => p.theme.white};
    border-top-width: ${scales(1)}px;
    border-top-color: ${(p) => p.theme.grey13};
`;

const ButtonContinue = styled(GlobalSubmitButton)``;

const Label = styled(Text)``;

const ViewItem = styled.View`
    gap: ${scales(8)}px;
`;

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
