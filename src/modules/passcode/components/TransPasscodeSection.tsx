import React from 'react';
import styled, {toStyleSheet} from 'styled-components/native';

import {scales} from 'theme/CommonSize';
import PasscodeKeyboard from './PasscodeKeyboard';
import PasscodeDotSection from './PasscodeDotSection';
import {css} from 'styled-components';

interface IProps {
    value: string;
    setValue: (value: string) => void;
}

const TransPasscodeSection = (props: IProps) => {
    const {value, setValue} = props;

    return (
        <>
            <PasscodeDotSection value={value} type="number" />
            <PasscodeKeyboard value={value} setValue={setValue} containerStyle={toStyleSheet(ContainerKeyboard)} />
        </>
    );
};

export default TransPasscodeSection;

const ContainerKeyboard = css`
    margin-top: ${scales(40)}px;
`;
