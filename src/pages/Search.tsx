import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import styled from "styled-components";

function Search() {
    const [searchResult, setSearchResult] = useState<any>(null);
    const location = useLocation();

    const queries: any = {};
    location.search.split(/\?|\&/).forEach(v => {
        if(v.length > 0) {
            const q = v.split('=');
            queries[q[0]] = q[1];
        }
    });

    useEffect(() => {
        if(!queries.keyword || queries.keyword.length < 1) {
            return;
        }

        axios.get(`/service/v1/search/channels?keyword=${queries.keyword}`).then(res => {
            setSearchResult(res.data.content);
        }).catch(() => {
            console.log("Search error");
        })
    }, [])

    if(!queries.keyword || queries.keyword.length < 1) {
        return (
            <div>검색어를 입력해주세요</div>
        );
    } else if(!searchResult) {
        return (
            <div>검색 중</div>
        );
    }

    console.log(searchResult);

    return (
        <SearchContainer>
            <SearchUl>
                {(searchResult.data as any[]).map((v: any) => 
                    <li style={{margin: "12px 0"}}>
                        <ResultA href={`/channel/${v.channel.channelId}`}>
                            <ChannelImage src={v.channel.channelImageUrl}/>
                            <span>{v.channel.channelName}</span>
                        </ResultA>
                    </li>
                )}
            </SearchUl>
        </SearchContainer>
    )
}

const SearchContainer = styled.div`
    height: 100%;
`

const SearchUl = styled.ul`
    list-style: none;
`

const ResultA = styled.a`
    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    text-decoration-line: none;
    color: black;
`

const ChannelImage = styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;

    border-radius: 50%;
`

export default Search;