import React from 'react';
import styled from 'styled-components/native';

import ItemWallet from './ItemWallet';

import {useMyWallets} from 'modules/wallets/src/selector';
import {scales} from 'theme/CommonSize';

const ListWallet = () => {
    const myWallets = useMyWallets();

    return (
        <Wrapper>
            <ScrollView
                horizontal
                contentContainerStyle={{paddingHorizontal: scales(16), gap: scales(10)}}
                showsHorizontalScrollIndicator={false}>
                {myWallets.map((wallet) => (
                    <ItemWallet wallet={wallet} key={wallet.id} />
                ))}
                <ItemWallet isNew />
            </ScrollView>
        </Wrapper>
    );
};

export default ListWallet;

const Wrapper = styled.View``;

const ScrollView = styled.ScrollView``;
