'use client'
import {
  Map,
  Wrapper,
  Icon,
  Input,
  Text,
  Select,
  Button
} from '@/app/components'
import { useEffect, useState, useRef } from 'react'
import { Marker, Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {
  BackIcon,
  DetailsIcon,
  EllipsisContainer,
  FooterContainer,
  IconContainer,
  LocationsContainer,
  Options,
  RouterContainer,
  SearchContainer,
  StyledInputPoints,
  DetailsContainer
} from './styles'
import checkered from '../../../public/images/checkered.png'
import Image from 'next/image'
import { toast } from 'react-toastify'

export default function Routerizer() {
  const [places, setPlaces] = useState(null)
  const [initialPoint, setInitialPoint] = useState(null)
  const [count, setCount] = useState(0)
  const [points, setPoints] = useState(null)
  const [waypoints, setWaypoints] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
  const [search, setSearch] = useState('')
  const [locations, setLocations] = useState([])
  const [focus, setFocus] = useState({ lat: -28.26278, long: -52.40667 })
  const [routeCreated, setRouteCreated] = useState(false)
  const [routeName, setRouteName] = useState('')
  const [summary, setSummary] = useState('')
  const [time, setTime] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    setWaypoints([])
    setCount(0)
    setPoints(null)
  }, [selectedOption])

  async function getRoute() {
    if (selectedOption === 'sequential') {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${places}?geometries=geojson&steps=true&language=pt-BR&access_token=pk.eyJ1IjoibHVpenByb3ZlbnppIiwiYSI6ImNsanJpZzRqZDBkbHAzbHJ3ajVkbWowZm0ifQ.JNFUo8rkmoMLizF9XNAthg`
        )

        const newRoute = await response.json()

        const hours = Math.floor(newRoute.routes[0].duration / 3600)
        const minutes = Math.floor((newRoute.routes[0].duration % 3600) / 60)
        const secondsRemaining = newRoute.routes[0].duration % 60

        let time = ''

        if (hours > 0) {
          time += `${hours}h`
        }

        if (minutes > 0) {
          time += `${minutes.toString().padStart(2, '0')}m`
        }

        if (hours === 0 && minutes === 0) {
          time += `${secondsRemaining}s`
        }

        setTime(time)
        setSummary(newRoute.routes[0])
        setRouteCreated(true)
        setPoints(newRoute.routes[0].geometry.coordinates)
      } catch (error) {
        toast.error('Não foi possível criar uma rota.')
      }
    } else if (selectedOption === 'optimized') {
      try {
        const response = await fetch(
          `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${places}?source=first&destination=last&roundtrip=false&steps=true&geometries=geojson&language=pt-BR&access_token=pk.eyJ1IjoibHVpenByb3ZlbnppIiwiYSI6ImNsanJpZzRqZDBkbHAzbHJ3ajVkbWowZm0ifQ.JNFUo8rkmoMLizF9XNAthg`
        )

        const newRoute = await response.json()

        const hours = Math.floor(newRoute.trips[0].duration / 3600)
        const minutes = Math.floor((newRoute.trips[0].duration % 3600) / 60)
        const secondsRemaining = newRoute.trips[0].duration % 60

        let time = ''

        if (hours > 0) {
          time += `${hours}h`
        }

        if (minutes > 0) {
          time += `${minutes.toString().padStart(2, '0')}m`
        }

        if (hours === 0 && minutes === 0) {
          time += `${secondsRemaining}s`
        }

        setTime(time)
        setPoints(newRoute.trips[0].geometry.coordinates)
        setSummary(newRoute.trips[0])
        setRouteCreated(true)
      } catch (error) {
        toast.error('Não foi possível criar uma rota.')
      }
    }
  }

  async function getLocation() {
    const formatedValue = search.trim().replace(/\s+/g, '+')

    try {
      const response = await fetch(
        `https://maps.myfleetonroad.com/api/search?q=${formatedValue}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer rSJ36eTCRxMevBaVrcWIJzjDti7nDkXtIf61Yf11'
          }
        }
      )

      if (!response.ok) {
        toast.error('Não foi possível encontrar o local.')
      }

      const newLocations = await response.json()

      const locationsFormated = newLocations.map((e) => {
        return {
          display_name: e.display_name,
          lat: e.lat,
          lon: e.lon
        }
      })

      setLocations(locationsFormated)
    } catch (error) {
      toast.error('Não foi possível encontrar o local.')
    }
  }

  function MapClick(data) {
    if (count === 0) {
      setInitialPoint(data.lngLat.lng + ',' + data.lngLat.lat)
      setWaypoints([
        {
          long: data.lngLat.lng,
          lat: data.lngLat.lat
        }
      ])
      setCount(count + 1)
    } else if (count === 1) {
      setPlaces(initialPoint + ';' + data.lngLat.lng + ',' + data.lngLat.lat)
      setCount(count + 1)
      setWaypoints([
        ...waypoints,
        { long: data.lngLat.lng, lat: data.lngLat.lat }
      ])
    } else if (selectedOption === 'sequential') {
      if (waypoints.length !== 25) {
        setCount(count + 1)
        setPlaces(places + ';' + data.lngLat.lng + ',' + data.lngLat.lat)
        setWaypoints([
          ...waypoints,
          { long: data.lngLat.lng, lat: data.lngLat.lat }
        ])
      }
    } else {
      if (waypoints.length !== 12) {
        setCount(count + 1)
        setPlaces(places + ';' + data.lngLat.lng + ',' + data.lngLat.lat)
        setWaypoints([
          ...waypoints,
          { long: data.lngLat.lng, lat: data.lngLat.lat }
        ])
      }
    }
  }

  function removeWaypoint(index) {
    const newWaypoints = [...waypoints]
    newWaypoints.splice(index, 1)

    setWaypoints(newWaypoints)
    setCount(count - 1)
  }

  function removeLastWaypoint() {
    const newWaypoints = [...waypoints]
    newWaypoints.pop()
    setCount(count - 1)
    setWaypoints(newWaypoints)
  }

  function removeFirstWaypoint() {
    const newWaypoints = [...waypoints]
    newWaypoints.shift()
    setCount(count - 1)
    setWaypoints(newWaypoints)
  }

  const data = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: points
    }
  }

  const dataLayer = {
    id: 'routearrows',
    type: 'symbol',
    source: 'route',
    layout: {
      'symbol-placement': 'line',
      'text-field': '▶',
      'text-size': ['interpolate', ['linear'], ['zoom'], 12, 24, 22, 60],
      'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 12, 30, 22, 160],
      'text-keep-upright': false
    },
    paint: {
      'text-color': '#03fc84',
      'text-halo-color': 'hsl(55, 11%, 96%)',
      'text-halo-width': 3
    }
  }

  const lineLayer = {
    id: 'routeline-active',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': 'hsl(208, 98%, 48%)',
      'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12]
    }
  }

  const typeOptions = [
    { value: 'optimized', label: 'Otimizada' },
    { value: 'sequential', label: 'Sequencial' }
  ]

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption.value)
  }

  function handleSearch(value) {
    setSearch(value)
  }

  function handleName(value) {
    setRouteName(value)
  }

  function boundsLocation(value) {
    setFocus({ lat: value.lat, long: value.lon })
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setLocations([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Wrapper flexbox>
      <Map
        lat={focus.lat && focus.lat}
        long={focus.long && focus.long}
        zoom="13"
        flex
        onClick={selectedOption && MapClick}
      >
        {points !== null && (
          <Source type="geojson" data={data}>
            <Layer {...lineLayer} />
            <Layer {...dataLayer} />
          </Source>
        )}

        {waypoints &&
          waypoints.map(
            (e, i) =>
              e.lat &&
              e.long && (
                <>
                  {i === 0 ? (
                    <Marker
                      longitude={e.long}
                      latitude={e.lat}
                      anchor={'center'}
                      key={i}
                    >
                      <Wrapper
                        flexbox
                        bgcolor="white"
                        width="1.2rem"
                        height="1.2rem"
                        corner="circle"
                        align="center"
                        justify="center"
                      >
                        <Wrapper
                          bgcolor="green"
                          width="0.8rem"
                          height="0.8rem"
                          corner="circle"
                        />
                      </Wrapper>
                    </Marker>
                  ) : (
                    <>
                      {i === waypoints.length - 1 ? (
                        <Marker
                          longitude={e.long}
                          latitude={e.lat}
                          anchor={'center'}
                          key={i}
                        >
                          <Wrapper
                            flexbox
                            bgcolor="white"
                            width="1.2rem"
                            height="1.2rem"
                            corner="circle"
                            align="center"
                            justify="center"
                          >
                            <Image
                              src={checkered}
                              width={14}
                              style={{ borderRadius: '50%' }}
                              alt={'Point'}
                            />
                          </Wrapper>
                        </Marker>
                      ) : (
                        <Marker
                          longitude={e.long}
                          latitude={e.lat}
                          anchor={'center'}
                          key={i}
                        >
                          <Wrapper
                            flexbox
                            bgcolor="white"
                            width="1.5rem"
                            height="1.5rem"
                            corner="circle"
                            align="center"
                            justify="center"
                          >
                            <Wrapper
                              bgcolor="primary"
                              width="1.2rem"
                              height="1.2rem"
                              corner="circle"
                            >
                              <Text fontSize="tiny" color="white">
                                {i}
                              </Text>
                            </Wrapper>
                          </Wrapper>
                        </Marker>
                      )}
                    </>
                  )}
                </>
              )
          )}

        <div ref={containerRef}>
          <SearchContainer flexbox column>
            <Wrapper flexbox align="center" justify="center" width="23.1rem">
              <Input
                fluid
                placeholder="Encontre o local desejado"
                value={search}
                noborder
                onChange={(event) => handleSearch(event.target.value)}
                height="2.7rem"
                corner="rounded"
                search
                onSearch={() => getLocation()}
              />
            </Wrapper>

            {locations.length > 0 && (
              <LocationsContainer
                width="22rem"
                zIndex="z2"
                padding="p10"
                corner="rounded"
              >
                {locations.map(
                  (e, i) =>
                    i < 3 && (
                      <Options
                        padding="p10"
                        key={i}
                        onClick={() => boundsLocation(e)}
                        corner="form"
                      >
                        <Text noTranslate fontSize="small" truncate>
                          {e.display_name}
                        </Text>
                      </Options>
                    )
                )}
              </LocationsContainer>
            )}
          </SearchContainer>
        </div>

        <RouterContainer
          bgcolor="default"
          height="84%"
          width="22rem"
          corner="rounded"
          flexbox
          column
        >
          {routeCreated ? (
            <>
              <BackIcon onClick={() => setRouteCreated(false)}>
                <Icon
                  name="MdOutlineArrowBackIosNew"
                  size={18}
                  hover="primary"
                />
              </BackIcon>
              <Wrapper flexbox align="center" justify="center" margin="bottom">
                <Text fontSize="large">Cadastrar rota</Text>
              </Wrapper>
              <Wrapper flexbox align="center" justify="center" margin="top">
                <Input
                  fluid
                  placeholder="Insira o nome da rota"
                  value={routeName}
                  onChange={(event) => handleName(event.target.value)}
                />
              </Wrapper>
              <Wrapper
                column
                margin="t30"
                flexbox
                justify="center"
                align="center"
              >
                <Text fontSize="normal" fontWeight="bold">
                  Detalhes
                </Text>
                <Wrapper
                  flexbox
                  margin="top"
                  justify="space-between"
                  align="center"
                  width="10rem"
                >
                  <Wrapper flexbox>
                    <DetailsIcon>
                      <Icon name="RiTimerLine" size={18} />
                    </DetailsIcon>
                    {time}
                  </Wrapper>
                  <Wrapper flexbox>
                    <DetailsIcon>
                      <Icon name="RiRouteLine" size={18} />
                    </DetailsIcon>
                    {(summary.distance / 1000).toFixed() + ' km'}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  position="relative"
                  padding="right"
                  margin="left"
                  overflow="auto"
                  height="30.5rem"
                  width="18rem"
                >
                  {summary.legs.map((e, i) => (
                    <Wrapper key={i} padding="p5">
                      {e.steps.map((step, index) => (
                        <DetailsContainer
                          key={index}
                          flexbox
                          border="bottom"
                          bordercolor="altDefault"
                        >
                          <DetailsIcon>
                            <Icon
                              name={
                                step.maneuver.instruction.includes('Vire') &&
                                step.maneuver.instruction.includes('esquerda')
                                  ? 'RiArrowLeftLine'
                                  : step.maneuver.instruction.includes(
                                      'Vire'
                                    ) &&
                                    step.maneuver.instruction.includes(
                                      'direita'
                                    )
                                  ? 'RiArrowRightLine'
                                  : step.maneuver.instruction.includes(
                                      'chegou'
                                    ) ||
                                    step.maneuver.instruction.includes(
                                      'destino'
                                    )
                                  ? 'RiMapPin3Fill'
                                  : 'RiArrowUpLine'
                              }
                              size={18}
                            />
                          </DetailsIcon>
                          <Text truncate fontSize="small">
                            {step.maneuver.instruction}
                          </Text>
                        </DetailsContainer>
                      ))}
                    </Wrapper>
                  ))}
                </Wrapper>
              </Wrapper>
              <Wrapper flexbox margin="top" align="flex-end" justify="flex-end">
                <Button
                  fluid
                  onClick={() => toast.error('Não foi possivel salvar a rota.')}
                >
                  Salvar rota
                </Button>
              </Wrapper>
            </>
          ) : (
            <>
              <Wrapper flexbox align="center" justify="center" margin="bottom">
                <Text fontSize="large">Roterizador</Text>
              </Wrapper>
              <Wrapper flexbox align="center" justify="center" margin="top">
                <Text fontSize="normal">
                  Selecione um tipo de rota para começar.
                </Text>
              </Wrapper>
              <Wrapper margin="vertical">
                <Select
                  size="small"
                  options={typeOptions}
                  onChange={handleSelectChange}
                  placeholder="Tipo de rota"
                />
              </Wrapper>
              <Wrapper flexbox column height="34rem" overflow="auto">
                <Wrapper flexbox>
                  <IconContainer flexbox column align="center">
                    <Wrapper>
                      <Wrapper
                        flexbox
                        border
                        corner="circle"
                        height="0.8rem"
                        width="0.8rem"
                      />
                    </Wrapper>

                    {waypoints &&
                      waypoints.map(
                        (e, i) =>
                          i !== 0 &&
                          i !== waypoints.length - 1 && (
                            <>
                              {i >= 1 && (
                                <EllipsisContainer flexbox column>
                                  <Wrapper
                                    flexbox
                                    border
                                    corner="circle"
                                    width="0.2rem"
                                    height="0.2rem"
                                    bgcolor="gray"
                                  />
                                  <Wrapper
                                    flexbox
                                    border
                                    corner="circle"
                                    width="0.2rem"
                                    height="0.2rem"
                                    bgcolor="gray"
                                  />
                                  <Wrapper
                                    flexbox
                                    border
                                    corner="circle"
                                    width="0.2rem"
                                    height="0.2rem"
                                    bgcolor="gray"
                                  />
                                </EllipsisContainer>
                              )}
                              <Wrapper>
                                <Wrapper
                                  key={i}
                                  flexbox
                                  border
                                  corner="circle"
                                  height="0.8rem"
                                  width="0.8rem"
                                />
                              </Wrapper>
                            </>
                          )
                      )}

                    <EllipsisContainer flexbox column>
                      <Wrapper
                        flexbox
                        border
                        corner="circle"
                        width="0.2rem"
                        height="0.2rem"
                        bgcolor="gray"
                      />
                      <Wrapper
                        flexbox
                        border
                        corner="circle"
                        width="0.2rem"
                        height="0.2rem"
                        bgcolor="gray"
                      />
                      <Wrapper
                        flexbox
                        border
                        corner="circle"
                        width="0.2rem"
                        height="0.2rem"
                        bgcolor="gray"
                      />
                    </EllipsisContainer>
                    <Icon name="PiMapPinThin" size={18} />
                  </IconContainer>

                  <Wrapper flexbox column gap="g15" width="86%" margin="left">
                    <StyledInputPoints
                      spacement={waypoints.length === 0 && '18px'}
                    >
                      <Input
                        fluid
                        placeholder="Insira o ponto inical"
                        disabled={!selectedOption}
                        value={
                          waypoints && waypoints.length > 0
                            ? waypoints[0].lat + ', ' + waypoints[0].long
                            : ''
                        }
                        clear
                        onClear={() => removeFirstWaypoint()}
                      />
                    </StyledInputPoints>
                    {waypoints &&
                      waypoints.map(
                        (e, i) =>
                          i !== 0 &&
                          i !== waypoints.length - 1 && (
                            <StyledInputPoints
                              key={i}
                              spacement={!e.lat && !e.long && '18px'}
                            >
                              <Input
                                fluid
                                placeholder="Insira o local de partida"
                                value={
                                  e.lat && e.long ? e.lat + ', ' + e.long : ''
                                }
                                clear
                                onClear={() => removeWaypoint(i)}
                              />
                            </StyledInputPoints>
                          )
                      )}
                    <StyledInputPoints
                      spacement={waypoints && waypoints.length < 2 && '18px'}
                    >
                      <Input
                        fluid
                        disabled={!selectedOption}
                        placeholder="Insira o local de chegada"
                        value={
                          waypoints && waypoints.length >= 2
                            ? waypoints[waypoints.length - 1].lat +
                              ', ' +
                              waypoints[waypoints.length - 1].long
                            : ''
                        }
                        clear
                        onClear={() => removeLastWaypoint()}
                      />
                    </StyledInputPoints>
                  </Wrapper>
                </Wrapper>
                <FooterContainer flexbox justify="flex-end">
                  {selectedOption && (
                    <Text noTranslate>
                      {selectedOption === 'optimized'
                        ? count + '/12'
                        : count + '/25'}
                    </Text>
                  )}
                </FooterContainer>
              </Wrapper>
              <Wrapper flexbox margin="top" align="flex-end" justify="flex-end">
                <Button
                  fluid
                  onClick={getRoute}
                  disabled={waypoints && waypoints.length > 2 ? false : true}
                >
                  Criar rota
                </Button>
              </Wrapper>
            </>
          )}
        </RouterContainer>
      </Map>
    </Wrapper>
  )
}
