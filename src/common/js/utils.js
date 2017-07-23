// whether is empty object
export const isEmptyObject = obj => {
    for (let name in obj) {
        return false;
    }
    return true;
};

export const formatTime = time => {
    const integerTime = time | 0;
    let minutes = integerTime / 60 | 0;
    let seconds = integerTime % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
};
