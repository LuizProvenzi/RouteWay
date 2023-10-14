import { StyledButton } from './styles.jsx'

export default function Button(props) {
  const {
    width,
    height,
    onClick,
    bgcolor,
    color,
    margin,
    className,
    children,
    disabled,
    size,
    fluid,
    cursor
  } = props

  const defaultProps = {
    fluid: '100%',
    bgcolor: 'primary',
    color: 'white',
    type: 'text',
    margin: 'm15',
    cursor: 'pointer'
  }

  return (
    <StyledButton
      onClick={onClick}
      width={width ? width : fluid ? defaultProps.fluid : ''}
      height={height}
      bgcolor={bgcolor ? bgcolor : defaultProps.bgcolor}
      color={color ? color : defaultProps.color}
      size={size}
      cursor={cursor ? cursor : defaultProps.cursor}
      disabled={disabled}
      fluid={fluid && defaultProps.fluid}
      margin={margin === 'true' ? defaultProps.margin : margin}
      className={className}
    >
      {children}
    </StyledButton>
  )
}
