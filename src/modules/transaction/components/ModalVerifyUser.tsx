import React, {useEffect, useState} from 'react';
import {MaterialIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const ModalVerifyUser = () => {
    const Colors = useColors();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        global.showVerifyUser = showModal;
        global.hideVerifyUser = hideModal;
    }, []);

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    return (
        // @ts-ignore
        <SModal onBackButtonPress={hideModal} onBackdropPress={hideModal} isVisible={visible}>
            <Wrapper>
                <ViewLoading>
                    <MaterialIndicator size={scales(60)} color={Colors.green1} />
                </ViewLoading>
                <Text type="s_14_17">Verifying user information...</Text>
            </Wrapper>
        </SModal>
    );
};

export default ModalVerifyUser;

const SModal = styled(Modal)`
    flex: 1;
    margin: 0;
    padding: ${CommonSize.statusBarHeight + scales(25)}px ${scales(16)}px ${CommonSize.bottomSpace + scales(20)}px
        ${scales(16)}px;
`;

const Wrapper = styled.View`
    background-color: ${(p) => p.theme.white};
    align-items: center;
    gap: ${scales(24)}px;
    padding: ${scales(50)}px;
    border-radius: ${scales(16)}px;
`;

const ViewLoading = styled.View`
    width: ${scales(60)}px;
    height: ${scales(60)}px;
`;
