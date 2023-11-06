import styled from 'styled-components'
import { Wrapper } from '@/app/components'
import { layer } from '@/app/assets/styles'

export const RouterContainer = styled(Wrapper)`
  position: absolute;
  top: 6.2rem;
  right: 2.5rem;
  padding: 30px;
`

export const SearchContainer = styled(Wrapper)`
  position: absolute;
  top: 2rem;
  right: 1.4rem;
`

export const IconContainer = styled(Wrapper)`
  margin: 15px 0 0 7px;
`

export const EllipsisContainer = styled(Wrapper)`
  margin: 11px 0;
  gap: 5px;
`

export const FooterContainer = styled(Wrapper)`
  margin: 15px 17px 10px 7px;
`

export const LocationsContainer = styled(Wrapper)`
  margin-top: 5px;
  background-color: ${(props) =>
    props.theme.title === 'light' ? props.theme.white : props.theme.altDefault};
`

export const Options = styled(Wrapper)`
  &:hover {
    background-color: ${(props) =>
      props.theme.title === 'light'
        ? props.theme.altWhite
        : props.theme.default};
  }
`

export const StyledInputPoints = styled(Wrapper)`
  margin-right: ${(props) => props.spacement};
`

export const BackIcon = styled(Wrapper)`
  position: absolute;
`

export const DetailsIcon = styled(Wrapper)`
  margin-right: 5px;
`

export const DetailsContainer = styled(Wrapper)`
  padding: 5px 0;
`

export const Gradient = styled(Wrapper)`
  position: absolute;
  z-index: ${layer.z1};
  height: 40px;
  width: 95%;
`

export const TopGradient = styled(Gradient)`
  background: ${(props) =>
    `linear-gradient(
      to top,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 1%,
      ${props.theme.default} 60%,
      ${props.theme.default} 100%
  );`};
`

export const BottomGradient = styled(Gradient)`
  bottom: 0;
  background: ${(props) =>
    `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 1%,
      ${props.theme.default} 60%,
      ${props.theme.default} 100%
  );`};
`
