import React, {useContext} from 'react';
import styled from 'styled-components/native';

import TypeRegisterView from './TypeRegisterView';
import {RegisterProgress} from '../src/constants';
import {RegisterContext} from '../src/context';

import GlobalSubmitButton from 'components/GlobalSubmitButton';
import CommonSize, {scales} from 'theme/CommonSize';
import {TypeRegister} from 'utils/enum';

const TypeAccountSection = () => {
    const {setTypeRegister, typeRegister, setProgress, country} = useContext(RegisterContext);

    const onNextPressed = () => {
        setProgress(RegisterProgress.InputName);
    };

    return (
        <Wrapper>
            <TypeRegisterView typeSelected={typeRegister} onTypePressed={setTypeRegister} country={country} />
            <ButtonNext
                text="Next"
                disabled={!typeRegister || (country && !country.allowEnterprise && typeRegister === TypeRegister.Enterprise)}
                onPress={onNextPressed}
            />
        </Wrapper>
    );
};

export default TypeAccountSection;

const Wrapper = styled.View`
    flex: 1;
    width: ${CommonSize.scrWidth}px;
    padding: ${scales(24)}px ${scales(16)}px 0px ${scales(16)}px;
`;

const Content = styled.View`
    flex: 1;
`;

const ButtonNext = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
`;
