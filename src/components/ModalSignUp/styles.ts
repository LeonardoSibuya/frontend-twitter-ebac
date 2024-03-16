import { breakpoints } from "@/styles";
import styled from "styled-components";

export const ModalTitle = styled.h3`
    color: #fff;
    font-size: 24px;
    text-align: center;
    font-family: "Kode Mono", monospace;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;
        position: relative;

        input {
            border-radius: 8px;
            width: 80%;
            padding: 8px;
            text-align: start;
            outline: none;
            border: 2px solid #14659b;
            color: #fff;
            transition: 0.5s ease;
            background-color: transparent;

            &.error {
                border-color: #f50000;
            }

            &.success {
                border-color: #189f38;
            }

            &:focus {
                border: 2px solid #1D9BF0;
                width: 100%;
                transition: 0.5s ease;

                &::placeholder {
                    color: #1D9BF0;
                }
            }

            &::placeholder {
                color: #fff;
                text-align: center;
                font-family: "Kode Mono", monospace;

                @media (max-width: ${breakpoints.tablet}) {
                    font-size: 12px;
                }
            }
        }

        span {
            margin-top: 8px;
            color: #f50000;
            font-size: 10px;
            font-style: italic;
            letter-spacing: 1px;
            text-align: center;
        }
    }
`

export const DivPassword = styled.div`
    margin: 8px 0;
`