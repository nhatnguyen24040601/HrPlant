import React, {useRef, useState} from 'react';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import HeaderDetailWallet from '../components/HeaderDetailWallet';
import WalletInfoSection from '../components/WalletInfoSection';

import Text from 'components/Text';
import ItemActivity from 'modules/activities/components/ItemActivity';
import {useNavigationParams} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';

const DetailWallet = () => {
    const {wallet: walletProp} = useNavigationParams('DetailWallet');
    const [wallet, setWallet] = useState(walletProp);

    const renderHeader = () => {
        return (
            <>
                <WalletInfoSection wallet={wallet} />
                <HeaderList>
                    <Title type="s_16_24">Transactions</Title>
                    <SeeAll type="s_16_24">See all</SeeAll>
                </HeaderList>
            </>
        );
    };

    const renderItem = () => {
        return <ItemActivity />;
    };

    return (
        <Wrapper>
            <HeaderDetailWallet wallet={wallet} setWallet={setWallet} />
            <ListHistory
                ListHeaderComponent={renderHeader}
                data={Array(5).fill({})}
                renderItem={renderItem}
                contentContainerStyle={toStyleSheet(contentListStyle)}
                showsVerticalScrollIndicator={false}
            />
        </Wrapper>
    );
};

export default DetailWallet;

const contentListStyle = css`
    padding-bottom: ${CommonSize.bottomSpace}px;
`;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${p => p.theme.white};
`;

const ListHistory = styled.FlatList`
    flex: 1;
`;

const HeaderList = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${scales(20)}px ${scales(16)}px;
`;

const Title = styled(Text)``;

const SeeAll = styled(Text)`
    color: ${(p) => p.theme.green1};
`;
