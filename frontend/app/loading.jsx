'use client'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  div {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
  }
`

const Loading = () => {
  return (
    <LoadingWrapper>
      <div></div>
    </LoadingWrapper>
  )
}

export default Loading
