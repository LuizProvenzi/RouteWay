import { Map as MapContainer } from 'react-map-gl'
import { useCallback, useState } from 'react'
import { StyledMap } from './styles'

export default function Map(props) {
  const { children, lat, long, zoom, onClick, fixed } = props

  const TOKEN =
    'pk.eyJ1IjoibHVpenByb3ZlbnppIiwiYSI6ImNsanJpZzRqZDBkbHAzbHJ3ajVkbWowZm0ifQ.JNFUo8rkmoMLizF9XNAthg'

  const [viewState, setViewState] = useState({
    latitude: lat,
    longitude: long,
    zoom: zoom,
    attributionControl: false,
    mapboxAccessToken: TOKEN
  })

  const onMove = useCallback(({ viewState }) => {
    const newCenter = viewState
    setViewState(newCenter)
  }, [])

  return (
    <StyledMap width="100%" height="100vh">
      <MapContainer
        onMove={!fixed && onMove}
        {...viewState}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        onClick={onClick}
      >
        {children}
      </MapContainer>
    </StyledMap>
  )
}
