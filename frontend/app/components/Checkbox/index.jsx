import { StyledCheckbox } from './styles.jsx'

export default function Checkbox({
  size,
  margin,
  onChange,
  checked,
  className,
  children,
  ...props
}) {
  return (
    <StyledCheckbox
      {...props}
      type="checkbox"
      size={size}
      margin={margin}
      className={className}
      onChange={onChange}
      checked={checked}
    >
      {children}
    </StyledCheckbox>
  )
}
