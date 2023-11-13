import ReactSelect from 'react-select'

export default function Select(props) {
  const { options, onChange, placeholder, defaultValue, selectedValue } = props

  return (
    <ReactSelect
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue && options[0]}
      value={options.find((option) => option.value === selectedValue)}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          fontSize: '.7rem',
          width: '17rem',
          textAlign: 'left',
          height: '16px',
          background: 'hsl(208, 0%, 100%)'
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          fontSize: '.7rem',
          textAlign: 'left',
          background: 'hsl(208, 0%, 100%)',
          color: 'hsl(208, 0%, 8%)'
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: '.7rem',
          textAlign: 'left',
          backgroundColor: state.isFocused ? 'lightgray' : 'transparent',
          color: state.isSelected ? 'hsl(208, 0%, 8%)' : 'inherit'
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          fontSize: '.7rem',
          textAlign: 'left',
          color: 'hsl(208, 0%, 8%)'
        })
      }}
    />
  )
}
