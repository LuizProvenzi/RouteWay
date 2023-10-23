'use client'
import { createGlobalStyle } from 'styled-components'
import { colors } from './assets/styles'

export const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    background-color: ${colors.background};
    color: ${colors.altBlack};
    margin: 0 !important;

ul {
    list-style: none;
}

a {
    text-decoration: none;
}

img {
    max-width: 100%;
    user-select: none;
}

::-webkit-scrollbar {
    width: 7px;
}

::-webkit-scrollbar-thumb {
    background-color: ${colors.lighterGray};
    border-radius: 4px;
}

`
