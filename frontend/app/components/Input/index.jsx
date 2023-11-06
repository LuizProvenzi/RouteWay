import {
  StyledInput,
  StyledLabel,
  InputWrapper,
  StyledInputWrapper
} from './styles.jsx'
import { Icon, Wrapper } from '../index.jsx'

export default function Input(props) {
  const {
    label,
    placeholder,
    value,
    onChange,
    size,
    fluid,
    width,
    height,
    margin,
    clear,
    onClear,
    disabled,
    noborder,
    corner,
    search,
    onSearch,
    onKeyDown
  } = props

  const defaultProps = {
    fluid: '100%',
    type: 'text',
    margin: '15px',
    corner: 'rounded'
  }

  return (
    <InputWrapper
      size={size}
      width={width ? width : fluid ? defaultProps.fluid : ''}
      margin={margin === 'true' ? defaultProps.margin : margin}
      fluid={fluid && defaultProps.fluid}
    >
      <StyledLabel size={size}>{label}</StyledLabel>
      <StyledInputWrapper
        size={size}
        width={width}
        height={height}
        corner={corner ? corner : defaultProps.corner}
        disabled={disabled}
        noborder={noborder ? 'true' : 'false'}
      >
        <StyledInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          size={size}
          clear={clear && value ? 'true' : 'false'}
          disabled={disabled}
          onKeyDown={onKeyDown}
        />
        {value && clear && (
          <Wrapper onClick={onClear}>
            <Icon name="PiTrashLight" size={14} color="red" />
          </Wrapper>
        )}
        {search && (
          <Wrapper onClick={value.length > 2 && onSearch}>
            <Icon
              name="RiSearch2Line"
              size={16}
              hover={value.length > 2 ? 'primary' : 'lighterGray'}
              color={value.length > 2 ? 'gray' : 'lighterGray'}
            />
          </Wrapper>
        )}
      </StyledInputWrapper>
    </InputWrapper>
  )
}
