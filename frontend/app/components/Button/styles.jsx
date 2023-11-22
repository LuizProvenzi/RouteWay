import styled from 'styled-components'
import { corners, fontSizes, margins, colors } from '@/app/assets/styles'

export const StyledButton = styled.button`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin: ${(props) => margins[props.margin]};
  font-size: ${fontSizes.small};
  background-color: ${(props) =>
    props.disabled ? colors.disabled : colors[props.bgcolor]};
  color: ${(props) =>
    props.disabled
      ? colors.title === 'light'
        ? colors.lighterGray
        : colors.black
      : colors[props.color]};
  border: none;
  border-radius: ${corners.rounded};
  cursor: ${(props) => !props.disabled && props.cursor};
  display: ${(props) => props.flexbox};
  flex-direction: ${(props) => props.column};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};

  &:hover {
    filter: ${(props) => !props.disabled && `brightness(0.95)`};
  }

  ${(props) =>
    props.disabled &&
    `
    filter: opacity(0.6);
  `}

  ${(props) =>
    props.loading &&
    `
    display: flex;
    align-items: center;
    justify-content: center;
  `}

  ${(props) =>
    props.size === 'small'
      ? `padding: 8px 15px;`
      : props.size === 'big'
      ? `padding: 15px 20px;`
      : `padding: 10px 15px;`}
`
