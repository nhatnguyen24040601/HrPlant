import React from 'react';
import Config from 'react-native-config';
import QRCode from 'react-native-qrcode-svg';
import styled from 'styled-components/native';

import Images from 'assets/images';
import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';
import Text from 'components/Text';
import {useSelectingWallet} from 'modules/wallets/src/selector';
import CommonSize, {scales} from 'theme/CommonSize';
import { useColors } from 'theme/provider/ThemeProvider';

const QRCodeReceive = () => {
    const Colors = useColors();
    const selectingWallet = useSelectingWallet();

    const renderQRView = () => {
        return (
            <ViewWrapQR>
                <ViewCurrency>
                    <Flag source={{uri: `${Config.API_URL}/${selectingWallet.image}`}} />
                    <CurrencyName>{selectingWallet.name}</CurrencyName>
                    <CurrencyCode>{selectingWallet.code}</CurrencyCode>
                </ViewCurrency>
                <QRCode
                    value="Just some string value"
                    logo={Images.IconAppQR}
                    size={CommonSize.scrWidth - scales(140)}
                />
                <Desc>Scan QR to pay on Cadawada</Desc>
            </ViewWrapQR>
        );
    };

    const renderActionBottom = () => {
        return (
            <ActionView>
                <Button>
                    <SVGIcon name="ic-edit" size={scales(20)} color={Colors.green1} />
                    <TextButton>Edit details</TextButton>
                </Button>
                <Line />
                <Button>
                    <SVGIcon name="ic-share" size={scales(20)} color={Colors.green1} />
                    <TextButton>Share QR code</TextButton>
                </Button>
            </ActionView>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="QR Code" />
            <Content>
                {renderQRView()}
                {renderActionBottom()}
            </Content>
        </Wrapper>
    );
};

export default QRCodeReceive;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    padding: ${scales(40)}px ${scales(25)}px ${scales(40)}px ${scales(25)}px;
    background-color: ${p => p.theme.grey15};
    flex: 1;
`;

const ViewWrapQR = styled.View`
    background-color: ${p => p.theme.white};
    padding: ${scales(40)}px ${scales(25)}px ${scales(40)}px ${scales(25)}px;
    border-radius: ${scales(24)}px;
    align-items: center;
`;

const ViewCurrency = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${scales(50)}px;
`;

const Flag = styled.Image`
    width: ${scales(30)}px;
    height: ${scales(30)}px;
    border-radius: ${scales(15)}px;
`;

const CurrencyName = styled(Text)`
    margin-left: ${scales(8)}px;
    margin-right: ${scales(4)}px;
`;

const CurrencyCode = styled(Text)``;

const Desc = styled(Text)`
    margin-top: ${scales(35)}px;
`;

const ActionView = styled.View`
    margin-top: ${scales(60)}px;
    flex-direction: row;
    align-items: center;
    border-radius: ${scales(60)}px;
    background-color: ${p => p.theme.white};
`;

const Button = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(8)}px;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: ${scales(16)}px;
`;

const TextButton = styled(Text)``;

const Line = styled.View`
    width: ${scales(1)}px;
    height: ${scales(20)}px;
    background-color: ${p => p.theme.grey2};
`;
