import React, {useState} from 'react';
import styled from 'styled-components/native';

import SVGIcon, {TNameOfIconSVG} from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import {TypeRecipient} from 'utils/enum';
import {navigate} from 'navigation/src/utils';
import {useColors} from 'theme/provider/ThemeProvider';

interface IItem {
    icon: TNameOfIconSVG;
    name: string;
    desc: string;
    type: 'email' | 'telephone';
}

const RecipientEmailOrPhone = () => {
    const Colors = useColors();
    const [selectedType, setSelectedType] = useState<'' | 'email' | 'telephone'>('');

    const data: IItem[] = [
        {
            icon: 'ic-receive-mail',
            name: 'Email address',
            desc: 'Send money to recipient’s email address',
            type: 'email',
        },
        {
            icon: 'ic-telephone',
            name: 'Telephone number',
            desc: 'Send money to recipient’s phone number',
            type: 'telephone',
        },
    ];

    const onItemPressed = (type: 'email' | 'telephone') => {
        setSelectedType(type);
    };

    const onContinuePressed = () => {
        if (selectedType === 'email') {
            navigate('SendToEmail');
        } else {
            navigate('SendToTelephone');
        }
    };

    const renderItem = (item: IItem) => {
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
            <GlobalHeader text="Recipient" />
            <Content>
                <Title type="s_20_26">Where would you like to send this money to?</Title>
                {data.map(renderItem)}
            </Content>
            <ButtonContinue text="Continue" onPress={onContinuePressed} disabled={!selectedType} />
        </Wrapper>
    );
};

export default RecipientEmailOrPhone;

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
