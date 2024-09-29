import React, {createContext, PropsWithChildren, useState} from 'react';

import {register} from './api';
import {RegisterProgress} from './constants';

import {reset} from 'navigation/src/utils';
import {TypeRegister} from 'utils/enum';

export const RegisterContext = createContext<{
    typeRegister: '' | TypeRegister;
    setTypeRegister: (text: TypeRegister) => void;
    progress: {position: number; tab: number; label: string};
    setProgress: (progress: {position: number; tab: number; label: string}) => void;
    country: register.ICountry;
    setCountry: (country: register.ICountry) => void;
    email: string;
    setEmail: (email: string) => void;
    resetContext: () => void;
    phone: string;
    setPhone: (phone: string) => void;
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (firstName: string) => void;
    pass: string;
    setPass: (pass: string) => void;
    confirmPass: string;
    setConfirmPass: (pass: string) => void;
    onRegister: () => Promise<unknown>;
}>({
    typeRegister: '',
    setTypeRegister: () => {},
    progress: RegisterProgress.SelectCountry,
    setProgress: () => {},
    country: null,
    setCountry: () => {},
    email: '',
    setEmail: () => {},
    resetContext: () => {},
    phone: '',
    setPhone: () => {},
    firstName: '',
    setFirstName: () => {},
    lastName: '',
    setLastName: () => {},
    pass: '',
    setPass: () => {},
    confirmPass: '',
    setConfirmPass: () => {},
    onRegister: () => {
        return new Promise(() => {});
    },
});

export const RegisterProvider = ({children}: PropsWithChildren) => {
    const [typeRegister, setTypeRegister] = useState<'' | TypeRegister>('');
    const [progress, setProgress] = useState(RegisterProgress.SelectCountry);
    const [country, setCountry] = useState<register.ICountry>(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const resetContext = () => {
        setTypeRegister('');
        setCountry(null);
        setEmail('');
        setProgress(RegisterProgress.SelectCountry);
        setPhone('');
        setFirstName('');
        setLastName('');
        setPass('');
        setConfirmPass('');
    };

    const onRegister = () => {
        return register({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Phone: phone,
            Address: '',
            Country: country.name,
            City: '',
            State: '',
            Postcode: '',
            Password: pass,
            AccountType: typeRegister as TypeRegister,
            BusinessName: '',
            BusinessNumber: '',
        });
    };

    return (
        <RegisterContext.Provider
            value={{
                typeRegister,
                setTypeRegister,
                progress,
                setProgress,
                country,
                setCountry,
                email,
                setEmail,
                resetContext,
                phone,
                setPhone,
                firstName,
                setFirstName,
                lastName,
                setLastName,
                pass,
                setPass,
                confirmPass,
                setConfirmPass,
                onRegister,
            }}>
            {children}
        </RegisterContext.Provider>
    );
};
