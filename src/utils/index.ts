export const formatNumber = (number?: string | number, behind = 2) => {
    if (number === undefined || number === '') {
        return '';
    }
    if (Math.abs(Number(number)) < 0.000001) {
        return '0';
    }
    let value = number.toString();
    if (value.includes('.') || value.includes(',')) {
        value = value.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        const [frontDot, behindDot] = value.split('.');
        const sub = behindDot.substring(0, behind).replace(/(0+)$/, '');
        value = `${frontDot}${sub ? `.${sub}` : ''}`;
    } else {
        value = value.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return value;
};

export const formatNumberInput = (number?: string | number, behind = 2) => {
    if (number === undefined || number === '') {
        return '';
    }
    let value = number.toString();
    if (value.includes('.') || value.includes(',')) {
        value = value.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        const [frontDot, behindDot] = value.split('.');
        console.log('frontDot, behindDot', {frontDot, behindDot});

        value = `${frontDot}.${behindDot.substring(0, behind)}`;
    } else {
        value = value.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return value;
};

export const validateEmail = (email: string) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};
