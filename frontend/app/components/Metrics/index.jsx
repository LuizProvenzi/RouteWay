import { useState, useEffect } from 'react'
import { Text } from '..'

export default function Metrics(props) {
  const { value, type, fontSize } = props

  const [newValue, setNewValue] = useState()

  useEffect(() => {
    if (type === 'distanceMeters') {
      const convertedValue = value / 1000
      setNewValue(`${convertedValue.toFixed()} km`)
    }

    if (type === 'time') {
      const hours = Math.floor(value / 3600)
      const minutes = Math.floor((value % 3600) / 60)
      const secondsRemaining = value % 60

      let result = ''

      if (hours > 0) {
        result += `${hours}h`
      }

      if (minutes > 0) {
        result += `${minutes.toString().padStart(2, '0')}m`
      }

      if (hours === 0 && minutes === 0) {
        result += `${secondsRemaining}s`
      }

      setNewValue(result)
    }
  }, [type, value])

  return (
    <Text
      fontSize={fontSize ? fontSize : 'small'}
      noTranslate={type === 'alert' ? false : true}
    >
      {newValue}
    </Text>
  )
}
