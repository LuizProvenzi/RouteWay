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
  height: ${(props) => props.height};
  border-radius: ${(props) => corners[props.corner]};
  width: ${(props) => (props.width ? props.width : '100%')};
  color: ${colors.altGray};
  background-color: ${colors.default};
  border: ${(props) =>
    props.noborder === 'true' ? `1px solid ${colors.default}` : '1px solid'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${(props) =>
    props.size === 'small'
      ? fontSizes.tiny
      : props.size === 'big'
      ? fontSizes.small
      : fontSizes.small};
  padding: ${(props) =>
    props.clear === 'true' ? '0.6rem 1.9rem 0.6rem 0.9rem' : '0.6rem 0.9rem'};
  white-space: nowrap;
  overflow: hidden;
  ${(props) =>
    !props.disabled &&
    `
    &:focus {
      outline: none;
      border: 1px solid ${colors.primary};
    }
    &:hover {
      border: 1px solid ${colors.primary};
    }
    `};
  &::placeholder {
    color: ${colors.lighterGray};
    font-size: ${(props) =>
      props.size === 'small'
        ? fontSizes.tiny
        : props.size === 'big'
        ? fontSizes.small
        : fontSizes.small};
  }
`

export const StyledTrash = styled(Wrapper)`
  position: relative;
  right: 25px;
  margin-top: 9px;
`

export const StyledSearch = styled(Wrapper)`
  position: relative;
  right: 30px;
  margin-top: 12px;
`
