import React from 'react';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import HeaderActivity from '../components/HeaderActivity';

import ItemActivity from '../components/ItemActivity';

import SVGIcon from 'assets/svg';
import GlobalInput from 'components/GlobalInput';
import Text from 'components/Text';
import {getColors} from 'theme/CommonColors';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const ActivityScreen = () => {
    const Colors = useColors();

    const renderSearch = () => {
        return (
            <ViewSearch>
                <InputSearch
                    containerStyle={toStyleSheet(styleSearch)}
                    viewLeft={<SVGIcon name="ic-search" size={scales(18)} color={Colors.grey1} />}
                    placeholder="Try searching for names..."
                />
                <ButtonFilter>
                    <SVGIcon name="ic-filter" size={scales(18)} color={Colors.white} />
                </ButtonFilter>
            </ViewSearch>
        );
    };

    const renderItem = () => {
        return <ItemActivity />;
    };

    return (
        <Wrapper>
            <HeaderActivity />
            {renderSearch()}

            <ListTransaction
                ListHeaderComponent={<SectionName type="m_12_15">Today</SectionName>}
                data={Array(5).fill({})}
                renderItem={renderItem}
            />
        </Wrapper>
    );
};

export default ActivityScreen;

const styleSearch = css`
    height: ${scales(42)}px;
    flex: 1;
    border-color: ${getColors().grey6};
    background-color: ${getColors().grey6};
    border-radius: ${scales(4)}px;
`;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.white};
    padding-top: ${CommonSize.statusBarHeight}px;
`;

const ViewSearch = styled.View`
    flex-direction: row;
    align-items: center;
    padding: ${scales(16)}px;
    gap: ${scales(8)}px;
`;

const InputSearch = styled(GlobalInput)``;

const ButtonFilter = styled.TouchableOpacity`
    width: ${scales(42)}px;
    height: ${scales(42)}px;
    border-radius: ${scales(4)}px;
    background-color: ${(p) => p.theme.green1};
    justify-content: center;
    align-items: center;
`;

const SectionName = styled(Text)`
    margin: ${scales(16)}px ${scales(16)}px ${scales(8)}px ${scales(16)}px;
`;

const ListTransaction = styled.FlatList``;
