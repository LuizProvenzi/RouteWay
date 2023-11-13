import { Map as MapContainer } from 'react-map-gl'
import { useCallback, useState } from 'react'
import { StyledMap } from './styles'
import { useEffect } from 'react'

export default function Map(props) {
  const { children, lat, long, zoom, flex, onClick, fixed, corner } = props

  const TOKEN =
    'pk.eyJ1IjoibHVpenByb3ZlbnppIiwiYSI6ImNsanJpZzRqZDBkbHAzbHJ3ajVkbWowZm0ifQ.JNFUo8rkmoMLizF9XNAthg'

  const [viewState, setViewState] = useState({
    latitude: lat,
    longitude: long,
    zoom: zoom ? zoom : '8',
    attributionControl: false,
    mapboxAccessToken: TOKEN
  })

  const onMove = useCallback(({ viewState }) => {
    const newCenter = viewState
    setViewState(newCenter)
  }, [])

  useEffect(() => {
    if (!lat && !long) {
      navigator.geolocation.getCurrentPosition((position) => {
        setViewState({
          latitude: position.coords.latitude
            ? position.coords.latitude
            : '-15.793889',
          longitude: position.coords.longitude
            ? position.coords.longitude
            : '-47.882778',
          zoom: position.coords.longitude ? '12' : zoom,
          attributionControl: false,
          mapboxAccessToken: TOKEN
        })
      })
    } else {
      setViewState({
        latitude: lat,
        longitude: long,
        zoom: zoom,
        attributionControl: false,
        mapboxAccessToken: TOKEN
      })
    }
  }, [lat, long])

  return (
    <StyledMap width="100%" height={flex ? '100vh' : '100%'} corner={corner}>
      <MapContainer
        onMove={!fixed && onMove}
        {...viewState}
        mapStyle={'mapbox://styles/mapbox/streets-v12'}
        onClick={onClick}
      >
        {children}
      </MapContainer>
    </StyledMap>
  )
}
