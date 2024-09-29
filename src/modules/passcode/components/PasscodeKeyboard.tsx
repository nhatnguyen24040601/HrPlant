import SVGIcon from 'assets/svg';
import Text from 'components/Text';
import React from 'react';
import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

interface IProps {
    value: string;
    setValue: (value: string) => void;
    onKeyPress?: () => void;
    containerStyle?: ViewStyle;
}

const PasscodeKeyboard = (props: IProps) => {
    const Colors = useColors();
    const {value, setValue, onKeyPress, containerStyle} = props;

    const onKeyPressed = (key: number | 'back', value: string, setValue: (value: string) => void) => {
        if (key === 'back') {
            setValue(value.slice(0, value.length - 1));
            onKeyPress?.();
            return;
        }
        if (value.length > 3) {
            return;
        }
        setValue(value + key);
        onKeyPress?.();
    };

    const setCodeAsType = (key: number | 'back') => {
        onKeyPressed(key, value, setValue);
    };

    const renderKey = (key?: number | 'back') => {
        if (key === undefined) {
            return <ViewEmpty />;
        }
        return (
            <Button onPress={() => setCodeAsType(key)}>
                {key === 'back' ? (
                    <SVGIcon name="ic-back" size={scales(24)} color={Colors.black1} />
                ) : (
                    <TextButton type="m_28_32">{key}</TextButton>
                )}
            </Button>
        );
    };

    return (
        <ViewKeyboar style={containerStyle}>
            <RowButton>
                {renderKey(1)}
                {renderKey(2)}
                {renderKey(3)}
            </RowButton>
            <RowButton>
                {renderKey(4)}
                {renderKey(5)}
                {renderKey(6)}
            </RowButton>
            <RowButton>
                {renderKey(7)}
                {renderKey(8)}
                {renderKey(9)}
            </RowButton>
            <RowButton>
                {renderKey()}
                {renderKey(0)}
                {renderKey('back')}
            </RowButton>
        </ViewKeyboar>
    );
};

export default PasscodeKeyboard;

const ViewKeyboar = styled.View`
    padding: 0px ${scales(24)}px;
    gap: ${scales(16)}px;
`;

const RowButton = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
    width: ${scales(60)}px;
    height: ${scales(60)}px;
    border-radius: ${scales(30)}px;
    background-color: ${(p) => p.theme.grey12};
    border-width: ${scales(1)}px;
    border-color: ${(p) => p.theme.grey6};
    justify-content: center;
    align-items: center;
`;

const TextButton = styled(Text)``;

const ViewEmpty = styled.View`
    width: ${scales(60)}px;
    height: ${scales(60)}px;
`;
