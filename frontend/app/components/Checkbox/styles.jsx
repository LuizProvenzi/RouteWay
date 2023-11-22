import styled from 'styled-components'
import { margins } from '@/app/assets/styles.jsx'

export const StyledCheckbox = styled.input`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  margin: ${(props) => margins[props.margin]};
`
