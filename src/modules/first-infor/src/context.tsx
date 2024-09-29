import React, {createContext, PropsWithChildren, useState} from 'react';

import {FirstInforStep} from './constant';

export const FirstInforContext = createContext<{
    step: number;
    setStep: (step: number) => void;
    birthDate: string;
    setBirthDate: (birthDate: string) => void;
}>({
    step: FirstInforStep.Intro,
    setStep: () => {},
    birthDate: '',
    setBirthDate: () => {},
});

export const FirstInforProvider = ({children}: PropsWithChildren) => {
    const [step, setStep] = useState(FirstInforStep.Intro);
    const [birthDate, setBirthDate] = useState('');

    return (
        <FirstInforContext.Provider
            value={{
                step,
                setStep,
                birthDate,
                setBirthDate,
            }}>
            {children}
        </FirstInforContext.Provider>
    );
};
