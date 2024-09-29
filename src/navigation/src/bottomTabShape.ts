export const getShape = ({height, width}) => {
    return `
        M0,${height}
        L0,0
        L${width},0
        L${width},${height}
        Z
    `;
};
