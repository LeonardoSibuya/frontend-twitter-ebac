import styled from "styled-components"

export const Section = styled.section`
    background-color: #000;
    height: 100vh;
    padding-top: 40px;
    position: relative;
`

export const ButtonHome = styled.button`
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    margin: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
`

export const ProfileContainer = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
`

export const ProfileName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;

    img {
        width: 140px;
        height: 140px;
    }

    h4 {
        font-size: 40px;
        font-weight: bold;
        letter-spacing: 1px;
        font-family: "Kode Mono", monospace;
    }

    h5 {
        font-size: 16px;
        color: #8e8e8e;
    }
`

export const ButtonFollow = styled.button`
    background-color: #fff;
    color: #14659b;
    font-size: 12px;
    font-family: "Kode Mono", monospace;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 8px;
    padding: 8px;
    transition: 0.2s ease;

    &.follow {
        &:hover {
            background-color: #14659b;
        }
    } 

    &.unfollow {
        &:hover {
            background-color: #ed0000;
        }
    } 

    &:hover {
        color: #fff;
        transition: 0.2s ease;
    }
`

export const ListTweets = styled.ul`
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 18px;
    color: #8e8e8e;

    li {
        font-family: "Kode Mono", monospace;

        span {
            padding-right: 4px;
            font-size: 16px;
            color: #fff;
        }
    }
` 

export const Line = styled.span`
    width: 100%;
    display: block;
    margin: 24px auto;
    border: 1px solid #8e8e8e;
`

export const TweetsContainer = styled.ul`
    max-height: 320px;
    height: 100%;
    overflow-y: scroll;
    padding-right: 8px;

    &::-webkit-scrollbar {
        background-color: #0c0c0c;
        width: 6px;
        border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #14659b;
        border-radius: 8px;
    }
`