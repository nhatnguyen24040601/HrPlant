import {TypePaymentMethod} from 'utils/enum';

export const PaymentMethods: transaction.IPaymentMethod[] = [
    {
        icon: 'ic-payment-send',
        name: 'Instant bank transfer',
        desc: 'Send money to recipient’s bank account',
        type: TypePaymentMethod.INSTANT_BANK,
    },
    {
        icon: 'ic-recipient-bank',
        name: 'Manual bank transfer',
        desc: 'Send money to recipient’s bank account',
        type: TypePaymentMethod.MANUAL_BANK,
    },
    {
        icon: 'ic-payment-card',
        name: 'Pay with card',
        desc: 'Send money to via card',
        type: TypePaymentMethod.CARD,
    },
    {
        icon: 'ic-payment-wallet',
        name: 'Pay with wallet',
        desc: 'Send money to recipient via wallet',
        type: TypePaymentMethod.WALLET,
    },
];
