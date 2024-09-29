import React, {createContext, PropsWithChildren, useState} from 'react';

export const SendTransactionContext = createContext<{
    currency: addWallet.ICurrency;
    setCurrency: (currency: addWallet.ICurrency) => void;
    amount: string;
    setAmount: (amount: string) => void;
    receiver: transaction.IReceiver;
    setReceiver: (receiver: transaction.IReceiver) => void;
    onReset: () => void;
}>({
    currency: null,
    setCurrency: () => {},
    amount: '',
    setAmount: () => {},
    receiver: null,
    setReceiver: () => {},
    onReset: () => {},
});

export const SendTransactionProvider = ({children}: PropsWithChildren) => {
    const [currency, setCurrency] = useState<addWallet.ICurrency>();
    const [amount, setAmount] = useState('');
    const [receiver, setReceiver] = useState<transaction.IReceiver>();

    const onReset = () => {
        setReceiver(null);
        setAmount('');
        setCurrency(null);
    };

    return (
        <SendTransactionContext.Provider
            value={{
                currency,
                setCurrency,
                amount,
                setAmount,
                receiver,
                setReceiver,
                onReset,
            }}>
            {children}
        </SendTransactionContext.Provider>
    );
};
