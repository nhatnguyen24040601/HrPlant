import moment from 'moment';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {DatePickerModal} from 'react-native-paper-dates';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';

import {FirstInforStep} from '../src/constant';
import {FirstInforContext} from '../src/context';

import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {useProfile} from 'modules/profile/src/selector';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const Birthday = () => {
    const Colors = useColors();
    const {setStep, setBirthDate} = useContext(FirstInforContext);
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const profile = useProfile();

    const onSelectPressed = () => {
        setOpen(true);
    };

    const onDismissSingle = () => {
        setOpen(false);
    };

    const onSelectDate = (params: {date: Date}) => {
        setOpen(false);
        setError('');
        setDate(params.date);
    };

    const onCompletePressed = () => {
        if (moment().diff(moment(date), 'year') < 16) {
            setError('Sorry, you must be at least 16 years old to continue.');
        } else {
            setBirthDate(date.toISOString());
            setStep(FirstInforStep.HomeAddress);
        }
    };

    return (
        <Wrapper>
            <Content>
                <ViewIcon>
                    <SVGIcon name={'ic-calendar'} size={scales(32)} color={Colors.purple1} />
                </ViewIcon>
                <Title type="s_24_29">Hello {profile.firstName}, please tell us your date of birth</Title>
                <Desc type="r_14_21">Please select or enter your date of birth</Desc>
                <ViewSelect>
                    <Label type="m_14_17">Date of Birth</Label>
                    <ButtonSelect onPress={onSelectPressed}>
                        <TextSelected type="m_14_17">
                            {date ? moment(date).format('DD / MM / YYYY') : 'DD / MM / YYYY'}
                        </TextSelected>
                    </ButtonSelect>
                </ViewSelect>
            </Content>
            <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onSelectDate}
            />
            {error && <TextError type="r_10_12">{error}</TextError>}
            <Button text="Next" onPress={onCompletePressed} disabled={!date} />
        </Wrapper>
    );
};

export default Birthday;

const Wrapper = styled.View`
    align-items: center;
    padding: 0px ${scales(20)}px;
    width: ${CommonSize.scrWidth}px;
    flex: 1;
    padding-bottom: ${CommonSize.bottomSpace}px;
`;

const Content = styled.View`
    flex: 1;
    align-items: center;
`;

const ViewIcon = styled.View`
    width: ${scales(80)}px;
    height: ${scales(80)}px;
    margin-top: ${scales(90)}px;
    margin-bottom: ${scales(32)}px;
    justify-content: center;
    align-items: center;
    background-color: ${(p) => p.theme.purple2};
    border-radius: ${scales(40)}px;
`;

const Title = styled(Text)`
    text-align: center;
`;

const Desc = styled(Text)`
    text-align: center;
    margin-top: ${scales(16)}px;
`;

const Button = styled(GlobalSubmitButton)``;

const Label = styled(Text)``;

const ButtonSelect = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${(p) => p.theme.grey7};
    border-radius: ${scales(8)}px;
    gap: ${scales(8)}px;
    padding: ${scales(16)}px;
    margin-top: ${scales(8)}px;
`;

const TextSelected = styled(Text)`
    color: ${(p) => p.theme.grey1};
    flex: 1;
`;

const ViewSelect = styled.View`
    width: ${CommonSize.scrWidth - scales(32)}px;
    margin-top: ${scales(32)}px;
`;

const TextError = styled(Text)`
    margin-bottom: ${scales(10)}px;
    color: ${(p) => p.theme.red1};
`;
