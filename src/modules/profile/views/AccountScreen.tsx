import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled, {toStyleSheet} from 'styled-components/native';
import ProfileHeader from '../components/ProfileHeader';
import ItemActionProfile from '../components/ItemActionProfile';
import Text from 'components/Text';
import {css} from 'styled-components';
import {scales} from 'theme/CommonSize';
import {navigate} from 'navigation/src/utils';
import {useDispatch} from 'react-redux';
import {logoutAction} from 'modules/login/src/actions';
import {useProfile} from '../src/selector';
import {useColors} from 'theme/provider/ThemeProvider';

interface ISection {
    sectionName: string;
    actions: profile.IItemActionProfileProps[];
}

const AccountScreen = () => {
    const Colors = useColors();
    const profile = useProfile();
    const dispatch = useDispatch();

    const onLgoutOutPressed = () => {
        dispatch(logoutAction());
    };

    const onChangePassPressed = () => {
        navigate('ChangePassScreen');
    };

    const goToProfileInfor = () => {
        navigate('ProfileInforScreen');
    };

    const onKYCPressed = () => {
        navigate('KYCTierScreen');
    };

    const data: ISection[] = [
        {
            sectionName: 'Personal Infomation',
            actions: [
                {
                    label: 'Full Name',
                    desc: `${profile.firstName} ${profile.lastName}`,
                    icon: 'ic-account',
                    onPress: goToProfileInfor,
                    isAction: false,
                },
                {
                    label: 'Email address',
                    desc: profile.email,
                    icon: 'ic-mail',
                    onPress: goToProfileInfor,
                    isAction: false,
                },
                {
                    label: 'Phone number',
                    desc: profile.phone,
                    icon: 'ic-phone',
                    onPress: goToProfileInfor,
                    isAction: false,
                },
            ],
        },
        {
            sectionName: 'Limits',
            actions: [
                {
                    label: 'Transaction limits',
                    desc: 'View transaction limits',
                    icon: 'ic-trans-limit',
                    onPress: () => {},
                },
            ],
        },
        {
            sectionName: 'Security',
            actions: [
                {label: 'KYC', desc: 'Check your KYC status', icon: 'ic-kyc', onPress: onKYCPressed, showKYC: true},
                {
                    label: 'Authentication pin',
                    desc: 'Change authentication pin for transactions',
                    icon: 'ic-account',
                    onPress: () => {},
                },
                {label: 'Change password', icon: 'ic-password', onPress: onChangePassPressed},
                {
                    label: 'Use fingerprint for login',
                    desc: 'Login with fingerprint biometric',
                    icon: 'ic-biometric',
                    onPress: () => {},
                    showToggle: true,
                },
                {
                    label: 'Use fingerprint for transactions',
                    desc: 'Authorize transactions with fingerprint',
                    icon: 'ic-biometric',
                    onPress: () => {},
                    showToggle: true,
                },
                {
                    label: 'Use faceID for transactions',
                    desc: 'Authorize transactions with faceID',
                    icon: 'ic-biometric',
                    onPress: () => {},
                    showToggle: true,
                },
                {label: 'Hide account balance', icon: 'ic-eye-off', onPress: () => {}},
            ],
        },
        {
            sectionName: 'Help',
            actions: [
                {label: 'Help center', icon: 'ic-help', onPress: () => {}},
                {
                    label: 'Report issues',
                    desc: 'Change authentication pin for transactions',
                    icon: 'ic-report',
                    onPress: () => {},
                },
                {
                    label: 'Contact support',
                    desc: 'Change authentication pin for transactions',
                    icon: 'ic-support',
                    onPress: () => {},
                },
                {
                    label: 'Call center',
                    desc: 'Change authentication pin for transactions',
                    icon: 'ic-call',
                    onPress: () => {},
                },
                {
                    label: 'Follow us on social media',
                    desc: 'Change authentication pin for transactions',
                    icon: 'ic-social',
                    onPress: () => {},
                },
            ],
        },
    ];

    const renderItemSection = (section: ISection) => {
        return (
            <ViewWrapSection key={section.sectionName}>
                <SectionName type="m_12">{section.sectionName}</SectionName>
                <ViewSection>
                    {section.actions.map((action) => (
                        <ItemActionProfile {...action} key={action.label} />
                    ))}
                </ViewSection>
            </ViewWrapSection>
        );
    };

    return (
        <Wrapper>
            <Background colors={[Colors.green5, Colors.grey12]} locations={[0, 0.3]} />
            <ProfileHeader />
            <Content contentContainerStyle={toStyleSheet(contentList)} showsVerticalScrollIndicator={false}>
                {data.map((section) => renderItemSection(section))}
                <Line />
                <ViewSection>
                    <ItemActionProfile
                        icon="ic-logout"
                        label="Log out"
                        customColor={Colors.red2}
                        customBackground={Colors.red3}
                        onPress={onLgoutOutPressed}
                    />
                </ViewSection>
            </Content>
        </Wrapper>
    );
};

export default AccountScreen;

const contentList = css`
    padding: ${scales(20)}px ${scales(16)}px;
    gap: ${scales(16)}px;
    padding-bottom: ${scales(140)}px;
`;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.white};
`;

const Background = styled(LinearGradient)`
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Content = styled.ScrollView`
    margin-top: ${scales(20)}px;
`;

const ViewSection = styled.View`
    background-color: ${(p) => p.theme.white};
    border-radius: ${scales(8)}px;
`;

const ViewWrapSection = styled.View`
    gap: ${scales(12)}px;
`;

const SectionName = styled(Text)`
    margin-left: ${scales(16)}px;
`;

const Line = styled.View`
    width: 100%;
    height: ${scales(1)}px;
    background-color: ${(p) => p.theme.grey2};
`;
