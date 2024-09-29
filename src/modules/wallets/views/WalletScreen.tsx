import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import ActionSection from '../components/ActionSection';
import HeaderWallet from '../components/HeaderWallet';
import ListWallet from '../components/ListWallet';
import {useSelectingWallet} from '../src/selector';

import SVGIcon from 'assets/svg';
import GlobalInput from 'components/GlobalInput';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import ItemWallet from 'modules/home/components/ItemWallet';
import {updateShowBalanceAction} from 'modules/setting/src/actions';
import {useShouldShowBalance} from 'modules/setting/src/selector';
import {navigate} from 'navigation/src/utils';
import {getColors} from 'theme/CommonColors';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const WalletScreen = () => {
    const Colors = useColors();
    const selectingWallet = useSelectingWallet();
    const showBalance = useShouldShowBalance();
    const dispatch = useDispatch();

    const onCreatePressed = () => {
        navigate('AddWalletScreen');
    };

    const onShowBalance = () => {
        dispatch(updateShowBalanceAction());
    };

    const goToDetailWallet = () => {
        navigate('DetailWallet', {wallet: selectingWallet});
    };

    const renderBalance = () => {
        return (
            <BalanceSection>
                <ViewLeftBalance>
                    <Label type="r_10_15">Available Balance</Label>
                    <ViewBalance onPress={onShowBalance}>
                        <Balance type="b_28_33">{showBalance ? '0.00' : '*****'} GBP</Balance>
                        <SVGIcon name={showBalance ? 'ic-eye-off' : 'ic-eye'} size={scales(20)} color={Colors.black1} />
                    </ViewBalance>
                </ViewLeftBalance>
                <ButtonOpen text="Tap to open" textType="s_10_15" onPress={goToDetailWallet} />
            </BalanceSection>
        );
    };

    const renderSearch = () => {
        return (
            <ViewWrapSearch>
                <HeaderAddWallet>
                    <TextAllWallet type="s_16_24">All wallets</TextAllWallet>
                    <ButtonAddWallet onPress={onCreatePressed}>
                        <ViewIconAdd>
                            <SVGIcon name="ic-plus" size={scales(18)} color={Colors.white} />
                        </ViewIconAdd>
                        <TextAdd type="s_12_18">Add wallet</TextAdd>
                    </ButtonAddWallet>
                </HeaderAddWallet>
                <InputSearch
                    textType="m_14"
                    containerStyle={toStyleSheet(styleSearch)}
                    placeholder="Search currency or country name..."
                    viewLeft={<SVGIcon name="ic-search" size={scales(18)} color={Colors.black1} />}
                    placeholderTextColor={Colors.grey11}
                />
            </ViewWrapSearch>
        );
    };

    const renderHeaderList = () => {
        return (
            <ViewHeader>
                {selectingWallet ? renderBalance() : <SItemWallet isNew={true} />}
                <ActionSection />
                {renderSearch()}
            </ViewHeader>
        );
    };

    return (
        <Wrapper>
            <HeaderWallet />
            <ListWallet renderHeader={renderHeaderList} />
        </Wrapper>
    );
};

export default WalletScreen;

const styleSearch = css`
    margin-top: ${scales(16)}px;
    height: ${scales(40)}px;
    border-color: ${getColors().grey6};
`;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.grey12};
`;

const ViewHeader = styled.View`
    padding-top: ${scales(22)}px;
    background-color: ${(p) => p.theme.grey12};
`;

const ViewWrapSearch = styled.View`
    background-color: ${(p) => p.theme.white};
    padding: ${scales(16)}px;
`;

const HeaderAddWallet = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TextAllWallet = styled(Text)``;

const ButtonAddWallet = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(4)}px;
    padding: ${scales(6)}px ${scales(10)}px;
    border-radius: ${scales(40)}px;
    border-width: ${scales(1)}px;
    border-color: ${(p) => p.theme.grey13};
`;

const ViewIconAdd = styled.View`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    border-radius: ${scales(10)}px;
    justify-content: center;
    align-items: center;
    background-color: ${(p) => p.theme.green1};
`;

const TextAdd = styled(Text)``;

const InputSearch = styled(GlobalInput)``;

const SItemWallet = styled(ItemWallet)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    margin-left: ${scales(16)}px;
`;

const BalanceSection = styled.View`
    flex-direction: row;
    align-items: flex-start;
    background-color: ${(p) => p.theme.white};
    width: ${CommonSize.scrWidth - scales(32)}px;
    margin-left: ${scales(16)}px;
    border-radius: ${scales(8)}px;
    padding: ${scales(16)}px;
`;

const ViewLeftBalance = styled.View`
    gap: ${scales(8)}px;
    flex: 1;
`;

const Label = styled(Text)`
    color: ${(p) => p.theme.grey1};
`;

const ViewBalance = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(12)}px;
`;

const Balance = styled(Text)`
    color: ${(p) => p.theme.black};
`;

const ButtonOpen = styled(GlobalSubmitButton)`
    width: null;
    height: null;
    padding: ${scales(6)}px ${scales(12)}px;
    border-radius: ${scales(20)}px;
`;
