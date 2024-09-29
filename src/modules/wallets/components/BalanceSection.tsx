import React, {useState} from 'react';
import {ViewProps} from 'react-native';
import Config from 'react-native-config';
import {SvgUri} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import Images from 'assets/images';
import SVGIcon from 'assets/svg';
import Text from 'components/Text';

import {updateShowBalanceAction} from 'modules/setting/src/actions';
import {useShouldShowBalance} from 'modules/setting/src/selector';
import {hitSlop, scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';
import {formatNumber} from 'utils';

interface IProps extends ViewProps {
    wallet?: wallet.IWallet;
}

const BalanceSection = (props: IProps) => {
    const Colors = useColors();
    const {wallet} = props;
    const showBalance = useShouldShowBalance();
    const dispatch = useDispatch();

    const onShowBalancePressed = () => {
        dispatch(updateShowBalanceAction());
    };

    const onWalletPressed = () => {};

    const renderDetailWallet = () => {
        return (
            <>
                <ViewTop>
                    <CountryName type="m_12_15">{wallet.name}</CountryName>
                    <Flag source={{uri: `${Config.API_URL}${wallet.image}`}} />
                </ViewTop>
                <ViewBalance>
                    <Balance type="b_20_26">₦ {showBalance ? formatNumber(wallet.balance) : '*****'}</Balance>
                    <ButtonShow hitSlop={hitSlop} onPress={onShowBalancePressed}>
                        <SVGIcon
                            name={showBalance ? 'ic-eye-off' : 'ic-eye'}
                            size={scales(24)}
                            color={Colors.white}
                        />
                    </ButtonShow>
                </ViewBalance>
            </>
        );
    };

    const renderNewItem = () => {
        return (
            <>
                <ButtonAdd>
                    <SVGIcon name="ic-plus" size={scales(18)} color={Colors.white} />
                </ButtonAdd>
                <TextNew type="s_12_18">Add new wallet</TextNew>
            </>
        );
    };

    return (
        <Wrapper {...props}>
            {renderDetailWallet()}
            <ImageBG source={Images.BGItemWallet} />
        </Wrapper>
    );
};

export default BalanceSection;

const Wrapper = styled.TouchableOpacity<{isNew?: boolean}>`
    padding: ${scales(16)}px ${scales(12)}px;
    background-color: ${(p) => (p?.isNew ? p.theme.white : p.theme.green1)};
    width: ${scales(250)}px;
    height: ${scales(110)}px;
    border-radius: ${scales(12)}px;
    justify-content: space-between;
    overflow: hidden;
`;

const Flag = styled.Image`
    width: ${scales(28)}px;
    height: ${scales(28)}px;
    border-radius: ${scales(14)}px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

const ViewTop = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${scales(8)}px;
`;

const ButtonOpen = styled.TouchableOpacity`
    background-color: ${(p) => p.theme.white};
    padding: ${scales(4)}px ${scales(6)}px;
    border-radius: ${scales(10)}px;
`;

const CountryName = styled(Text)`
    flex: 1;
    color: ${(p) => p.theme.white};
`;

const Balance = styled(Text)`
    color: ${(p) => p.theme.white};
`;

const ViewBalance = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ButtonShow = styled.TouchableOpacity`
    margin-left: ${scales(12)}px;
`;

const ButtonAdd = styled.View`
    width: ${scales(28)}px;
    height: ${scales(28)}px;
    border-radius: ${scales(14)}px;
    justify-content: center;
    align-items: center;
    background-color: ${(p) => p.theme.green1};
`;

const TextNew = styled(Text)``;

const ImageBG = styled.Image`
    position: absolute;
    right: ${-scales(4)}px;
    top: 0;
    bottom: 0;
    height: ${scales(110)}px;
    width: ${(scales(110) * 125) / 110}px;
`;
