import styled from 'styled-components'
import {
  fontSizes,
  margins,
  fontWeights,
  colors
} from '@/app/assets/styles.jsx'

export const StyledText = styled.p`
  font-size: ${(props) => fontSizes[props.fontSize]};
  color: ${(props) => colors[props.color]};
  font-weight: ${(props) => fontWeights[props.fontWeight]};
  margin: ${(props) => margins[props.margin]};
  ${(props) =>
    props.truncate &&
    `white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `};
`
