function indexOf(str, exp) {
    const match = str.match(exp);
    return str.indexOf(match[0]);
}

function textSlicer(text, amount, endSymbol = '...') {
    if (typeof text !== 'string') {
        return text;
    }

    const trimmedText = text.trim();

    if (amount >= trimmedText.length) {
        return text;
    }

    const minPosition = Math.max(indexOf(trimmedText, /[^а-яёa-z]/i) - 1, 3);

    let slicePosition = Math.max(minPosition, amount - 1);

    for (slicePosition; slicePosition > minPosition; slicePosition--) {
        const prevWord = trimmedText.substring(slicePosition - 3, slicePosition + 1);
        if (!/^[а-яёa-z]+$/i.test(prevWord) || /^[а-яёa-z]+$/i.test(trimmedText[slicePosition + 1])) {
            continue;
        }
        break;
    }

    const rest = text.slice(slicePosition + 1);
    let isTextEnd = false;

    if (!/[а-яёa-z0-9]/i.test(rest)) {
        isTextEnd = true;

        for (let i = 0; i < rest.length; i++) {
            if (/[?!.]/.test(rest[i])) {
                slicePosition++;
                continue;
            }

            break;
        }
    }

    return text.slice(0, slicePosition + 1) + (!isTextEnd ? endSymbol : '');
}

export default textSlicer;