'use client'
import {
  Map,
  Wrapper,
  Icon,
  Input,
  Text,
  Select,
  Button,
  Metrics
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
  DetailsContainer,
  TopGradient,
  BottomGradient
} from './styles'
import checkered from '../../../../public/images/checkered.png'
import Image from 'next/image'
//import apiFetch from '@/app/utils/requests'
import { toast } from 'react-toastify'
//import { useSearchParams } from 'next/navigation'
//import WebMercatorViewport from 'viewport-mercator-project'
import { colors } from '@/app/assets/styles'

export default function Management() {
  const [count, setCount] = useState(0)
  const [points, setPoints] = useState(null)
  const [waypoints, setWaypoints] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
  const [search, setSearch] = useState('')
  const [locations, setLocations] = useState([])
  const [focus, setFocus] = useState(null)
  const [routeCreated, setRouteCreated] = useState(false)
  const [routeName, setRouteName] = useState('')
  const [summary, setSummary] = useState('')
  const [scrollY, setScrollY] = useState(0)
  const [changeCount, setChangeCount] = useState(0)
  const routerContainerRef = useRef(null)
  const containerRef = useRef(null)
  //const searchParams = useSearchParams()

  async function getRoute(type, array, created) {
    if (type === 'sequential') {
      const formattedCoords = array
        .map((e) => `${e.longitude},${e.latitude}`)
        .join(';')

      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${formattedCoords}?geometries=geojson&steps=true&language=pt-BR&access_token=pk.eyJ1IjoibHVpenByb3ZlbnppIiwiYSI6ImNsanJpZzRqZDBkbHAzbHJ3ajVkbWowZm0ifQ.JNFUo8rkmoMLizF9XNAthg`
        )

        const newRoute = await response.json()
        setSummary(newRoute.routes[0])
        setRouteCreated(true)
        setPoints(newRoute.routes[0].geometry.coordinates)

        if (created) {
          setRouteCreated(true)
        }
      } catch (error) {
        toast.error('Não foi possível traçar uma rota.')
      }
    } else if (type === 'optimized') {
      try {
        const formattedCoords = array
          .map((e) => `${e.longitude},${e.latitude}`)
          .join(';')

        const response = await fetch(
          `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${formattedCoords}?source=first&destination=last&roundtrip=false&steps=true&geometries=geojson&language=pt-BR&access_token=pk.eyJ1IjoibHVpenByb3ZlbnppIiwiYSI6ImNsanJpZzRqZDBkbHAzbHJ3ajVkbWowZm0ifQ.JNFUo8rkmoMLizF9XNAthg`
        )

        const newRoute = await response.json()
        setPoints(newRoute.trips[0].geometry.coordinates)
        setSummary(newRoute.trips[0])

        if (created) {
          setRouteCreated(true)
        }
      } catch (error) {
        toast.error('Não foi possível traçar uma rota.')
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
        toast.error('Não foi possível achar o local.')
      }

      const newLocations = await response.json()

      const locationsFormated = newLocations.map((e) => {
        return {
          display_name: e.display_name,
          latitude: e.lat,
          longitude: e.lon
        }
      })

      setLocations(locationsFormated)
    } catch (error) {
      toast.error('Não foi possível achar o local.')
    }
  }

  function MapClick(data) {
    if (count === 0) {
      setWaypoints([
        {
          longitude: data.lngLat.lng,
          latitude: data.lngLat.lat
        }
      ])
      setCount(count + 1)
    } else if (count === 1) {
      setCount(count + 1)
      setWaypoints([
        ...waypoints,
        { longitude: data.lngLat.lng, latitude: data.lngLat.lat }
      ])
    } else if (selectedOption === 'sequential') {
      if (waypoints.length !== 25) {
        setCount(count + 1)
        setWaypoints([
          ...waypoints,
          { longitude: data.lngLat.lng, latitude: data.lngLat.lat }
        ])
      }
    } else {
      if (waypoints.length !== 12) {
        setCount(count + 1)
        setWaypoints([
          ...waypoints,
          { longitude: data.lngLat.lng, latitude: data.lngLat.lat }
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
      'text-color': colors.green,
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
    setLocations([])
    setFocus({ latitude: value.latitude, longitude: value.longitude, zoom: 13 })
  }

  /*const saveRoute = async () => {
    const formatedPoints = (coords) => {
      return coords.map((e) => {
        const [longitude, latitude] = e
        return {
          latitude: latitude,
          longitude: longitude
        }
      })
    }

    const body = {
      name: routeName,
      type: selectedOption,
      cords: formatedPoints(points),
      companyClientBranch: {
        id: 1
      },
      companyClient: {
        id: 1
      },
      places: waypoints,
      time: summary.duration,
      distance: summary.distance,
      isActive: true,
      isDeleted: false
    }
    const id = searchParams.get('id')

    const data = await apiFetch({
      url: `/api/route/insert`,
      method: id ? 'PUT' : 'POST',
      data: body,
      errMessage: 'Não foi possível salvar a rota.'
    })

    if (data) {
      toast.success('Rota salva com sucesso!')
    }

    setCount(0)
    setPoints(null)
    setWaypoints([])
    setSelectedOption('')
    setSearch('')
    setLocations([])
    setFocus([])
    setRouteCreated(false)
    setRouteName('')
    setSummary('')
    setScrollY(0)
  }*/

  /*const applyToArray = (func, array) => func.apply(Math, array)

  const getBoundsForPoints = (points) => {
    const pointsLong = points.map((point) => point.longitude)
    const pointsLat = points.map((point) => point.latitude)
    const cornersLongLat = [
      [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
      [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)]
    ]
    const viewport = new WebMercatorViewport({
      width: 800,
      height: 600
    }).fitBounds(cornersLongLat, { padding: 200 })
    const adjustedZoom = viewport.zoom - 0.5

    const { longitude, latitude } = viewport

    return { longitude, latitude, zoom: adjustedZoom }
  }*/

  /*const routeEdition = async (id) => {
    const data = await apiFetch({
      url: `/api/route/find/${id}`,
      errMessage: 'Teste'
    })

    const location = getBoundsForPoints(await data.places)

    setFocus({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: location.zoom
    })
    setRouteName(data.name)
    setWaypoints(data.places)
    setSelectedOption(data.type)
    setCount(data.places.length)
    getRoute(data.type, data.places, false)
  }*/

  useEffect(() => {
    if (changeCount >= 2) {
      setWaypoints([])
      setCount(0)
      setPoints(null)
    } else {
      setChangeCount(changeCount + 1)
    }
  }, [selectedOption])

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

  useEffect(() => {
    function handleScroll() {
      if (routerContainerRef.current) {
        const scrollTop = routerContainerRef.current.scrollTop
        setScrollY(scrollTop)
      }
    }
    if (routerContainerRef.current) {
      routerContainerRef.current.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (routerContainerRef.current) {
        routerContainerRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [routeCreated])

  /*useEffect(() => {
    const id = searchParams.get('id')

    if (id) {
      routeEdition(id)
    }
  }, [searchParams])*/

  return (
    <Wrapper flexbox>
      <Map
        lat={focus && focus.latitude}
        long={focus && focus.longitude}
        zoom={focus && focus.zoom}
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
              e.latitude &&
              e.longitude && (
                <>
                  {i === 0 ? (
                    <Marker
                      longitude={e.longitude}
                      latitude={e.latitude}
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
                          bgcolor="secondary"
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
                          longitude={e.longitude}
                          latitude={e.latitude}
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
                          longitude={e.longitude}
                          latitude={e.latitude}
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
            <Wrapper flexbox align="center" justify="center" width="22rem">
              <Input
                fluid
                placeholder="Procure um local"
                value={search}
                noborder
                onChange={(event) => handleSearch(event.target.value)}
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
          bgcolor="white"
          height="84%"
          width="22rem"
          corner="rounded"
          flexbox
          column
        >
          {routeCreated ? (
            <>
              <BackIcon onClick={() => setRouteCreated(false)}>
                <Icon name="MdKeyboardArrowLeft" size={18} hover="primary" />
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
                margin="top"
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
                    <Metrics type="time" value={summary.duration} />
                  </Wrapper>
                  <Wrapper flexbox>
                    <DetailsIcon>
                      <Icon name="RiRouteLine" size={18} />
                    </DetailsIcon>
                    <Metrics type="distanceMeters" value={summary.distance} />
                  </Wrapper>
                </Wrapper>
                <Wrapper position="relative">
                  {scrollY !== 0 && <TopGradient />}
                  <div
                    ref={routerContainerRef}
                    style={{
                      padding: '0 15px 0 0',
                      margin: '15px 0 0 0',
                      overflow: 'auto',
                      height: '31rem',
                      width: '18rem'
                    }}
                  >
                    {summary.legs.map((e, i) => (
                      <Wrapper key={i} padding="p5">
                        {e.steps.map((step, index) => (
                          <DetailsContainer
                            key={index}
                            flexbox
                            border="bottom"
                            bordercolor="lighterGray"
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
                  </div>
                  {scrollY !== 0 &&
                    scrollY + routerContainerRef.current.clientHeight <
                      routerContainerRef.current.scrollHeight && (
                      <BottomGradient />
                    )}
                </Wrapper>
              </Wrapper>
              <Wrapper flexbox margin="top" align="flex-end" justify="flex-end">
                <Button fluid onClick={() => console.log('entrou')}>
                  Salvar rota
                </Button>
              </Wrapper>
            </>
          ) : (
            <>
              <Wrapper flexbox align="center" justify="center" margin="bottom">
                <Text fontSize="large">Roteirizador</Text>
              </Wrapper>
              <Wrapper flexbox align="center" justify="center" margin="top">
                <Text fontSize="normal">
                  Selecione um tipo de rota para começar
                </Text>
              </Wrapper>
              <Wrapper margin="vertical" flexbox justify="center">
                <Select
                  selectedValue={selectedOption}
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
                    <StyledInputPoints>
                      <Input
                        fluid
                        placeholder="Insira um ponto inicial"
                        disabled={!selectedOption}
                        value={
                          waypoints && waypoints.length > 0
                            ? waypoints[0].latitude +
                              ', ' +
                              waypoints[0].longitude
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
                            <StyledInputPoints key={i}>
                              <Input
                                fluid
                                placeholder="Insira um ponto de destino"
                                value={
                                  e.latitude && e.longitude
                                    ? e.latitude + ', ' + e.longitude
                                    : ''
                                }
                                clear
                                onClear={() => removeWaypoint(i)}
                              />
                            </StyledInputPoints>
                          )
                      )}
                    <StyledInputPoints>
                      <Input
                        fluid
                        disabled={!selectedOption}
                        placeholder="Insira um ponto de destino"
                        value={
                          waypoints && waypoints.length >= 2
                            ? waypoints[waypoints.length - 1].latitude +
                              ', ' +
                              waypoints[waypoints.length - 1].longitude
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
                  onClick={() => getRoute(selectedOption, waypoints, true)}
                  disabled={waypoints && waypoints.length > 2 ? false : true}
                  color="white"
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
