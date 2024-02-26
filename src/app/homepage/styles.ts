import styled from "styled-components"

export const MainContent = styled.main`
    padding: 24px 80px;

    display: flex;
    align-items: start;
    justify-content: left;
    gap: 40px;
    background-color: #000;
    height: 100vh;
`

export const Aside = styled.aside`
    height: 90vh;
    color: #fff;
    width: 16%;
    border-right: 1px solid #878787;

    h1 {
        font-size: 32px;
        font-weight: bolder;
        font-family: "Kode Mono", monospace;
        letter-spacing: 1px;
        color: #14659b;

        span {
            font-style: italic;
            font-size: 28px;
        }
    }
`

export const ListLinks = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 16px;
    margin: 32px 0 160px;

    li {
        display: flex;
        align-items: center;
        gap: 8px;

        a {
            font-size: 18px;
            font-family: "Kode Mono", monospace;

            &:hover {
                border-bottom: 1px solid #fff;
                transition: 0.5s ease;
                letter-spacing: 0.2px;
            }
        }
    }
`

export const ProfileDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 8px;

    a {
        font-family: "Kode Mono", monospace;
        font-size: 16px;
        color: #14659b;

        &:hover {
            border-bottom: 1px solid #14659b;
            letter-spacing: 0.2px;
        }
    }

    img {
        width: 24px;
        height: 24px;
    }
`

export const ButtonLogout = styled.button`
    margin-top: 40px;
    background-color: none;
    color: #fff;
    font-size: 16px;
    font-family: "Kode Mono", monospace;

    &:hover {
            color: #14659b;
            letter-spacing: 0.2px;
        }
`

export const HomePageSection = styled.section`
    margin: 0 auto;
    width: 90%;

    h2 {
        text-align: center;
        font-size: 40px;
        font-family: "Kode Mono", monospace;
        color: #fff;
        font-weight: bold;
        letter-spacing: 2px;
    }
`

export const CreatePostDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin: 24px 0;
    border-top: 1px solid #878787;
    border-bottom: 1px solid #878787;
    padding: 16px 0;

    img {
        width: 32px;
        height: 32px;
    }

    textarea {
        background-color: transparent;
        outline: none;
        padding: 12px 12px 0;
        color: #ccc;
        width: 390px;
        border: 2px solid transparent;
        border-radius: 16px;
        resize: none;

        &::-webkit-scrollbar {
            background-color: #0c0c0c;
            width: 6px;
            border-radius: 8px;
            padding: 16px 0;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #14659b;
            border-radius: 8px;
        }

        &::placeholder {
            text-align: center;
        }

        &:hover {
            &::placeholder {
                color: #fff;
            }
        }

        &:focus {
            border: 2px solid #14659b;

            &::placeholder {
                color: #14659b;
            }

            &::-webkit-scrollbar,
            &::-webkit-scrollbar-thumb {
                display: none;
            }
        }
    }

    button {
        background-color: #14659b;
        color: #878787;
        border-radius: 32px;
        padding: 8px 16px;
        font-weight: bold;
        font-size: 12px;
        letter-spacing: 1px;
        text-transform: uppercase;

        &:hover {
            color: #ccc;
        }

        &:active {
            background-color: #11507a;
        }
    }
`

export const TweetsContainer = styled.div`
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

export const LogoffSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #000;
`

export const LogoffDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    p {
        color: #fff;
        letter-spacing: 1px;
        font-size: 24px;
        font-style: italic;
    }
`