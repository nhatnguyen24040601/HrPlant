import React, {useMemo, useState} from 'react';
import styled from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';
import GlobalInput from 'components/GlobalInput';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const ChangePassScreen = () => {
    const Colors = useColors();
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const validatePass = useMemo(() => {
        return [
            {text: 'A minimum of 8 characters', value: pass.length > 8},
            {text: 'At least one number', value: /[\d]/g.test(pass)},
            {text: 'At least one lowercase letter', value: /[a-z]/g.test(pass)},
            {text: 'At least one uppercase letter', value: /[A-Z]/g.test(pass)},
        ];
    }, [pass]);

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
    }: {
        label: string;
        onChangeText: (text) => void;
        show: boolean;
        setShow: (show: boolean) => void;
    }) => {
        return (
            <>
                <Label type="m_14_17">{label}</Label>
                <Input onChangeText={onChangeText} viewRight={renderShowPass(show, setShow)} secureTextEntry={!show} />
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
            <GlobalHeader text="Change password" showBorder />
            <Content>
                {renderItemInput({
                    label: 'Enter Password',
                    onChangeText: setPass,
                    show: showPass,
                    setShow: setShowPass,
                })}
                <ViewValiDate>{validatePass.map(renderItemValidate)}</ViewValiDate>
                {renderItemInput({
                    label: 'Confirm Password',
                    onChangeText: setConfirmPass,
                    show: showConfirmPass,
                    setShow: setShowConfirmPass,
                })}
            </Content>
            <ButtonSubmit text="Change password" />
        </Wrapper>
    );
};

export default ChangePassScreen;

const Wrapper = styled.View`
    flex: 1;
    padding-bottom: ${CommonSize.bottomSpace}px;
`;

const ButtonShowPass = styled.TouchableOpacity``;

const Input = styled(GlobalInput)``;

const Label = styled(Text)`
    margin-bottom: ${scales(8)}px;
`;

const ViewValiDate = styled.View`
    margin: ${scales(24)}px 0px;
    gap: ${scales(8)}px;
`;

const ItemValiDate = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${scales(16)}px;
`;

const ValidateLabel = styled(Text)<{value: boolean}>`
    color: ${(p) => (p.value ? p.theme.green1 : p.theme.grey9)};
`;

const Dot = styled.View`
    width: ${scales(8)}px;
    height: ${scales(8)}px;
    border-radius: ${scales(4)}px;
    background-color: ${(p) => p.theme.grey10};
`;

const Content = styled.View`
    padding: ${scales(16)}px;
    flex: 1;
`;

const ButtonSubmit = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
`;
