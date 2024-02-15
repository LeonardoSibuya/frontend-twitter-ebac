import styled from "styled-components";

export const ModalTitle = styled.h3`
    color: #fff;
    font-size: 24px;
    text-align: center;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    input {
        border-radius: 8px;
        width: 80%;
        padding: 8px;
        text-align: start;
        outline: none;
        border: 2px solid transparent;

        &:focus {
            border: 2px solid #1D9BF0;

            &::placeholder {
                color: #1D9BF0;
            }
        }

        &::placeholder {
            letter-spacing: 1px;
            text-align: center;
        }
    }
`