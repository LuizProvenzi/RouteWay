import styled from 'styled-components'
import { Wrapper } from '@/app/components'

export const StyledContainer = styled(Wrapper)`
  flex-wrap: wrap;
`

export const StyledCard = styled(Wrapper)`
  width: calc(25% - 20px);
  margin: 0 10px 18px;
  @media (max-width: 1366px) {
    width: calc(33% - 20px);
  }
  @media (max-width: 1010px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 700px) {
    width: calc(100% - 20px);
  }
`
