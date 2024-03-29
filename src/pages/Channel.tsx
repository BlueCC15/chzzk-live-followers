import axios from "axios";
import { useEffect, useRef, useState } from "react";

import Counter from "../components/Counter";
import { useLocation } from "react-router";
import styled from "styled-components";

interface ChannelData {
    channelId?: string;
    channelName: string;
    channelImageUrl?: string;
    verifiedMark: boolean,
    followerCount: number;
    openLive: boolean;
}

function Channel() {
    const [current, setCurrent] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const location = useLocation();
    const channelId = location.pathname.split('/').at(-1);

    const [channelData, setChannelData] = useState<ChannelData | null>(null);

    useEffect(() => {
        axios.get(`/service/v1/channels/${channelId}`).then(res => {
            setChannelData(res.data.content);
            setCurrent(res.data.content.followerCount);
            updateCount();
        }).catch(() => {
            console.log("Invalid channel ID");
        })
    }, [])

    const updateCount = (() => {
        axios.get(`/service/v1/channels/${channelId}`).then(res => {
            setCurrent(res.data.content.followerCount);
            setTimeout(() => updateCount(), 10000);
        }).catch(() => {
            console.log("Invalid channel ID");
        });
    });

    if(!channelData) {
        return (
            <div>
                채널 불러오는 중
            </div>
        )
    }

    const onClickChannelImage = () => {
        if(channelData.openLive) {
            window.open(`https://chzzk.naver.com/live/${channelData.channelId}`);
        }
    }

    const liveStyle = {
        border: (channelData.openLive) ? "5px solid red" : "none",
        cursor: "pointer"
    }
    
    return (
        <div>
            {channelData.channelId ?
                <>
                    <div>
                        <ChannelImg src={channelData.channelImageUrl} width={240} height={240} style={liveStyle} onClick={onClickChannelImage}/>
                        <h3>{channelData.channelName}</h3>
                    </div>
                    <Counter targetValue={current}/> 
                    <span style={{fontSize: "12px", color: "gray"}}>Followers</span>
                </>
                :
                <div>존재하지 않는 채널입니다.</div>
            }
        </div>
    )
}

const ChannelImg = styled.img`
    object-fit: cover;
    border-radius: 50%;
`

export default Channel;