'use client'
import { Wrapper, Icon, Text, Pagination, Map, Metrics } from '@/app/components'
import { StyledContainer, StyledCard } from './styles'
import { useState } from 'react'
import { Source, Layer, Marker } from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project'
import checkered from '../public/images/checkered.png'
import Image from 'next/image'
import 'mapbox-gl/dist/mapbox-gl.css'
import { generateGPXFile } from './utils/export'

export default function Home() {
  const [routes] = useState([
    {
      id: 1,
      name: 'teste 5',
      type: 'optimized',
      distance: 13229.5,
      time: 2152.4,
      cords: [
        {
          latitude: -28.258552,
          longitude: -52.445442
        },
        {
          latitude: -28.260516,
          longitude: -52.445911
        },
        {
          latitude: -28.260891,
          longitude: -52.445507
        },
        {
          latitude: -28.26046,
          longitude: -52.444309
        },
        {
          latitude: -28.260848,
          longitude: -52.442259
        },
        {
          latitude: -28.260791,
          longitude: -52.435842
        },
        {
          latitude: -28.258882,
          longitude: -52.435533
        },
        {
          latitude: -28.259288,
          longitude: -52.432533
        },
        {
          latitude: -28.25958,
          longitude: -52.432139
        },
        {
          latitude: -28.258871,
          longitude: -52.427956
        },
        {
          latitude: -28.259905,
          longitude: -52.427514
        },
        {
          latitude: -28.260734,
          longitude: -52.427766
        },
        {
          latitude: -28.260776,
          longitude: -52.428261
        },
        {
          latitude: -28.260576,
          longitude: -52.425252
        },
        {
          latitude: -28.272401,
          longitude: -52.41803
        },
        {
          latitude: -28.273584,
          longitude: -52.418077
        },
        {
          latitude: -28.273714,
          longitude: -52.417576
        },
        {
          latitude: -28.272439,
          longitude: -52.417128
        },
        {
          latitude: -28.272113,
          longitude: -52.417014
        },
        {
          latitude: -28.263485,
          longitude: -52.422018
        },
        {
          latitude: -28.259894,
          longitude: -52.422541
        },
        {
          latitude: -28.256637,
          longitude: -52.424049
        },
        {
          latitude: -28.253886,
          longitude: -52.421037
        },
        {
          latitude: -28.250569,
          longitude: -52.418508
        },
        {
          latitude: -28.250609,
          longitude: -52.416542
        },
        {
          latitude: -28.250313,
          longitude: -52.415771
        },
        {
          latitude: -28.252264,
          longitude: -52.414821
        },
        {
          latitude: -28.252765,
          longitude: -52.413055
        },
        {
          latitude: -28.252004,
          longitude: -52.411153
        },
        {
          latitude: -28.251218,
          longitude: -52.409268
        },
        {
          latitude: -28.245894,
          longitude: -52.411922
        },
        {
          latitude: -28.245262,
          longitude: -52.414753
        },
        {
          latitude: -28.241965,
          longitude: -52.41303
        },
        {
          latitude: -28.245262,
          longitude: -52.414753
        },
        {
          latitude: -28.245894,
          longitude: -52.411922
        },
        {
          latitude: -28.252243,
          longitude: -52.408779
        },
        {
          latitude: -28.263937,
          longitude: -52.401926
        },
        {
          latitude: -28.263364,
          longitude: -52.400563
        },
        {
          latitude: -28.264866,
          longitude: -52.401018
        },
        {
          latitude: -28.265186,
          longitude: -52.401369
        },
        {
          latitude: -28.264996,
          longitude: -52.4022
        }
      ],
      companyClientBranch: {
        id: 1
      },
      companyClient: {
        id: 1
      },
      isActive: true,
      isDeleted: false
    },
    {
      id: 2,
      name: 'teste 5',
      type: 'optimized',
      distance: 13229.5,
      time: 2152.4,
      cords: [
        {
          latitude: -28.258552,
          longitude: -52.445442
        },
        {
          latitude: -28.260516,
          longitude: -52.445911
        },
        {
          latitude: -28.260891,
          longitude: -52.445507
        },
        {
          latitude: -28.26046,
          longitude: -52.444309
        },
        {
          latitude: -28.260848,
          longitude: -52.442259
        },
        {
          latitude: -28.260791,
          longitude: -52.435842
        },
        {
          latitude: -28.258882,
          longitude: -52.435533
        },
        {
          latitude: -28.259288,
          longitude: -52.432533
        },
        {
          latitude: -28.25958,
          longitude: -52.432139
        },
        {
          latitude: -28.258871,
          longitude: -52.427956
        },
        {
          latitude: -28.259905,
          longitude: -52.427514
        },
        {
          latitude: -28.260734,
          longitude: -52.427766
        },
        {
          latitude: -28.260776,
          longitude: -52.428261
        },
        {
          latitude: -28.260576,
          longitude: -52.425252
        },
        {
          latitude: -28.272401,
          longitude: -52.41803
        },
        {
          latitude: -28.273584,
          longitude: -52.418077
        },
        {
          latitude: -28.273714,
          longitude: -52.417576
        },
        {
          latitude: -28.272439,
          longitude: -52.417128
        },
        {
          latitude: -28.272113,
          longitude: -52.417014
        },
        {
          latitude: -28.263485,
          longitude: -52.422018
        },
        {
          latitude: -28.259894,
          longitude: -52.422541
        },
        {
          latitude: -28.256637,
          longitude: -52.424049
        },
        {
          latitude: -28.253886,
          longitude: -52.421037
        },
        {
          latitude: -28.250569,
          longitude: -52.418508
        },
        {
          latitude: -28.250609,
          longitude: -52.416542
        },
        {
          latitude: -28.250313,
          longitude: -52.415771
        },
        {
          latitude: -28.252264,
          longitude: -52.414821
        },
        {
          latitude: -28.252765,
          longitude: -52.413055
        },
        {
          latitude: -28.252004,
          longitude: -52.411153
        },
        {
          latitude: -28.251218,
          longitude: -52.409268
        },
        {
          latitude: -28.245894,
          longitude: -52.411922
        },
        {
          latitude: -28.245262,
          longitude: -52.414753
        },
        {
          latitude: -28.241965,
          longitude: -52.41303
        },
        {
          latitude: -28.245262,
          longitude: -52.414753
        },
        {
          latitude: -28.245894,
          longitude: -52.411922
        },
        {
          latitude: -28.252243,
          longitude: -52.408779
        },
        {
          latitude: -28.263937,
          longitude: -52.401926
        },
        {
          latitude: -28.263364,
          longitude: -52.400563
        },
        {
          latitude: -28.264866,
          longitude: -52.401018
        },
        {
          latitude: -28.265186,
          longitude: -52.401369
        },
        {
          latitude: -28.264996,
          longitude: -52.4022
        }
      ],
      companyClientBranch: {
        id: 1
      },
      companyClient: {
        id: 1
      },
      isActive: true,
      isDeleted: false
    }
  ])

  const perPage = 8
  const [currentPage, setCurrentPage] = useState(1)
  const lastItem = currentPage * perPage
  const firstItem = lastItem - perPage

  const data = routes.slice(firstItem, lastItem)
  const totalPages = Math.ceil(routes.length / perPage)

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
    const { longitude, latitude, zoom } = viewport

    return { longitude, latitude, zoom }
  }

  const handleGenerateGPX = (route) => {
    const gpxData = generateGPXFile(route)

    const blob = new Blob([gpxData], { type: 'application/gpx+xml' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = 'seuarquivo.gpx'
    a.click()

    window.URL.revokeObjectURL(url)
  }

  return (
    <Wrapper flexbox column>
      <StyledContainer flexbox bgcolor="altWhite" padding="p30">
        {data.map((e, i) => {
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

          return (
            <StyledCard
              flexbox
              bgcolor="white"
              corner="rounded"
              height="350px"
              padding="p20"
              column
              key={i}
            >
              <Wrapper flexbox justify="space-between">
                <Wrapper flexbox column>
                  <Text fontSize="large">{e.name}</Text>
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
                  <Wrapper onClick={() => console.log('entrou click icon')}>
                    <Icon name="PiNotePencilLight" size="18" hover="gray" />
                  </Wrapper>
                  <Wrapper onClick={() => handleGenerateGPX(e.cords)}>
                    <Icon name="PiExportLight" size="18" hover="gray" />
                  </Wrapper>
                  <Wrapper onClick={() => console.log('entrou click icon')}>
                    <Icon name="PiTrashLight" size="18" hover="red" />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper height="100%" margin="top">
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
                              bgcolor="green"
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Wrapper>
  )
}
