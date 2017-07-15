let vendor = (() => {
    const transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };

    const elementDomStyle = document.createElement('div').style;
    
    for (let key in transformNames) {
        if (elementDomStyle[transformNames[key]] !== undefined) return key;
    }

    return false;
})();

export const prefixStyle = (style) => {
    switch (true) {
        case (vendor === false):
            return false;
        case (vendor === 'standard'):
            return style;
        default:
            return vendor + style.charAt(0).toUpperCase() + style.slice(1);
    }
};