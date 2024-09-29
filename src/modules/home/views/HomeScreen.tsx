import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, LayoutChangeEvent} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import ActionSection from '../components/ActionSection';
import Banner from '../components/Banner';
import BottomSheetTransaction from '../components/BottomSheetTransaction';
import HeaderWithAvatar from '../components/HeaderWithAvatar';
import KYCSection from '../components/KYCSection';
import ListWallet from '../components/ListWallet';

import {useProfile} from 'modules/profile/src/selector';
import {getMyWalletsAction} from 'modules/wallets/src/actions';
import {navigate} from 'navigation/src/utils';
import {DEVICE_EVENT} from 'utils/events';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [heightTopView, setHeightTopView] = useState(0);
    const profile = useProfile();

    useEffect(() => {
        if (profile.isFirstLogin) {
            navigate('FirstInforScreen');
        }
        getWallets();
        const sub = DeviceEventEmitter.addListener(DEVICE_EVENT.REFRESH_WALLETS, () => {
            getWallets();
        });
        return () => {
            sub.remove();
        };
    }, [profile]);

    const getWallets = async () => {
        dispatch(
            getMyWalletsAction.request({
                data: {keyword: '', pageIndex: 1, pageSize: 200},
            })
        );
    };

    const onLayout = ({nativeEvent}: LayoutChangeEvent) => {
        setHeightTopView(nativeEvent.layout.height);
    };

    return (
        <Wrapper>
            <Content onLayout={onLayout}>
                <HeaderWithAvatar />
                <Banner />
                <ListWallet />
                <ActionSection />
                <KYCSection />
            </Content>
            <BottomSheetTransaction height={heightTopView} />
        </Wrapper>
    );
};

export default HomeScreen;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View``;
