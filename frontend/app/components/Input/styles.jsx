import { fontSizes, corners, margins, colors } from '@/app/assets/styles'
import { Wrapper } from '..'
import styled from 'styled-components'

export const InputWrapper = styled(Wrapper)`
  width: ${(props) => (props.width ? props.width : '100%')};
  display: flex;
  flex-direction: column;
  margin: ${(props) => margins[props.margin]};
  ${(props) =>
    !props.width &&
    !props.fluid &&
    `max-width: ${
      props.size === 'small'
        ? '11rem'
        : props.size === 'big'
        ? '15rem'
        : '13rem'
    }`}
`

export const StyledLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: ${(props) =>
    props.size === 'small'
      ? fontSizes.tiny
      : props.size === 'big'
      ? fontSizes.small
      : fontSizes.tiny};
  color: ${colors.altGray};
  margin-bottom: 4px;
  display: flex;
`

export const StyledInput = styled.input`
  width: ${(props) => (props.width ? props.width : '100%')};
  color: ${colors.altGray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: transparent;
  outline: none;
  font-size: ${fontSizes.small};
  white-space: nowrap;
  overflow: hidden;
  border-radius: ${(props) => corners[props.corner]};
  background-color: ${colors.white};
  border: none;
  &::placeholder {
    color: ${colors.lighterGray};
  }
`

export const StyledInputWrapper = styled(Wrapper)`
  display: flex;
  align-items: center;
  padding: ${(props) =>
    props.clear === 'true' ? '0.6rem 1.9rem 0.6rem 0.9rem' : '0.6rem 0.9rem'};
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) =>
    props.height
      ? props.height
      : props.size === 'small'
      ? '2rem'
      : props.size === 'big'
      ? '2.5rem'
      : props.size === 'large'
      ? '2.75rem'
      : '2.3rem'};
  border-radius: ${(props) => corners[props.corner]};
  background-color: ${colors.white};
  border: ${`1px solid ${colors.lighterGray}`};
  ${(props) =>
    !props.disabled &&
    `
    &:hover {
      border: 1px solid ${colors.primary};
    }
    `};
`
