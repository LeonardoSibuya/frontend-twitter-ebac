import styled from "styled-components"

export const Section = styled.section`
    padding: 24px 80px;
    display: flex;
    align-items: start;
    justify-content: left;
    gap: 40px;
    background-color: #000;
    height: 100vh;
`

export const Aside = styled.aside`
    padding: 32px 16px;
    color: #ccc;
    width: 20%;
    border-right: 1px solid #444444;
    height: 90vh;

    ul {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 24px;

        li {
            padding: 8px 6px;
            border: 2px solid #ccc;
            border-radius: 24px;
            width: 100%;
            font-size: 18px;
            text-align: center;
            letter-spacing: 1px;
            cursor: pointer;
            font-weight: bold;
            transition: 0.2s ease;

            &:hover {
                color: #14659b;
                transition: 0.2s ease;
                border: 2px solid #14659b;
            }

            &:active {
                background-color: #14659b;
                color: #fff;
                transition: 0.1s ease;
            }
        }
    }
`

export const ListLinks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 16px;
    margin-top: 160px;
    
    a {
        color: #ccc;
        font-size: 18px;
        letter-spacing: 1px;
        display: flex;
        align-items: center;
        gap: 4px;
        transition: 0.2s ease;

        &:hover {
            transition: 0.2s ease;
            color: #fff;
        }
    }
`

export const ChatContainer = styled.div`
    width: 80%;
    height: 90vh;
`

export const ChatProfile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    border-bottom: 1px solid #444444;
    padding-bottom: 16px;

    img {
        width: 54px;
        height: 54px;
    }

    span {
        font-size: 32px;
        color: #fff;
        letter-spacing: 1px;
        font-weight: bold;
        text-transform: uppercase;
    }
`

export const ListMessages = styled.ul`
    padding: 24px 16px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    color: #fff;
    margin: 0 auto;
    max-height: 54vh;
    height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        background-color: transparent;
        width: 0px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }

    li {
        letter-spacing: 1px;
        border: 2px solid;
        padding: 12px 24px;
        width: 600px;
        font-size: 18px;

        &.receiver {
            border-color: #1188d8;
            border-radius: 24px 24px 24px 8px;
            text-align: left;
        }

        &.sender {
            border-color: #11d68a;
            border-radius: 24px 24px 8px 24px;
            text-align: right;
        }
    }
`

export const TextArea = styled.textarea`
    resize: none;
    width: 60%;
    height: 130px;
    margin: 24px auto 0;
    display: block;
    border-radius: 12px;
    border: 1px solid #ccc;
    background-color: transparent;
    padding: 16px 24px;
    color: #fff;
    font-size: 20px;
    transition: 0.5s ease;

    &::-webkit-scrollbar {
        background-color: transparent;
        width: 0px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }

    &:focus {
        border-color: #11d68a;
        outline: none;
        transition: 0.5s ease;
        width: 80%;

        &::placeholder {
            color: #fff;
        }
    }

    &::placeholder {
        font-size: 20px;
        text-align: center;
    }
`