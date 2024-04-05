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
`

export const ChatContainer = styled.div`
    width: 80%;
    height: 90vh;
    position: relative;

    .imageChat {
        margin: 240px auto 0;
        width: 240px;
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