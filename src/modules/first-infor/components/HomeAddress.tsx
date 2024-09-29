import React, {useContext, useMemo, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {updateFirstLogin} from '../src/api';
import {FirstInforStep} from '../src/constant';
import {FirstInforContext} from '../src/context';

import SVGIcon from 'assets/svg';
import GlobalInput from 'components/GlobalInput';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {getProfileAction} from 'modules/profile/src/actions';
import {useProfile} from 'modules/profile/src/selector';
import CommonSize, {scales} from 'theme/CommonSize';
import { useColors } from 'theme/provider/ThemeProvider';

const HomeAddress = () => {
    const Colors = useColors();
    const {birthDate, setStep} = useContext(FirstInforContext);
    const profile = useProfile();
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const shouldDisable = useMemo(() => {
        return !state || !city || !address || !postalCode;
    }, [state, city, address, postalCode]);

    const onCompletePressed = async () => {
        setLoading(true);
        updateFirstLogin({
            address,
            birthDate,
            city,
            country: profile.country,
            postcode: postalCode,
            state,
        })
            .then(() => {
                setLoading(false);
                dispatch(getProfileAction.request());
                setStep(FirstInforStep.Success);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const renderInput = ({
        label,
        value,
        setValue,
    }: {
        label: string;
        value: string;
        setValue: (value: string) => void;
    }) => {
        return (
            <ViewInput>
                <Label type="m_14_17">{label}</Label>
                <GlobalInput value={value} onChangeText={setValue} />
            </ViewInput>
        );
    };

    return (
        <Wrapper>
            <KeyboardAwareScrollView contentContainerStyle={{width: CommonSize.scrWidth - scales(40)}}>
                <ViewIcon>
                    <SVGIcon name={'ic-marker'} size={scales(32)} color={Colors.purple1} />
                </ViewIcon>
                <Title type="s_24_29">Home address</Title>
                <Desc type="r_14_21">Please enter the address where you reside</Desc>
                {renderInput({label: 'State', setValue: setState, value: state})}
                {renderInput({label: 'City', setValue: setCity, value: city})}
                {renderInput({label: 'House Address', setValue: setAddress, value: address})}
                {renderInput({label: 'Portal Code', setValue: setPostalCode, value: postalCode})}
            </KeyboardAwareScrollView>
            <Button text="Complete profile" onPress={onCompletePressed} loading={loading} disabled={shouldDisable} />
        </Wrapper>
    );
};

export default HomeAddress;

const Wrapper = styled.View`
    align-items: center;
    padding: 0px ${scales(20)}px;
    width: ${CommonSize.scrWidth}px;
    flex: 1;
    padding-bottom: ${CommonSize.bottomSpace}px;
`;

const Title = styled(Text)`
    text-align: center;
`;

const Desc = styled(Text)`
    text-align: center;
    margin-top: ${scales(16)}px;
`;

const Button = styled(GlobalSubmitButton)``;

const ViewIcon = styled.View`
    width: ${scales(80)}px;
    height: ${scales(80)}px;
    margin-top: ${scales(50)}px;
    margin-bottom: ${scales(32)}px;
    justify-content: center;
    align-items: center;
    background-color: ${p => p.theme.green3};
    border-radius: ${scales(40)}px;
    align-self: center;
`;

const Label = styled(Text)`
    margin-bottom: ${scales(8)}px;
`;

const ViewInput = styled.View`
    width: ${CommonSize.scrWidth - scales(40)}px;
    margin-top: ${scales(20)}px;
`;
