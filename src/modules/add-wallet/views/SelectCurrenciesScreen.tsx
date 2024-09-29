import {debounce, groupBy, isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {FlatList, SectionList} from 'react-native';
import Config from 'react-native-config';
import {SvgUri} from 'react-native-svg';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import {getCurrencies} from '../src/api';

import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';
import GlobalInput from 'components/GlobalInput';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import {goBack, useNavigationParams} from 'navigation/src/utils';
import { getColors } from 'theme/CommonColors';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const SelectCurrenciesScreen = () => {
    const Colors = useColors();
    const {onSelectCurrency} = useNavigationParams('SelectCurrenciesScreen');
    const [listOwned, setListOwned] = useState<addWallet.ICurrency[]>([]);
    const [data, setData] = useState<addWallet.ICurrency[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getListCurrencies();
    }, [search]);

    const getListCurrencies = async () => {
        const resCurrency = await getCurrencies({
            keyword: search,
            pageIndex: 1,
            pageSize: 200,
        });
        if (resCurrency) {
            const listOwnedData = resCurrency.listModels.filter((currency) => currency.hasWallet);
            const listData = resCurrency.listModels.filter((currency) => !currency.hasWallet);
            setListOwned(listOwnedData);
            setData(listData);
        }
    };

    const onChangeSearch = debounce(
        (text) => {
            setSearch(text);
        },
        500,
        {leading: false, trailing: true}
    );

    const renderItem = ({item}: {item: addWallet.ICurrency}) => {
        const onSelect = () => {
            onSelectCurrency(item);
            goBack();
        };

        return (
            <Item key={item.id} onPress={onSelect}>
                <Image source={{uri: `${Config.API_URL}${item.image}`}} />
                <CountryCode type="m_14_17">{item.code as string}</CountryCode>
                <CountryName type="m_14_17">{item.name as string}</CountryName>
            </Item>
        );
    };

    const renderListOwned = () => {
        return (
            <ListOwned>
                <Label type="m_12_15">Wallets you own</Label>
                {listOwned.map((currency) => renderItem({item: currency}))}
                <Label type="m_12_15">All currencies</Label>
            </ListOwned>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Select currency" showBorder />
            <SearchInput
                containerStyle={toStyleSheet(inputStyle)}
                placeholder="Search country name"
                onChangeText={onChangeSearch}
                viewLeft={<SVGIcon name="ic-search" size={scales(18)} color={Colors.grey9} />}
            />
            <ListCurrency
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{paddingHorizontal: scales(16), paddingBottom: CommonSize.bottomSpace}}
                ListHeaderComponent={renderListOwned}
            />
        </Wrapper>
    );
};

export default SelectCurrenciesScreen;

const inputStyle = css`
    background-color: ${getColors().white};
    margin: 0px ${scales(16)}px;
    margin-top: ${scales(14)}px;
`;

const Wrapper = styled.View`
    flex: 1;
`;

const Item = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(16)}px;
    padding: ${scales(12)}px 0px;
`;

const Image = styled.Image`
    width: ${scales(30)}px;
    height: ${scales(30)}px;
    border-radius: ${scales(15)}px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

const CountryName = styled(Text)`
    flex: 1;
`;

const SectionName = styled(Text)`
    margin-bottom: ${scales(4)}px;
    margin-top: ${scales(16)}px;
    color: ${(p) => p.theme.grey9};
`;

const SearchInput = styled(GlobalInput)`
    color: ${(p) => p.theme.grey9};
    font-size: ${scales(14)}px;
    line-height: ${scales(17)}px;
`;

const ListCurrency = styled(FlatList<addWallet.ICurrency>)``;

const ListOwned = styled.View``;

const Label = styled(Text)`
    margin-top: ${scales(12)}px;
    margin-bottom: ${scales(8)}px;
`;

const CountryCode = styled(Text)``;
