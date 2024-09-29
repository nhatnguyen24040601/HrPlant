import React, {useContext, useMemo} from 'react';
import styled from 'styled-components/native';

import Avatar from 'components/Avatar';
import GlobalHeader from 'components/GlobalHeader';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';

import CommonSize, {scales} from 'theme/CommonSize';
import {navigate} from 'navigation/src/utils';
import {SendTransactionContext} from '../src/context';
import {TypeRegister} from 'utils/enum';

interface IItemDetail {
    label: string;
    value: string;
}

const RecipientInforScreen = () => {
    const {receiver} = useContext(SendTransactionContext);
    const dataDetail = useMemo<IItemDetail[]>(() => {
        return [
            {label: 'First Name', value: receiver.fistName},
            {label: 'Last Name', value: receiver.lastName},
            {label: 'Email Address', value: receiver.email},
            {label: 'Phone Number', value: receiver.phone},
        ];
    }, [receiver]);

    const onContinuePressed = () => {
        navigate('PaymentMethodScreen');
    };

    const renderItemDetail = ({label, value}: {label: string; value: string}) => {
        return (
            <ViewItemDetail key={label}>
                <TextDetail type="r_12_18">{label}</TextDetail>
                <TextDetail type="r_12_18">{value}</TextDetail>
            </ViewItemDetail>
        );
    };

    const renderViewHeader = () => {
        return (
            <ViewHeader>
                <ViewName>
                    <Name numberOfLines={1} type="s_28_33">
                        {receiver.fistName} {receiver.lastName}
                    </Name>
                    <ViewType>
                        <Type type="s_12_15">
                            {receiver.accountType === TypeRegister.Persional
                                ? 'Persional account'
                                : 'Enterprise account'}
                        </Type>
                    </ViewType>
                </ViewName>
                <Avatar size={scales(64)} char={receiver.fistName.charAt(0)} />
            </ViewHeader>
        );
    };

    const renderViewDetail = () => {
        return <ViewDetail>{dataDetail.map(renderItemDetail)}</ViewDetail>;
    };

    return (
        <Wrapper>
            <GlobalHeader text="Recipient Information" />
            <Content>
                {renderViewHeader()}
                {renderViewDetail()}
            </Content>
            <ButtonContinue text="Confirm and continue" onPress={onContinuePressed} />
        </Wrapper>
    );
};

export default RecipientInforScreen;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    padding: ${scales(16)}px;
`;

const ButtonContinue = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
    margin-bottom: ${CommonSize.bottomSpace}px;
`;

const ViewHeader = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${scales(40)}px;
`;

const ViewName = styled.View`
    flex: 1;
    align-items: flex-start;
`;

const Name = styled(Text)`
    flex: 1;
`;

const ViewType = styled.View`
    padding: ${scales(4)}px;
    border-radius: ${scales(4)}px;
    background-color: ${(p) => p.theme.purple2};
`;

const Type = styled(Text)`
    color: ${(p) => p.theme.purple1};
`;

const ViewDetail = styled.View`
    background-color: ${(p) => p.theme.grey6};
    padding: ${scales(12)}px;
    border-radius: ${scales(8)}px;
    gap: ${scales(16)}px;
    margin-top: ${scales(24)}px;
`;

const ViewItemDetail = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TextDetail = styled(Text)``;
