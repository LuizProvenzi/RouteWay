'use client'
import {
  Wrapper,
  Icon,
  Text,
  Pagination,
  Map,
  Metrics,
  Input,
  Button
} from '@/app/components'
import { StyledContainer, StyledCard, FilterContainer } from './styles'
import { useState, useEffect } from 'react'
import { Source, Layer, Marker } from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project'
import checkered from '../../../../public/images/checkered.png'
import Image from 'next/image'
import 'mapbox-gl/dist/mapbox-gl.css'
import { generateGPXFile } from './utils/export'
import Link from 'next/link'
import { colors } from '@/app/assets/styles'
import apiFetch from '@/app/utils/requests'

export default function List() {
  const [routes, setRoutes] = useState([])
  const [search, setSearch] = useState('')

  const perPage = 8
  const [currentPage, setCurrentPage] = useState(1)
  const lastItem = currentPage * perPage
  const firstItem = lastItem - perPage

  const data =
    routes && routes.length > 0 ? routes.slice(firstItem, lastItem) : []
  const totalPages =
    routes && routes.length > 0 ? Math.ceil(routes.length / perPage) : []

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const applyToArray = (func, array) => func.apply(Math, array)

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
  }

  const handleGenerateGPX = (route, name, places) => {
    const gpxData = generateGPXFile(route, name, places)

    const blob = new Blob([gpxData], { type: 'application/gpx+xml' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = `${name}.gpx`
    a.click()

    window.URL.revokeObjectURL(url)
  }

  const getRoutes = async () => {
    const data = await apiFetch({
      url: search ? `routes/${search}` : `routes`
    })
    if (data) {
      setRoutes(data.routes)
    }
  }

  const disableRoute = async (id) => {
    const body = {
      isActive: false
    }

    await apiFetch({
      url: `route/${id}/disable`,
      method: 'PUT',
      data: body
    })

    getRoutes()
  }

  function handleSearch(value) {
    setSearch(value)
  }

  useEffect(() => {
    getRoutes()
  }, [])

  return (
    <Wrapper
      flexbox
      column
      height="100vh"
      bgcolor="altWhite"
      padding="container"
    >
      <Wrapper flexbox column height="100%" justify="space-between">
        <Wrapper flexbox column>
          <FilterContainer
            flexbox
            column
            corner="rounded"
            margin="bottom"
            bgcolor="white"
            gap="g10"
          >
            <Wrapper flexbox>
              <Text fontSize="big" fontWeight="bold" color="primary">
                Lista de rotas
              </Text>
            </Wrapper>
            <Wrapper flexbox justify="space-between" align="center">
              <Wrapper width="20rem">
                <Input
                  fluid
                  placeholder="Nome da rota"
                  value={search}
                  onChange={(event) => handleSearch(event.target.value)}
                />
              </Wrapper>
              <Wrapper flexbox gap="g10">
                <Wrapper>
                  <Link
                    href={{
                      pathname: 'management'
                    }}
                  >
                    <Button bgcolor="green" fluid>
                      Adicionar
                    </Button>
                  </Link>
                </Wrapper>
                <Wrapper>
                  <Button fluid onClick={() => getRoutes()}>
                    Buscar
                  </Button>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </FilterContainer>
          <StyledContainer flexbox>
            {data.length > 0 &&
              data.map((e, i) => {
                const bounds = getBoundsForPoints(e.cords)

                const data = {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: e.cords.map((point) => [
                      point.longitude,
                      point.latitude
                    ])
                  }
                }

                const dataLayer = {
                  id: 'routearrows',
                  type: 'symbol',
                  source: 'route',
                  coordinates: e.cords.map((point) => [
                    point.longitude,
                    point.latitude
                  ]),
                  layout: {
                    'symbol-placement': 'line',
                    'text-field': '▶',
                    'text-size': [
                      'interpolate',
                      ['linear'],
                      ['zoom'],
                      12,
                      24,
                      22,
                      60
                    ],
                    'symbol-spacing': [
                      'interpolate',
                      ['linear'],
                      ['zoom'],
                      12,
                      30,
                      22,
                      160
                    ],
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
                    'line-width': [
                      'interpolate',
                      ['linear'],
                      ['zoom'],
                      12,
                      3,
                      22,
                      12
                    ]
                  }
                }

                return (
                  <StyledCard
                    flexbox
                    bgcolor="white"
                    corner="rounded"
                    padding="p20"
                    column
                    key={i}
                  >
                    <Wrapper flexbox justify="space-between">
                      <Wrapper flexbox column width="70%">
                        <Text fontSize="large" truncate>
                          {e.name}
                        </Text>
                        <Wrapper flexbox margin="top" gap="g20">
                          <Wrapper flexbox align="center" gap="g3">
                            <Icon name="RiRouteLine" size="15" />
                            <Metrics type="distanceMeters" value={e.distance} />
                          </Wrapper>
                          <Wrapper flexbox align="center" gap="g3">
                            <Icon name="RiTimerLine" size="15" />
                            <Metrics type="time" value={e.time} />
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper flexbox gap="g10">
                        <Wrapper>
                          <Link
                            href={{
                              pathname: 'management',
                              query: { id: e._id }
                            }}
                          >
                            <Icon
                              name="PiNotePencilLight"
                              size="18"
                              hover="gray"
                            />
                          </Link>
                        </Wrapper>
                        <Wrapper
                          onClick={() =>
                            handleGenerateGPX(e.cords, e.name, e.places)
                          }
                        >
                          <Icon name="PiExportLight" size="18" hover="gray" />
                        </Wrapper>
                        <Wrapper onClick={() => disableRoute(e._id)}>
                          <Icon name="PiTrashLight" size="18" hover="red" />
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>

                    <Wrapper height="19vh" margin="top">
                      <Map
                        lat={bounds.latitude}
                        long={bounds.longitude}
                        zoom={bounds.zoom}
                        corner="rounded"
                        fixed
                      >
                        <Source type="geojson" data={data}>
                          <Layer {...lineLayer} />
                          <Layer {...dataLayer} />
                        </Source>

                        {e.places.map((point, index) => {
                          if (index !== 0 && index !== e.places.length - 1) {
                            return (
                              <Marker
                                longitude={point.longitude}
                                latitude={point.latitude}
                                anchor={'center'}
                                key={index}
                              >
                                <Wrapper
                                  flexbox
                                  bgcolor="white"
                                  width="1rem"
                                  height="1rem"
                                  corner="circle"
                                  align="center"
                                  justify="center"
                                >
                                  <Wrapper
                                    bgcolor="primary"
                                    width=".8rem"
                                    height=".8rem"
                                    corner="circle"
                                  />
                                </Wrapper>
                              </Marker>
                            )
                          }
                        })}

                        {e.cords.map((point, index) => {
                          if (index === 0) {
                            return (
                              <Marker
                                longitude={point.longitude}
                                latitude={point.latitude}
                                anchor={'center'}
                                key={index}
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
                            )
                          }

                          if (index === e.cords.length - 1) {
                            return (
                              <Marker
                                longitude={point.longitude}
                                latitude={point.latitude}
                                anchor={'center'}
                                key={index}
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
                            )
                          }
                        })}
                      </Map>
                    </Wrapper>
                  </StyledCard>
                )
              })}
          </StyledContainer>
        </Wrapper>

        <Wrapper height="7%">
          {data.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              resultsInPage={data.length}
              totalResults={routes.length}
            />
          )}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}
