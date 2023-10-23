import {
  StyledInput,
  StyledLabel,
  InputWrapper,
  StyledTrash,
  StyledSearch
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
    onSearch
  } = props

  const defaultProps = {
    fluid: '100%',
    type: 'text',
    margin: 'm15',
    corner: 'form'
  }

  return (
    <InputWrapper
      size={size}
      width={width ? width : fluid ? defaultProps.fluid : ''}
      margin={margin === 'true' ? defaultProps.margin : margin}
      fluid={fluid && defaultProps.fluid}
    >
      <StyledLabel size={size}>{label}</StyledLabel>
      <Wrapper flexbox>
        <StyledInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          size={size}
          width={width}
          height={height}
          clear={clear && value ? 'true' : 'false'}
          disabled={disabled}
          noborder={noborder ? 'true' : 'false'}
          corner={corner ? corner : defaultProps.corner}
        />
        {value && clear && (
          <StyledTrash onClick={onClear}>
            <Icon name="PiTrashLight" size={18} color="red" />
          </StyledTrash>
        )}
        {search && (
          <StyledSearch onClick={onSearch}>
            <Icon name="FiSearch" size={18} hover="primary" color="altGray" />
          </StyledSearch>
        )}
      </Wrapper>
    </InputWrapper>
  )
}
