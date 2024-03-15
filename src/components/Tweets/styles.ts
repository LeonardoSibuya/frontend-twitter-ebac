import styled from "styled-components"

export const Tweet = styled.div`
    background-color: #0c0c0c;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 16px;
    padding: 8px 16px;
    border-radius: 16px;
    margin-bottom: 24px;
`

export const TweetInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    color: #fff;
    
    a {
        font-size: 18px;
        font-weight: bold;
        font-family: "Kode Mono", monospace;
        text-decoration: none;
        cursor: pointer;

        &:hover {
            color: #cecece;
        }
    }
`

export const NameSpan = styled.span`
    font-size: 18px;
    font-weight: bold;
    font-family: "Kode Mono", monospace;
`

export const Date = styled.span`
    font-size: 12px;
    color: #cecece;
    font-style: italic;
`

export const TweetText = styled.p`
    color: #fff;
    font-size: 16px;
    line-height: 32px;
`