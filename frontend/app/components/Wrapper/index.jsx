import { StyledDiv } from './styles.jsx'

export default function Wrapper(props) {
  const {
    align,
    justify,
    column,
    flexbox,
    height,
    width,
    maxWidth,
    truncate,
    overflow,
    position,
    bgcolor,
    bordercolor,
    border,
    corner,
    margin,
    padding,
    children,
    size,
    onClick,
    className,
    zIndex,
    gap,
    wrap,
    onMouseEnter,
    onMouseLeave,
    style
  } = props

  const defaultProps = {
    column: 'column',
    flexbox: 'flex',
    border: 'default',
    bordercolor: 'lighterGray',
    corner: 'form',
    margin: 'm15',
    padding: 'p15',
    zIndex: 'z1'
  }

  return (
    <StyledDiv
      align={align}
      justify={justify}
      column={column && defaultProps.column}
      flexbox={flexbox && defaultProps.flexbox}
      height={height}
      width={width}
      maxWidth={maxWidth}
      truncate={truncate}
      overflow={overflow}
      position={position}
      bgcolor={bgcolor}
      bordercolor={bordercolor ? bordercolor : defaultProps.bordercolor}
      border={border === true ? defaultProps.border : border}
      corner={corner === true ? defaultProps.corner : corner}
      margin={margin === true ? defaultProps.margin : margin}
      padding={padding === true ? defaultProps.padding : padding}
      zIndex={zIndex === true ? defaultProps.zIndex : zIndex}
      size={size}
      gap={gap}
      wrap={wrap}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </StyledDiv>
  )
}
