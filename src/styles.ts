"use client"

import styled, { createGlobalStyle } from 'styled-components'

// export const Colors = {
//     background: '#EEF0F4',
    
//     lightBlue: '#B9E5FD',
//     lightGray: '#C5C5C5',

//     cyan: '#88FDB6',
//     yellow: '#e9ff1a',
//     gray: '#878787',
//     white: '#fff',
//     black: '#000',
//     blue: '#0CA4EB',

//     darkBlue: '#155EE3',
// }

export const breakpoints = {
    tablet: '1024px',
    celphone: '760px'
}

const EstiloGlobal = createGlobalStyle`
  * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        font-family: 'Inter', sans-serif;
    }
`
export default EstiloGlobal

export const Container = styled.div`
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: ${breakpoints.tablet}) {
        max-width: 95%;
    }
`
