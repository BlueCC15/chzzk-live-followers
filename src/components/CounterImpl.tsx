export function createNumberArray(value: number) {
    return value.toString().split('');
}

export function createNumberSpan(newArray: string[], oldArray: string[]) {
    const showArray: string[] = [...oldArray];
    if(showArray.length < newArray.length) {
        while(showArray.length < newArray.length) { 
            showArray.unshift('0');
        }
    } else if(showArray.length > newArray.length) {
        showArray.length = newArray.length;
    }

    const spanArray = showArray.map((v, i) => {
        const spans = deltaSpan(newArray[i], v);
        const dv = parseInt(newArray[i] )
        return (
            `<span
                class="digit_span"
                data-value=${spans.length}>
                    ${spans.join('')}
            </span>`
        )
    });

    return spanArray
}

function deltaSpan(newStr: string, oldStr: string) {
    let numberArray = [oldStr];
    let foundSame = false;

    if(newStr === oldStr) {
        return numberArray.map(v => (`<span class="single_span">${v}</span>`));
    }

    let current = parseInt(oldStr);
    while(!foundSame) {
        current++;
        if(current > 9) {
            current = 0;
        }
        numberArray.push(`${current}`);
        if(parseInt(newStr) === current) { 
            foundSame = true;
        }
    }
    return numberArray.map(v => (`<span class="single_span">${v}</span>`));
}
