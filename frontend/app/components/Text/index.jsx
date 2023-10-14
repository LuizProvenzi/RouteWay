import { StyledText } from './styles.jsx'

export default function Text(props) {
  const { fontSize, className, margin, children, color, fontWeight, truncate } =
    props

  const defaultProps = {
    fontSize: 'small',
    color: 'altGray',
    fontWeight: '400',
    margin: 'm15'
  }

  return (
    <StyledText
      fontSize={fontSize ? fontSize : defaultProps.fontSize}
      color={color ? color : defaultProps.color}
      fontWeight={fontWeight ? fontWeight : defaultProps.fontWeight}
      margin={margin === 'true' ? defaultProps.margin : margin}
      truncate={truncate}
      className={className}
    >
      {children}
    </StyledText>
  )
}
