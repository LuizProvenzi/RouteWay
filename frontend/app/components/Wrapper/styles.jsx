import styled from 'styled-components'
import {
  corners,
  margins,
  paddings,
  layer,
  borders,
  gaps,
  colors
} from '@/app/assets/styles.jsx'

export const StyledDiv = styled.div`
  padding: ${(props) => paddings[props.padding]};
  margin: ${(props) => margins[props.margin]};
  border-radius: ${(props) => corners[props.corner]};
  background-color: ${(props) => colors[props.bgcolor]};
  z-index: ${(props) => layer[props.zIndex]};
  ${(props) =>
    props.border &&
    `border-width: ${borders[props.border]};
    border-style: solid;
    border-color: ${colors[props.bordercolor]};`};
  position: ${(props) => props.position};
  overflow: ${(props) => props.overflow};
  ${(props) =>
    props.truncate &&
    `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  display: ${(props) => props.flexbox};
  flex-direction: ${(props) => props.column};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  gap: ${(props) => gaps[props.gap]};
  flex-wrap: ${(props) => props.wrap && 'wrap'};
  ${(props) => props.onClick && `cursor: pointer;`}
`
