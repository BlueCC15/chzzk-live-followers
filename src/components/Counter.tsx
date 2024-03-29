// only positive

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { createNumberArray, createNumberSpan } from "./CounterImpl";

function Counter({targetValue}: {targetValue: number}) {
    const oldRef = useRef(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const htmlString = createNumberSpan(createNumberArray(targetValue), createNumberArray(oldRef.current)).join('');

    useEffect(() => {
        oldRef.current = targetValue;
         
        setTimeout(() => {
            if(scrollRef.current) {
                const spans = scrollRef.current.querySelectorAll("span[data-value]");
                spans.forEach(v => {
                    const dvStr = v.getAttribute('data-value');
                    const dist = parseInt(dvStr ? dvStr : "1") - 1;
                    (v as any).style.transform = `translateY(-${dist * 100}%)`
                }, 0);
            }
        });
    }, [targetValue])

    return (
        <CounterContainer ref={scrollRef} dangerouslySetInnerHTML={{__html: htmlString}}/>
    )
}


const CounterContainer = styled.div`
    display: flex;
    height: 5rem;
    font-size: 5rem;

    position: relative;
    line-height: 1;
    align-items: center;
    overflow: hidden;

    > .digit_span {
        z-index: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        transition: all 2s ease;
        transform: translateY(0);
        line-height: 1;

        > .single_span {
            flex: 0 0 100%;
            height: 100%;
        }
    }
`

export default Counter;