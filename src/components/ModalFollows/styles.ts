import styled from "styled-components"

import { breakpoints } from "@/styles"

export const SectionModal = styled.section`
    button {
        &.buttonModal {
            &:hover {
                background-color: transparent;
                color: #fff;
                transition: 0.5s;
            }

            @media (max-width: ${breakpoints.celphone}) {
                font-size: 12px;
            }
        }
    }
`

export const TitleModal = styled.h3`
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    font-family: "Kode Mono", monospace;
`

export const ListUsers = styled.ul`
    max-height: 300px;
    height: 100%;
    overflow-y: scroll;
    padding-right: 8px;

    &::-webkit-scrollbar {
        background-color: none;
        width: 6px;
        border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: none;
        border-radius: 8px;
    }

    @media (max-width: ${breakpoints.celphone}) {
        max-height: 430px;
    }

    li {
        font-size: 18px;
        letter-spacing: 1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 18px;

        a {
            cursor: pointer;

            &:hover {
                color: #ccc;
            }
        }
    }
`