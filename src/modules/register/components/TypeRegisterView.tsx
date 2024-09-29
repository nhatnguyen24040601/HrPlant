import React from 'react-native';
import styled from 'styled-components/native';
import SVGIcon, {TNameOfIconSVG} from 'assets/svg';
import Text from 'components/Text';
import {scales} from 'theme/CommonSize';
import {TypeRegister} from 'utils/enum';
import {useColors} from 'theme/provider/ThemeProvider';

interface IProps {
    typeSelected: '' | TypeRegister;
    onTypePressed: (type: TypeRegister) => void;
    country: register.ICountry;
}

const TypeRegisterView = (props: IProps) => {
    const Colors = useColors();
    const {onTypePressed, typeSelected, country} = props;

    const renderTypeRegister = ({
        ic,
        label,
        description,
        type,
    }: {
        ic: TNameOfIconSVG;
        label: string;
        description: string;
        type: TypeRegister;
    }) => {
        return (
            <ItemType
                type={type}
                country={country}
                selected={typeSelected === type}
                onPress={() => onTypePressed(type)}
                disabled={!country?.allowEnterprise && type === TypeRegister.Enterprise}>
                <ViewIcon>
                    <SVGIcon name={ic} size={scales(24)} color={Colors.black1} />
                </ViewIcon>
                <ViewCenter>
                    <Label type="s_16_24">{label}</Label>
                    <Description type="r_14_21">{description}</Description>
                </ViewCenter>
            </ItemType>
        );
    };

    const renderWarning = () => {
        return (
            <ViewWarning>
                <SVGIcon name="ic-warning" size={scales(24)} color={Colors.yellow1} />
                <TextWarning type="r_12_18">
                    Business account opening is not enabled for your country, please select only personal account.
                </TextWarning>
            </ViewWarning>
        );
    };

    return (
        <Wrapper>
            <Content>
                <Title type="s_24_28">What kind of account would you like to open?</Title>
                {renderTypeRegister({
                    ic: 'ic-user',
                    label: 'Personal account',
                    description: 'Send, spend, and receive around the world for less',
                    type: TypeRegister.Persional,
                })}
                {renderTypeRegister({
                    ic: 'ic-organization',
                    label: 'Business account',
                    description: 'Do business or freelance work internationally and get paid',
                    type: TypeRegister.Enterprise,
                })}
            </Content>
            {country && !country.allowEnterprise && renderWarning()}
        </Wrapper>
    );
};

export default TypeRegisterView;

const ItemType = styled.TouchableOpacity<{
    selected?: boolean;
    country?: register.ICountry;
    type?: TypeRegister;
    disable?: boolean;
}>`
    flex-direction: row;
    align-items: center;
    gap: ${scales(12)}px;
    padding: ${scales(16)}px;
    background-color: ${(p) => (p.selected ? p.theme.green8 : p.theme.grey3)};
    margin-bottom: ${scales(16)}px;
    border-radius: ${scales(12)}px;
    border-width: ${scales(2)}px;
    border-color: ${(p) => (p.selected ? p.theme.green1 : p.theme.grey3)};
    opacity: ${(p) => (p.disabled ? 0.5 : 1)};
`;

const ViewIcon = styled.View`
    width: ${scales(48)}px;
    height: ${scales(48)}px;
    border-radius: ${scales(24)}px;
    background-color: ${(p) => p.theme.white};
    justify-content: center;
    align-items: center;
`;

const Title = styled(Text)`
    margin-bottom: ${scales(24)}px;
`;

const Wrapper = styled.View`
    flex: 1;
`;

const ViewCenter = styled.View`
    flex: 1;
`;

const Label = styled(Text)`
    color: ${(p) => p.theme.green2};
    margin-bottom: ${scales(4)}px;
`;
const Description = styled(Text)`
    color: ${(p) => p.theme.green2};
`;

const Content = styled.View`
    flex: 1;
`;

const ViewWarning = styled.View`
    flex-direction: row;
    align-items: flex-start;
    padding: ${scales(12)}px;
    gap: ${scales(8)}px;
    margin-bottom: ${scales(24)}px;
    background-color: ${(p) => p.theme.yellow4};
    border-radius: ${scales(8)}px;
`;

const TextWarning = styled(Text)`
    color: ${(p) => p.theme.blue1};
    flex: 1;
`;
