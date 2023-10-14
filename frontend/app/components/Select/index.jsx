import ReactSelect from 'react-select'

export default function Select(props) {
  const { options, onChange, placeholder } = props

  return (
    <ReactSelect
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          background: 'hsl(208, 0%, 100%)'
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          background: 'hsl(208, 0%, 100%)',
          color: 'hsl(208, 0%, 8%)'
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused ? 'lightgray' : 'transparent',
          color: state.isSelected ? 'hsl(208, 0%, 8%)' : 'inherit'
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: 'hsl(208, 0%, 8%)'
        })
      }}
    />
  )
}
