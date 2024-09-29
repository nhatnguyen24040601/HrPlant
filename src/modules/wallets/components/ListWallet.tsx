import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';
import React from 'react';
import styled from 'styled-components/native';

import {scales} from 'theme/CommonSize';
import {useMyWallets} from '../src/selector';
import ItemWallet from './ItemWallet';

interface IProps {
    renderHeader: () => React.ReactElement;
}

const ListWallet = (props: IProps) => {
    const {renderHeader} = props;
    const wallets = useMyWallets();

    const onCreatePressed = () => {
        navigate('AddWalletScreen');
    };

    const renderEmpty = () => {
        return (
            <ViewEmpty>
                <ViewIcon>
                    <SVGIcon name="ic-payment-wallet" size={scales(28)} />
                </ViewIcon>
                <TitleEmpty type="s_14_21">Nothing to see yet</TitleEmpty>
                <Content type="r_12_18">You have not added any wallet</Content>
                <ButtonCreate text="Create your first wallet" onPress={onCreatePressed} />
            </ViewEmpty>
        );
    };

    const renderItem = ({item}: {item: wallet.IWallet | unknown}) => {
        return <ItemWallet wallet={item as wallet.IWallet} />;
    };

    return (
        <List
            data={wallets}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={{paddingBottom: scales(120)}}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default ListWallet;

const List = styled.FlatList`
    background-color: ${p => p.theme.white};
`;

const ViewEmpty = styled.View`
    align-items: center;
`;

const ViewIcon = styled.View`
    width: ${scales(48)}px;
    height: ${scales(48)}px;
    border-radius: ${scales(24)}px;
    background-color: ${p => p.theme.green8};
    justify-content: center;
    align-items: center;
`;

const TitleEmpty = styled(Text)`
    margin-top: ${scales(16)}px;
`;

const Content = styled(Text)`
    margin-top: ${scales(8)}px;
    color: ${p => p.theme.grey1};
`;

const ButtonCreate = styled(GlobalSubmitButton)`
    padding: ${scales(6)}px ${scales(12)}px;
    width: null;
    height: null;
    border-radius: ${scales(40)}px;
    margin-top: ${scales(16)}px;
`;
