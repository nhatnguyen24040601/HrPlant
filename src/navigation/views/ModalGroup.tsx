import React from 'react';

import ModalMyWallets from 'components/ModalMyWallets';
import PasscodeLogin from 'modules/passcode/views/PasscodeLogin';

const ModalGroup = () => {
    return (
        <>
            <ModalMyWallets />
            <PasscodeLogin />
        </>
    );
};

export default ModalGroup;
