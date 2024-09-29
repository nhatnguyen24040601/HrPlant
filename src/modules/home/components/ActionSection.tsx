import SVGIcon, {TNameOfIconSVG} from 'assets/svg';
import Text from 'components/Text';
import React from 'react';
import styled from 'styled-components/native';
import {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

interface IAction {
    label: string;
    icon: TNameOfIconSVG;
    onPress: () => void;
    iconColor: string;
    backgroundColor: string;
}

const ActionSection = () => {
    const Colors = useColors();
    const onAddPressed = () => {};

    const actions: IAction[] = [
        {
            label: 'Add money',
            icon: 'ic-plus',
            onPress: onAddPressed,
            backgroundColor: Colors.green3,
            iconColor: Colors.green1,
        },
        {
            label: 'Request',
            icon: 'ic-arrow-down',
            onPress: onAddPressed,
            backgroundColor: Colors.blue2,
            iconColor: Colors.blue3,
        },
        {
            label: 'Beneficiaries',
            icon: 'ic-beneficiaries',
            onPress: onAddPressed,
            backgroundColor: Colors.purple2,
            iconColor: Colors.purple1,
        },
        {
            label: 'Scan to pay',
            icon: 'ic-scan',
            onPress: onAddPressed,
            backgroundColor: Colors.green3,
            iconColor: Colors.green4,
        },
    ];

    const renderItemAction = (action: IAction) => {
        return (
            <ViewItem key={action.label}>
                <ViewIcon background={action.backgroundColor}>
                    <SVGIcon name={action.icon} size={scales(24)} color={action.iconColor} />
                </ViewIcon>
                <Label type="m_10_15">{action.label}</Label>
            </ViewItem>
        );
    };

    return <Wrapper>{actions.map(renderItemAction)}</Wrapper>;
};

export default ActionSection;

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 24px ${scales(16)}px;
    gap: ${scales(12)}px;
`;

const ViewItem = styled.TouchableOpacity`
    flex: 1;
    background-color: ${(p) => p.theme.white};
    border-radius: ${scales(8)}px;
    padding: ${scales(8)}px 0px;
    align-items: center;
`;

const ViewIcon = styled.View<{background: string}>`
    width: ${scales(40)}px;
    height: ${scales(40)}px;
    border-radius: ${scales(20)}px;
    justify-content: center;
    align-items: center;
    margin-bottom: ${scales(12)}px;
    background-color: ${(p) => p.background};
`;

const Label = styled(Text)``;
