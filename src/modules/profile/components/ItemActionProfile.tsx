import React from 'react';
import styled from 'styled-components/native';
import ToggleSwitch from 'toggle-switch-react-native';

import SVGIcon from 'assets/svg';
import Text from 'components/Text';
import {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const ItemActionProfile = (props: profile.IItemActionProfileProps) => {
    const Colors = useColors();
    const {label, desc, isAction = true, icon, customColor, customBackground, showToggle, onPress, showKYC} = props;

    return (
        <Wrapper disabled={showToggle} onPress={onPress}>
            <ViewIcon customBackground={customBackground}>
                <SVGIcon name={icon} size={scales(20)} color={customColor || Colors.green2} />
            </ViewIcon>
            <ViewCenter>
                <Label customColor={customColor} isAction={isAction} type={isAction ? 'm_14_21' : 'r_12_18'}>
                    {label}
                </Label>
                {desc && (
                    <Desc isAction={isAction} type={isAction ? 'r_12_18' : 'm_14_21'}>
                        {desc}
                    </Desc>
                )}
            </ViewCenter>
            {showKYC && (
                <ViewKYC>
                    <TextKYC type="m_12">
                        0/3 <TextGreen type="m_12">Verified</TextGreen>
                    </TextKYC>
                </ViewKYC>
            )}
            {showToggle ? (
                <ToggleSwitch isOn={false} onToggle={() => {}} />
            ) : (
                <SVGIcon name="ic-chevron-right" size={scales(20)} color={customColor || Colors.grey1} />
            )}
        </Wrapper>
    );
};

export default ItemActionProfile;

const Wrapper = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(12)}px;
    padding: ${scales(16)}px;
`;

const ViewIcon = styled.View<{customBackground?: string}>`
    width: ${scales(32)}px;
    height: ${scales(32)}px;
    border-radius: ${scales(16)}px;
    background-color: ${(p) => p.customBackground || p.theme.grey3};
    justify-content: center;
    align-items: center;
`;

const ViewCenter = styled.View`
    flex: 1;
    gap: ${scales(4)}px;
`;

const Label = styled(Text)<{isAction: boolean; customColor: string}>`
    color: ${(p) => (p.customColor ? p.customColor : p.isAction ? p.theme.black1 : p.theme.grey1)};
`;

const Desc = styled(Text)<{isAction: boolean}>`
    color: ${(p) => (p.isAction ? p.theme.grey1 : p.theme.black1)};
`;

const ViewKYC = styled.View`
    padding: ${scales(4)}px;
    background-color: ${(p) => p.theme.green3};
    border-radius: ${scales(4)}px;
`;

const TextKYC = styled(Text)``;

const TextGreen = styled(Text)`
    color: ${(p) => p.theme.green1};
`;
