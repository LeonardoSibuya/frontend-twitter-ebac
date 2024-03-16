import { breakpoints } from "@/styles"
import styled from "styled-components"

export const MainContent = styled.main`
    padding: 24px 80px;

    display: flex;
    align-items: start;
    justify-content: left;
    gap: 40px;
    background-color: #000;
    height: 100vh;
    position: relative;

    @media (max-width: ${breakpoints.tablet}) {
        padding: 24px 40px;
    }

    @media (max-width: ${breakpoints.celphone}) {
        gap: 20px;
        padding: 24px 20px;
    }
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
            font-size: 18px;
        }
    }

    @media (max-width: ${breakpoints.tablet}) {
        width: 30%;
        padding-right: 24px;
    }

    @media (max-width: ${breakpoints.celphone}) {
        width: 26%;
        padding-right: 16px;
        padding-top: 24px;

        h1 {
            font-size: 14px;
        }

    }
`

export const ButtonSearchUser = styled.button`
    background-color: #14659b;
    color: #878787;
    border-radius: 32px;
    padding: 4px;
    font-weight: bold;
    font-size: 8px;
    text-transform: uppercase;

    &:hover {
        color: #fff;
    }

    &:active {
        background-color: #11507a;
    }

    @media (max-width: ${breakpoints.celphone}) {
        padding: 2px;
        font-size: 6px;
    }
`

export const ButtonMobile = styled.button`
    display: none;

    @media (max-width: ${breakpoints.celphone}) {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        margin: 12px 20px;
    }
`

export const AsideMobile = styled.aside`
    display: none;

    @media (max-width: ${breakpoints.celphone}) {
        display: block;
        padding-right: 16px;
        padding-top: 24px;
        height: 90vh;
        color: #fff;
        width: 10%;
        border-right: 1px solid #878787;

        h1 {
            font-size: 32px;
            font-weight: bolder;
            font-family: "Kode Mono", monospace;
            letter-spacing: 1px;
            color: #14659b;

            span {
                font-style: italic;
                font-size: 18px;
            }
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
        border: 1px solid transparent;

        input {
            font-size: 14px;
            font-family: "Kode Mono", monospace;
            background-color: transparent;
            width: 60%;
            color: #fff;
            cursor: pointer;

            &:hover {
                border-bottom: 1px solid #fff;
                transition: 0.5s ease;
                letter-spacing: 0.2px;
            }

            &:focus {
                outline: none;
                border: 1px solid #14659b;
                border-radius: 24px;
                padding: 4px 12px;
                cursor: text;
                width: 60%;

                &::placeholder {
                    color: transparent;
                }
            }

            &::placeholder {
                color: #fff;
                font-size: 18px;
            }
        }

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

    @media (max-width: ${breakpoints.celphone}) {
        margin-bottom: 60px;

        li {
            a {
                font-size: 10px;

                &:hover {
                    letter-spacing: 0;
                    border-bottom: none;
                }
            }

            input {
                font-size: 10px;
                width: 100%;
                border: 1px solid transparent;

                &:hover {
                    border-bottom: none;
                    transition: 0.5s ease;
                    letter-spacing: 0;
                }

                &:focus {
                    padding: 4px;
                    width: 100%;
                }

                &::placeholder {
                    color: #fff;
                    font-size: 10px;
                }
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

    @media (max-width: ${breakpoints.celphone}) {
        a {
            font-size: 10px;

            &:hover {
                letter-spacing: 0;
                border-bottom: none;
            }
        }
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

    @media (max-width: ${breakpoints.celphone}) {
        font-size: 12px;

        &:hover {
            letter-spacing: 0;
        }
    }
`

export const HomePageSection = styled.section`
    margin: 0 auto;
    width: 90%;

    &.mobile {
        width: 90%;
    }

    h2 {
        text-align: center;
        font-size: 40px;
        font-family: "Kode Mono", monospace;
        color: #fff;
        font-weight: bold;
        letter-spacing: 2px;
    }

    @media (max-width: ${breakpoints.celphone}) {
        width: 80%;

        &.mobile {
            width: 70%;
        }

        h2 {
            font-size: 32px;
        }
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
        border-radius: 50%;
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
            color: #fff;
        }

        &:active {
            background-color: #11507a;
        }
    }

    @media (max-width: ${breakpoints.celphone}) {
        gap: 16px;
        margin: 16px 0;
        padding: 12px 0;

        img {
            height: 24px;
            width: 24px;
        }

        textarea {
            padding: 8px;
            padding-top: 16px;

            &::placeholder {
                font-size: 12px;
            }
        }

        button {
            font-size: 10px;
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

    @media (max-width: ${breakpoints.celphone}) {
        max-height: 430px;
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