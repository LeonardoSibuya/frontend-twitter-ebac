import { breakpoints } from "@/styles"
import styled from "styled-components"

export const Section = styled.section`
    padding: 24px 80px;
    display: flex;
    align-items: start;
    justify-content: left;
    gap: 40px;
    background-color: #000;
    height: 100vh;

    .isCellphone {
        display: none;
    }

    @media (max-width: ${breakpoints.tablet}) {
        padding: 16px;
        max-height: 100vh;

        .isCellphone {
            display: block;
        }
    }
`

export const Aside = styled.aside`
    padding: 32px 16px;
    color: #ccc;
    width: 20%;
    border-right: 1px solid #444444;
    height: 90vh;

    h3 {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 1px;
        font-family: "Kode Mono", monospace;
        margin-bottom: 24px;
    }

    ul {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 24px;
        max-height: 32vh;
        height: 100%;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            background-color: #ccc;
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #14659b;
            width: 4px;
        }

        li {
            padding: 4px;
            border: 2px solid #ccc;
            border-radius: 24px;
            width: 90%;
            font-size: 18px;
            text-align: center;
            letter-spacing: 1px;
            cursor: pointer;
            font-weight: bold;
            transition: 0.2s ease;
            font-family: "Kode Mono", monospace;
            text-transform: capitalize;

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

    input {
        margin-top: 60px;
        width: 100%;
        background-color: transparent;
        border: 2px solid #ccc;
        padding: 6px 12px;
        border-radius: 24px;
        outline: none;
        transition: 0.2s ease;
        text-align: center;

        &::placeholder {
            text-align: center;
        }

        &:hover {
            border: 2px solid #14659b;

            &::placeholder {
                color: #fff;
            }
        }

        &:focus {
            border: 2px solid #14659b;
            box-shadow: 0px 0px 6px #14659b;
            transition: 0.2s ease;

            &::placeholder {
                color: #fff;
                letter-spacing: 1px;
                transition: 0.2s ease;
            }
        }
    }

    @media (max-width: ${breakpoints.tablet}) {
        display: none;
        padding-left: 0;

        &.isOpen {
            display: block;
            width: 100%;
        }

        h3 {
            font-size: 12px;
            text-align: center;
        }

        ul {
            gap: 16px;
            max-height: 20vh;
            padding-right: 8px;

            &::-webkit-scrollbar {
                width: 1px;
            }

            &::-webkit-scrollbar-thumb {
                width: 1px;
            }

            li {
                padding: 2px;
                width: 100%;
                font-size: 12px;
            }
        }

        input {
            margin-top: 24px;
            padding: 6px;
            font-size: 8px;
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
        font-family: "Kode Mono", monospace;

        &:hover {
            transition: 0.2s ease;
            color: #fff;
        }
    }

    @media (max-width: ${breakpoints.tablet}) {
        margin-top: 24px;

        a {
            font-size: 8px;
        }
    }
`

export const ChatContainer = styled.div`
    width: 80%;
    height: 90vh;
    position: relative;

    .imageChat {
        margin: 240px auto 0;
        width: 240px;
    }

    @media (max-width: ${breakpoints.tablet}) {
        display: none;

        &.chatIsOpen {
            width: 100%;
            display: block;

            .imageChat {
                width: 120px;
            }
        }
    }
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

    @media (max-width: ${breakpoints.tablet}) {
        gap: 16px;

        img {
            width: 24px;
            height: 24px;
        }

        span {
            font-size: 16px;
        }
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

        div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        &.receiver {
            border-color: #1188d8;
            border-radius: 24px 24px 24px 8px;
            text-align: left;

            span {
                text-align: right;
                display: block;
            }
        }

        &.sender {
            border-color: #11d68a;
            border-radius: 24px 24px 8px 24px;
            text-align: right;

            span {
                text-align: left;
                display: block;
            }
        }

        span {
            font-size: 10px;
            color: #ccc;
        }
    }

    @media (max-width: ${breakpoints.tablet}) {
        padding: 16px 0 0;
        gap: 16px;

        li {
            padding: 12px;
            width: 100%;
            font-size: 14px;

            span {
                font-size: 8px;
            }
        }
    }
`

export const TextAreaContainer = styled.div`
    position: relative;

    button {
        position: absolute;
        right: 0;
        top: 0;
        margin: 4% 15%;

        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #11d68a;
        padding: 8px;
        color: #fff;
        border-radius: 8px;
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: 0.2s ease;

        &:hover {
            background-color: #0b8e5a;
            transition: 0.2s ease;
        }

        &:active {
            transform: scale(0.9);
            transition: 0.2s ease;
        }

        
    }

    @media (max-width: ${breakpoints.celphone}) {
        width: 100%;
        margin: 32px auto 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;

            button {
                margin: 0;
                position: relative;
                padding: 6px;
                font-size: 18px;
            }
        }
`

export const TextArea = styled.textarea`
    resize: none;
    width: 60%;
    height: 130px;
    margin: 24px auto;
    display: block;
    border-radius: 12px;
    border: 1px solid #ccc;
    background-color: transparent;
    padding: 16px 24px;
    color: #fff;
    font-size: 20px;
    transition: 0.5s ease;

    @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
        height: 100px;
        font-size: 16px;
        margin: 0;
    }

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

        &::placeholder {
            color: #fff;
        }
    }

    &::placeholder {
        font-size: 20px;
        text-align: center;

        @media (max-width: ${breakpoints.tablet}) {
            font-size: 16px;
        }
    }
`