import {current} from '@reduxjs/toolkit';
import {debounce, groupBy, isEmpty} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {RefreshControl, SectionList} from 'react-native';
import Config from 'react-native-config';
import {SvgUri} from 'react-native-svg';
import styled from 'styled-components/native';

import {getCountries} from '../src/api';

import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import {goBack, useNavigationParams} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const SelectCountriesScreen = () => {
    const Colors = useColors();
    const {onSelectCountry} = useNavigationParams('SelectCountriesScreen');
    const [countries, setCountries] = useState<{key: string; data: register.ICountry[]}[]>([]);
    const [data, setData] = useState<register.ICountry[]>([]);
    const [search, setSearch] = useState('');
    const page = useRef(1);
    const canLoadMore = useRef(true);
    const [loading, setLoading] = useState(false);
    const limit = 20;

    useEffect(() => {
        onRefresh();
    }, [search]);

    const transformList = (listCountries: register.ICountry[]) => {
        const transferResCountry = groupBy(listCountries, (item) => {
            const name = item.name;
            return name.charAt(0);
        });
        const res = Object.keys(transferResCountry).map((key) => {
            return {key, data: transferResCountry[key]};
        });
        return res;
    };

    const onRefresh = () => {
        page.current = 1;
        canLoadMore.current = true;
        getListCountry();
    };

    const onLoadMore = () => {
        if (!loading && canLoadMore.current) {
            page.current += 1;
            getListCountry();
        }
    };

    const getListCountry = async () => {
        try {
            setLoading(true);
            const resCountry = await getCountries({
                keyword: search,
                isEnterprise: false,
                pageIndex: page.current,
                pageSize: limit,
            });
            if (resCountry.listModels.length < limit) {
                canLoadMore.current = false;
            }
            if (page.current === 1) {
                const tranformRes = transformList(resCountry.listModels);
                setData(resCountry.listModels);
                setCountries(tranformRes);
            } else {
                const tranformRes = transformList([...data, ...resCountry.listModels]);
                setData([...data, ...resCountry.listModels]);
                setCountries(tranformRes);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('getListCountry error', error);
        }
    };

    const onChangeSearch = debounce(
        (text) => {
            setSearch(text);
        },
        500,
        {leading: false, trailing: true}
    );

    const onSelect = (item: register.ICountry) => {
        onSelectCountry(item);
        goBack();
    };

    const renderItemCountry = ({item}: {item: register.ICountry}) => {
        const i = item as register.ICountry;

        return (
            <Item onPress={() => onSelect(i)}>
                <Image source={{uri: `${Config.API_URL}${i.image}`}} />
                <CountryName type="m_14_17">{i.name as string}</CountryName>
            </Item>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Select country" showBorder />
            <ViewInput>
                <SVGIcon name="ic-search" size={scales(18)} color={Colors.grey9} />
                <SearchInput placeholder="Search country name" onChangeText={onChangeSearch} />
            </ViewInput>
            <SectionList
                sections={countries}
                renderSectionHeader={({section}) => {
                    return <SectionName>{section.key}</SectionName>;
                }}
                renderItem={renderItemCountry}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{paddingHorizontal: scales(16), paddingBottom: CommonSize.bottomSpace}}
                stickySectionHeadersEnabled={false}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.5}
                refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
            />
        </Wrapper>
    );
};

export default SelectCountriesScreen;

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

const ViewInput = styled.View`
    flex-direction: row;
    align-items: center;
    border-width: ${scales(1)}px;
    margin: 0px ${scales(16)}px;
    padding: 0px ${scales(12)}px;
    border-color: ${(p) => p.theme.grey8};
    border-radius: ${scales(8)}px;
    gap: ${scales(12)}px;
    margin-top: ${scales(16)}px;
`;

const SearchInput = styled(TextInput)`
    color: ${(p) => p.theme.black1};
    font-size: ${scales(14)}px;
    line-height: ${scales(17)}px;
`;
