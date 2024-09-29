import React, {useContext} from 'react';
import Config from 'react-native-config';
import styled from 'styled-components/native';

import {RegisterProgress} from '../src/constants';
import {RegisterContext} from '../src/context';

import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const CountrySection = () => {
    const Colors = useColors();
    const {country, setCountry, setProgress} = useContext(RegisterContext);

    const onSelectCountry = (countrySelected: register.ICountry) => {
        setCountry(countrySelected);
    };

    const onSelectCountryPressed = () => {
        navigate('SelectCountriesScreen', {onSelectCountry});
    };

    const onNextPressed = () => {
        setProgress(RegisterProgress.SelectTypeRegister);
    };

    const renderSelect = () => {
        return (
            <>
                <Label type="m_14_17">Country</Label>
                <ButtonSelect onPress={onSelectCountryPressed}>
                    {country && <Flag source={{uri: `${Config.API_URL}${country.image}`}} />}
                    <TextCountry type="m_14_17">{(country?.name as string) || 'Select your country'}</TextCountry>
                    <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
                </ButtonSelect>
            </>
        );
    };

    return (
        <Wrapper>
            <Content>
                <Title type="s_28_34">Country of residence</Title>
                <Description type="r_14_17">Please select the country where you currently reside</Description>
                {renderSelect()}
            </Content>
            <ButtonNext text="Next" disabled={!country} onPress={onNextPressed} />
        </Wrapper>
    );
};

export default CountrySection;

const Wrapper = styled.View`
    padding: ${scales(24)}px ${scales(16)}px 0px ${scales(16)}px;
    width: ${CommonSize.scrWidth}px;
`;

const Content = styled.View`
    flex: 1;
`;

const Title = styled(Text)``;

const Description = styled(Text)`
    color: ${(p) => p.theme.grey1};
    margin-top: ${scales(8)}px;
`;

const Label = styled(Text)`
    margin-top: ${scales(32)}px;
`;

const ButtonSelect = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${(p) => p.theme.grey7};
    border-radius: ${scales(8)}px;
    gap: ${scales(8)}px;
    padding: ${scales(16)}px;
    margin-top: ${scales(8)}px;
`;

const TextCountry = styled(Text)`
    color: ${(p) => p.theme.grey1};
    flex: 1;
`;

const Flag = styled.Image`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    border-radius: ${scales(10)}px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const ButtonNext = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
`;
