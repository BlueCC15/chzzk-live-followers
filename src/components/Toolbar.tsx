import { ChangeEvent, useState, KeyboardEvent } from "react";
import styled from "styled-components";

function Toolbar() {
    const [keyword, setKeyword] = useState("");

    const onChangeKeywordInput = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.currentTarget.value);
    }

    const doSearch = () => {
        if(!keyword || keyword.length < 0) {
            return;
        }

        // Check input id
        if(keyword.match(/^[a-z0-9]{32}$/)) {
            window.location.href = `/channel/${keyword}`;
        } else {
            window.location.href= `/search?keyword=${keyword}`;
        }
    }

    const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            doSearch();
        }
    }

    return (
        <ToolbarContainer>
            <LogoDiv onClick={() => window.location.href="/"}>치지직 실시간 팔로워</LogoDiv>
            <SearchDiv>
                <SearchInput placeholder="채널명, 채널 고유 ID" value={keyword} onChange={onChangeKeywordInput} onKeyDown={handleInputKeydown}/>
                <SearchButton onClick={doSearch}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </SearchButton>
            </SearchDiv>
            <div></div>
        </ToolbarContainer>
    )
}

const LogoDiv = styled.div`
    font-size: 2rem;
    font-family: var(--font-nanumbrush);
    cursor: pointer;
`

const ToolbarContainer = styled.div`
    display: flex;
    align-items: center;

    padding: 12px;

    > * {
        flex: 1;
        text-align: start;
    }
`

const SearchDiv = styled.div`
    display: flex;
    align-self: center;

    width: 25%;
    min-width: 120px;
    height: 38px;

    border: 1px solid gray;
    border-radius: 20px;
    padding: 0 8px 0 14px;
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;

    border: none;
    background: none;
`

const SearchButton = styled.button`
    cursor: pointer;

    background: none;
    border: none;
`

export default Toolbar;