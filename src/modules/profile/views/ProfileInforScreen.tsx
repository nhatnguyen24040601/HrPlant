import SVGIcon from 'assets/svg';
import Avatar from 'components/Avatar';
import GlobalHeader from 'components/GlobalHeader';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';
import React from 'react';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import CommonSize, {scales} from 'theme/CommonSize';
import {useProfile} from '../src/selector';

interface ISection {
    sectionName: string;
    actions: {label: string; value: string; isVerified?: boolean}[];
}

const ProfileInforScreen = () => {
    const profile = useProfile();

    const data: ISection[] = [
        {
            sectionName: 'Personal Information',
            actions: [
                {label: 'First name', value: profile.firstName},
                {label: 'Last name', value: profile.lastName},
                {label: 'Email address', value: profile.email, isVerified: true},
                {label: 'Phone number', value: profile.phone},
            ],
        },
        {
            sectionName: 'Address',
            actions: [
                {label: 'Account number', value: '01598905'},
                {label: 'Account name', value: 'Christian Nwaigwe'},
                {label: 'Bank name', value: 'Clear Bank'},
                {label: 'Bank sort code', value: '040831'},
            ],
        },
    ];

    const onEditPressed = () => {
        navigate('EditProfileScreen');
    };

    const renderItem = ({label, value, isVerified}: {label: string; value: string; isVerified?: boolean}) => {
        return (
            <ViewItem key={label}>
                <Label type="r_14_21">{label}</Label>
                <Value type="m_14_21">{value}</Value>
                {isVerified && (
                    <ViewCheck>
                        <SVGIcon name="ic-check-circle" size={scales(20)} />
                    </ViewCheck>
                )}
            </ViewItem>
        );
    };

    const renderItemSection = (section: ISection, index: number) => {
        return (
            <ViewWrapSection key={index}>
                <SectionName type="m_14_17">{section.sectionName}</SectionName>
                <ViewSection>{section.actions.map(renderItem)}</ViewSection>
            </ViewWrapSection>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Profile Information" showBorder />
            <Content contentContainerStyle={toStyleSheet(contentList)}>
                <Avatar size={scales(80)} />
                {data.map(renderItemSection)}
            </Content>
            <ButtonEdit text="Edit profile" onPress={onEditPressed} />
        </Wrapper>
    );
};

export default ProfileInforScreen;

const contentList = css`
    align-items: center;
    padding: ${scales(16)}px;
    gap: ${scales(24)}px;
`;

const Wrapper = styled.View`
    flex: 1;
    margin-bottom: ${CommonSize.bottomSpace}px;
`;

const Content = styled.ScrollView`
    flex: 1;
`;

const ViewWrapSection = styled.View`
    gap: ${scales(16)}px;
    width: 100%;
`;

const SectionName = styled(Text)`
    color: ${p => p.theme.grey8};
`;

const ViewSection = styled.View`
    gap: ${scales(20)}px;
`;

const ViewItem = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Label = styled(Text)`
    flex: 1;
`;

const Value = styled(Text)``;

const ViewCheck = styled.View`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    margin-left: ${scales(4)}px;
`;

const ButtonEdit = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
`;
