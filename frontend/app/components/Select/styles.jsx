import styled from 'styled-components'
import { fontSizes, corners, colors } from '@/app/assets/styles'

export const StyledSelect = styled.select`
  padding: 8px 15px;
  border: 1px solid ${colors.lighterGray};
  border-radius: ${corners.form};
  font-size: ${fontSizes.small};
  color: black;
  outline: none;
  width: 100%;
  appearance: none;
`

export const StyledOption = styled.option`
  color: blue !important;
`
