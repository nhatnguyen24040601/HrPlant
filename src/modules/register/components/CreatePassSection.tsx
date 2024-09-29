import React, {useContext, useMemo, useState} from 'react';
import styled from 'styled-components/native';

import {RegisterContext} from '../src/context';

import SVGIcon from 'assets/svg';
import GlobalInput from 'components/GlobalInput';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {reset} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import { useColors } from 'theme/provider/ThemeProvider';

const CreatePassSection = () => {
    const {pass, setPass, confirmPass, setConfirmPass, onRegister} = useContext(RegisterContext);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [error, setError] = useState('');
    const Colors = useColors();

    const validatePass = useMemo(() => {
        return [
            {text: 'A minimum of 8 characters', value: pass.trim().length >= 8},
            {text: 'At least one number', value: /[\d]/g.test(pass.trim())},
            {text: 'At least one lowercase letter', value: /[a-z]/g.test(pass.trim())},
            {text: 'At least one uppercase letter', value: /[A-Z]/g.test(pass.trim())},
            {text: 'Confirm password must same as password', value: pass.trim() && pass.trim() === confirmPass.trim()},
        ];
    }, [pass, confirmPass]);

    const onNextPressed = () => {
        onRegister()
            .then(() => {
                reset('SuccessRegisterScreen');
            })
            .catch((err) => {
                setError(err);
            });
    };

    const renderShowPass = (isShow: boolean, setIsShow: (isShow: boolean) => void) => {
        return (
            <ButtonShowPass onPress={() => setIsShow(!isShow)}>
                <SVGIcon name={isShow ? 'ic-eye-off' : 'ic-eye'} size={scales(24)} color={Colors.black1} />
            </ButtonShowPass>
        );
    };

    const renderItemInput = ({
        label,
        onChangeText,
        show,
        setShow,
        placeholder,
    }: {
        label: string;
        onChangeText: (text) => void;
        show: boolean;
        setShow: (show: boolean) => void;
        placeholder: string;
    }) => {
        return (
            <>
                <Label type="m_14_17">{label}</Label>
                <Input onChangeText={onChangeText} viewRight={renderShowPass(show, setShow)} secureTextEntry={!show} placeholder={placeholder} />
            </>
        );
    };

    const renderItemValidate = ({text, value}: {text: string; value: boolean}) => {
        return (
            <ItemValiDate key={text}>
                {value ? <SVGIcon name="ic-check" size={scales(8)} color={Colors.green1} /> : <Dot />}
                <ValidateLabel value={value} type="r_12_15">
                    {text}
                </ValidateLabel>
            </ItemValiDate>
        );
    };

    return (
        <Wrapper>
            <Content>
                <Title type="s_28_34">Create password</Title>
                {renderItemInput({
                    label: 'Enter Password',
                    onChangeText: setPass,
                    show: showPass,
                    setShow: setShowPass,
                    placeholder: 'Enter Password',
                })}
                <ViewValiDate>{validatePass.map(renderItemValidate)}</ViewValiDate>
                {renderItemInput({
                    label: 'Confirm Password',
                    onChangeText: setConfirmPass,
                    show: showConfirmPass,
                    setShow: setShowConfirmPass,
                    placeholder: 'Enter Password',
                })}
            </Content>
            {error && <TextError type="r_10_12">{error}</TextError>}
            <ButtonNext
                text="Next"
                disabled={
                    !pass.trim() || pass.trim() !== confirmPass.trim() || validatePass.findIndex((i) => !i.value) > -1
                }
                onPress={onNextPressed}
            />
        </Wrapper>
    );
};

export default CreatePassSection;

const Wrapper = styled.View`
    padding: ${scales(24)}px ${scales(16)}px 0px ${scales(16)}px;
    width: ${CommonSize.scrWidth}px;
`;

const Content = styled.View`
    flex: 1;
`;

const Title = styled(Text)`
margin-bottom: ${scales(32)}px;
`;

const Description = styled(Text)`
    color: ${(p) => p.theme.grey1};
    margin-top: ${scales(8)}px;
    margin-bottom: ${scales(32)}px;
`;

const Input = styled(GlobalInput)``;

const Label = styled(Text)`
    margin-bottom: ${scales(8)}px;
`;

const ButtonShowPass = styled.TouchableOpacity``;

const ItemValiDate = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${scales(16)}px;
`;

const Dot = styled.View`
    width: ${scales(8)}px;
    height: ${scales(8)}px;
    border-radius: ${scales(4)}px;
    background-color: ${(p) => p.theme.grey10};
`;

const ValidateLabel = styled(Text)<{value: boolean}>`
    color: ${(p) => (p.value ? p.theme.green1 : p.theme.grey9)};
`;

const ViewValiDate = styled.View`
    margin: ${scales(24)}px 0px;
    gap: ${scales(8)}px;
`;

const ButtonNext = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
`;

const TextError = styled(Text)`
    margin-bottom: ${scales(10)}px;
    color: ${(p) => p.theme.red1};
`;
