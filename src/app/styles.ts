import styled from "styled-components"

import { breakpoints } from "@/styles"

export const LoginContainer = styled.section`
    height: 100vh;
    background-color: #000;
    color: #fff;
`

export const Content = styled.div`
    padding: 60px 0;
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
    }
`

export const SubscribeTitle = styled.h2`
    font-family: "Kode Mono", monospace;
    font-size: 40px;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 32px;

    @media (max-width: ${breakpoints.tablet}) {
        font-size: 28px;
    }
`

export const CreateAccountDiv = styled.div`
    text-align: center;

    p, button {
            width: 30%;
    }

    button {
        padding: 12px;
        margin-bottom: 16px;
        border-radius: 24px;
        border: none;
        font-size: 16px;
        font-family: "Kode Mono", monospace;
        font-weight: bold;
        cursor: pointer;
        letter-spacing: 1px;
        background-color: #1D9BF0;
        color: #fff;

        &:hover {
            background-color: #1a86ce;
            transition: 0.3s;
        }
    }

    p {
        font-size: 10px;
        margin: 0 auto;
        text-align: start;
        color: #8e8e8e;

        span {
            color: #1D9BF0;

            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }

    @media (max-width: ${breakpoints.tablet}) {
        p, button {
            width: 40%;
        }
    }
`

export const AlreadyAccount = styled.div`
    text-align: center;
    margin-top: 40px;

    p, button {
            width: 30%;
    }

    p {
        font-size: 18px;
        font-family: "Kode Mono", monospace;
        margin: 0 auto 16px;
        text-align: start;

        span {
            color: #1D9BF0;

            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }

    button {
        padding: 12px;
        border-radius: 24px;
        border: none;
        font-size: 16px;
        font-family: "Kode Mono", monospace;
        font-weight: bold;
        cursor: pointer;
        letter-spacing: 1px;
        background-color: transparent;
        color: #1d9bf0;
        border: 1px solid #fff;

        &:hover {
            background-color: #081a26;
            transition: 0.3s;
        }
    }

    @media (max-width: ${breakpoints.tablet}) {
        p, button {
            width: 40%;
        }
    }
`