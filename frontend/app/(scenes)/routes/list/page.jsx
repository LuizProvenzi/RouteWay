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
//import { toast } from 'react-toastify'

export default function List() {
  const [routes, setRoutes] = useState([])

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

  /*const getRoutes = async () => {
    const data = await apiFetch({
      url: `/api/route/findAll/byCompanyClient/${selectedOption}/true`,
      errMessage: 'Teste'
    })
    setRoutes(data)
  }

  const disableRoute = async (id) => {
    const body = {
      isActive: false
    }

    const data = await apiFetch({
      url: `/api/route/update/isActive/${id}`,
      method: 'PUT',
      data: body,
      errMessage: 'Teste'
    })

    if (data) {
      toast.success(t('Route disabled successfully!'))
    }

    getRoutes()
  }*/

  useEffect(() => {
    setRoutes([
      {
        id: 17,
        name: 'Entregas - Porto Alegre',
        type: 'optimized',
        distance: 117032.8,
        time: 12521.000000000002,
        cords: [
          {
            latitude: -29.888733,
            longitude: -51.177402
          },
          {
            latitude: -29.883732,
            longitude: -51.180414
          },
          {
            latitude: -29.859731,
            longitude: -51.180921
          },
          {
            latitude: -29.831441,
            longitude: -51.173804
          },
          {
            latitude: -29.828304,
            longitude: -51.170375
          },
          {
            latitude: -29.865503,
            longitude: -51.103461
          },
          {
            latitude: -29.878718,
            longitude: -51.090985
          },
          {
            latitude: -29.892545,
            longitude: -51.090957
          },
          {
            latitude: -29.892057,
            longitude: -51.087327
          },
          {
            latitude: -29.89908,
            longitude: -51.086178
          },
          {
            latitude: -29.899918,
            longitude: -51.078527
          },
          {
            latitude: -29.899402,
            longitude: -51.087991
          },
          {
            latitude: -29.905051,
            longitude: -51.095695
          },
          {
            latitude: -29.921603,
            longitude: -51.102156
          },
          {
            latitude: -29.950049,
            longitude: -51.104006
          },
          {
            latitude: -29.950454,
            longitude: -51.110862
          },
          {
            latitude: -29.955888,
            longitude: -51.112018
          },
          {
            latitude: -29.957537,
            longitude: -51.109326
          },
          {
            latitude: -29.964741,
            longitude: -51.115245
          },
          {
            latitude: -29.970488,
            longitude: -51.116358
          },
          {
            latitude: -29.968555,
            longitude: -51.11706
          },
          {
            latitude: -29.967705,
            longitude: -51.105236
          },
          {
            latitude: -29.955348,
            longitude: -51.075044
          },
          {
            latitude: -29.953021,
            longitude: -51.050939
          },
          {
            latitude: -29.956848,
            longitude: -51.018142
          },
          {
            latitude: -29.955577,
            longitude: -51.002849
          },
          {
            latitude: -29.950765,
            longitude: -51.00399
          },
          {
            latitude: -29.946926,
            longitude: -50.984218
          },
          {
            latitude: -29.938431,
            longitude: -50.984998
          },
          {
            latitude: -29.936772,
            longitude: -50.9833
          },
          {
            latitude: -29.937917,
            longitude: -50.979296
          },
          {
            latitude: -29.937838,
            longitude: -50.984657
          },
          {
            latitude: -29.946803,
            longitude: -50.985019
          },
          {
            latitude: -29.950804,
            longitude: -51.005141
          },
          {
            latitude: -29.971116,
            longitude: -51.000265
          },
          {
            latitude: -29.983235,
            longitude: -50.993105
          },
          {
            latitude: -29.997465,
            longitude: -50.993047
          },
          {
            latitude: -30.000188,
            longitude: -50.999563
          },
          {
            latitude: -29.998338,
            longitude: -51.014787
          },
          {
            latitude: -30.001897,
            longitude: -51.030848
          },
          {
            latitude: -30.006513,
            longitude: -51.039561
          },
          {
            latitude: -30.010904,
            longitude: -51.038116
          },
          {
            latitude: -30.018187,
            longitude: -51.049463
          },
          {
            latitude: -30.023946,
            longitude: -51.045128
          },
          {
            latitude: -30.02737,
            longitude: -51.046899
          },
          {
            latitude: -30.03042,
            longitude: -51.053731
          },
          {
            latitude: -30.04422,
            longitude: -51.048262
          },
          {
            latitude: -30.050221,
            longitude: -51.051302
          },
          {
            latitude: -30.05149,
            longitude: -51.069435
          },
          {
            latitude: -30.049065,
            longitude: -51.07532
          },
          {
            latitude: -30.057454,
            longitude: -51.08065
          },
          {
            latitude: -30.055917,
            longitude: -51.083213
          },
          {
            latitude: -30.05747,
            longitude: -51.088196
          },
          {
            latitude: -30.060555,
            longitude: -51.093897
          },
          {
            latitude: -30.065569,
            longitude: -51.09559
          },
          {
            latitude: -30.067861,
            longitude: -51.101418
          },
          {
            latitude: -30.080034,
            longitude: -51.103737
          },
          {
            latitude: -30.076066,
            longitude: -51.131598
          },
          {
            latitude: -30.090991,
            longitude: -51.132295
          },
          {
            latitude: -30.093994,
            longitude: -51.137869
          },
          {
            latitude: -30.101525,
            longitude: -51.142099
          },
          {
            latitude: -30.103203,
            longitude: -51.148975
          },
          {
            latitude: -30.100741,
            longitude: -51.154375
          },
          {
            latitude: -30.101605,
            longitude: -51.167592
          },
          {
            latitude: -30.096979,
            longitude: -51.177933
          },
          {
            latitude: -30.094651,
            longitude: -51.178264
          },
          {
            latitude: -30.090105,
            longitude: -51.171591
          },
          {
            latitude: -30.0929,
            longitude: -51.164713
          },
          {
            latitude: -30.089064,
            longitude: -51.169483
          },
          {
            latitude: -30.078174,
            longitude: -51.170845
          },
          {
            latitude: -30.075494,
            longitude: -51.174517
          },
          {
            latitude: -30.074331,
            longitude: -51.172862
          },
          {
            latitude: -30.065593,
            longitude: -51.186526
          },
          {
            latitude: -30.051926,
            longitude: -51.180957
          },
          {
            latitude: -30.041994,
            longitude: -51.17327
          },
          {
            latitude: -30.034818,
            longitude: -51.177439
          },
          {
            latitude: -30.029946,
            longitude: -51.17336
          },
          {
            latitude: -30.024969,
            longitude: -51.17567
          },
          {
            latitude: -30.02413,
            longitude: -51.171873
          },
          {
            latitude: -30.025848,
            longitude: -51.171541
          },
          {
            latitude: -30.021214,
            longitude: -51.171272
          },
          {
            latitude: -30.022139,
            longitude: -51.1737
          },
          {
            latitude: -30.016988,
            longitude: -51.180469
          },
          {
            latitude: -30.017198,
            longitude: -51.186415
          },
          {
            latitude: -30.003021,
            longitude: -51.190441
          },
          {
            latitude: -29.995171,
            longitude: -51.188413
          },
          {
            latitude: -29.987539,
            longitude: -51.181544
          },
          {
            latitude: -29.97001,
            longitude: -51.17628
          },
          {
            latitude: -29.919868,
            longitude: -51.17801
          },
          {
            latitude: -29.896562,
            longitude: -51.175937
          },
          {
            latitude: -29.888014,
            longitude: -51.178904
          },
          {
            latitude: -29.88821,
            longitude: -51.171563
          }
        ],
        places: [
          {
            latitude: -29.888564538003983,
            longitude: -51.17739452118093
          },
          {
            latitude: -30.025988649684884,
            longitude: -51.17190503361246
          },
          {
            latitude: -29.898788766836596,
            longitude: -51.07902753729695
          },
          {
            latitude: -29.95046396397145,
            longitude: -51.11071351282666
          },
          {
            latitude: -30.028073918643912,
            longitude: -51.04563803983626
          },
          {
            latitude: -30.091474214962524,
            longitude: -51.16216065952713
          },
          {
            latitude: -29.9381049414605,
            longitude: -50.97916709339705
          },
          {
            latitude: -29.888176340801216,
            longitude: -51.17156184168445
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
        id: 18,
        name: 'Entregas - Guarulhos',
        type: 'optimized',
        distance: 37531.3,
        time: 6730.399999999999,
        cords: [
          {
            latitude: -23.45596,
            longitude: -46.517112
          },
          {
            latitude: -23.462796,
            longitude: -46.51491
          },
          {
            latitude: -23.463179,
            longitude: -46.51535
          },
          {
            latitude: -23.463558,
            longitude: -46.514293
          },
          {
            latitude: -23.465247,
            longitude: -46.513669
          },
          {
            latitude: -23.464821,
            longitude: -46.512662
          },
          {
            latitude: -23.465453,
            longitude: -46.510892
          },
          {
            latitude: -23.464037,
            longitude: -46.504711
          },
          {
            latitude: -23.461431,
            longitude: -46.49783
          },
          {
            latitude: -23.459759,
            longitude: -46.496602
          },
          {
            latitude: -23.461942,
            longitude: -46.4957
          },
          {
            latitude: -23.459759,
            longitude: -46.496602
          },
          {
            latitude: -23.459144,
            longitude: -46.495924
          },
          {
            latitude: -23.461437,
            longitude: -46.498164
          },
          {
            latitude: -23.46225,
            longitude: -46.500071
          },
          {
            latitude: -23.452045,
            longitude: -46.503225
          },
          {
            latitude: -23.451155,
            longitude: -46.504302
          },
          {
            latitude: -23.451012,
            longitude: -46.506096
          },
          {
            latitude: -23.447953,
            longitude: -46.507752
          },
          {
            latitude: -23.449211,
            longitude: -46.510029
          },
          {
            latitude: -23.44894,
            longitude: -46.51063
          },
          {
            latitude: -23.444635,
            longitude: -46.510672
          },
          {
            latitude: -23.444881,
            longitude: -46.510318
          },
          {
            latitude: -23.44112,
            longitude: -46.511646
          },
          {
            latitude: -23.441455,
            longitude: -46.51254
          },
          {
            latitude: -23.438879,
            longitude: -46.515059
          },
          {
            latitude: -23.438241,
            longitude: -46.516696
          },
          {
            latitude: -23.435427,
            longitude: -46.515521
          },
          {
            latitude: -23.434561,
            longitude: -46.515739
          },
          {
            latitude: -23.433858,
            longitude: -46.515904
          },
          {
            latitude: -23.43409,
            longitude: -46.516891
          },
          {
            latitude: -23.438062,
            longitude: -46.518543
          },
          {
            latitude: -23.43945,
            longitude: -46.520148
          },
          {
            latitude: -23.439941,
            longitude: -46.52231
          },
          {
            latitude: -23.43838,
            longitude: -46.523062
          },
          {
            latitude: -23.439291,
            longitude: -46.5302
          },
          {
            latitude: -23.439873,
            longitude: -46.530726
          },
          {
            latitude: -23.444596,
            longitude: -46.533092
          },
          {
            latitude: -23.447123,
            longitude: -46.533367
          },
          {
            latitude: -23.448118,
            longitude: -46.532078
          },
          {
            latitude: -23.451526,
            longitude: -46.530148
          },
          {
            latitude: -23.450444,
            longitude: -46.529992
          },
          {
            latitude: -23.451457,
            longitude: -46.530191
          },
          {
            latitude: -23.446353,
            longitude: -46.533217
          },
          {
            latitude: -23.446153,
            longitude: -46.534141
          },
          {
            latitude: -23.44068,
            longitude: -46.536061
          },
          {
            latitude: -23.440749,
            longitude: -46.537726
          },
          {
            latitude: -23.443159,
            longitude: -46.538277
          },
          {
            latitude: -23.442187,
            longitude: -46.539142
          },
          {
            latitude: -23.440522,
            longitude: -46.543208
          },
          {
            latitude: -23.437066,
            longitude: -46.54874
          },
          {
            latitude: -23.433465,
            longitude: -46.546889
          },
          {
            latitude: -23.432102,
            longitude: -46.545089
          },
          {
            latitude: -23.431802,
            longitude: -46.544692
          },
          {
            latitude: -23.433299,
            longitude: -46.543371
          },
          {
            latitude: -23.435717,
            longitude: -46.546912
          },
          {
            latitude: -23.440282,
            longitude: -46.54857
          },
          {
            latitude: -23.438906,
            longitude: -46.550183
          },
          {
            latitude: -23.439364,
            longitude: -46.551137
          },
          {
            latitude: -23.438338,
            longitude: -46.552529
          },
          {
            latitude: -23.437475,
            longitude: -46.551749
          },
          {
            latitude: -23.438338,
            longitude: -46.552529
          },
          {
            latitude: -23.441313,
            longitude: -46.548553
          },
          {
            latitude: -23.443176,
            longitude: -46.549109
          },
          {
            latitude: -23.447535,
            longitude: -46.546916
          },
          {
            latitude: -23.44864,
            longitude: -46.548153
          },
          {
            latitude: -23.449377,
            longitude: -46.547836
          },
          {
            latitude: -23.45074,
            longitude: -46.548835
          },
          {
            latitude: -23.451278,
            longitude: -46.54912
          },
          {
            latitude: -23.450906,
            longitude: -46.549725
          },
          {
            latitude: -23.453038,
            longitude: -46.554885
          },
          {
            latitude: -23.454057,
            longitude: -46.556004
          },
          {
            latitude: -23.454883,
            longitude: -46.55542
          },
          {
            latitude: -23.456276,
            longitude: -46.558088
          },
          {
            latitude: -23.456495,
            longitude: -46.55862
          },
          {
            latitude: -23.455696,
            longitude: -46.559206
          },
          {
            latitude: -23.456936,
            longitude: -46.562118
          },
          {
            latitude: -23.456298,
            longitude: -46.564366
          },
          {
            latitude: -23.459004,
            longitude: -46.571663
          },
          {
            latitude: -23.466569,
            longitude: -46.571823
          },
          {
            latitude: -23.467765,
            longitude: -46.571329
          },
          {
            latitude: -23.473101,
            longitude: -46.562734
          },
          {
            latitude: -23.476689,
            longitude: -46.560979
          },
          {
            latitude: -23.478535,
            longitude: -46.561388
          },
          {
            latitude: -23.479847,
            longitude: -46.562731
          },
          {
            latitude: -23.480336,
            longitude: -46.564869
          },
          {
            latitude: -23.479751,
            longitude: -46.568288
          },
          {
            latitude: -23.480808,
            longitude: -46.570577
          },
          {
            latitude: -23.48221,
            longitude: -46.569805
          },
          {
            latitude: -23.48119,
            longitude: -46.566739
          },
          {
            latitude: -23.484911,
            longitude: -46.564683
          },
          {
            latitude: -23.486511,
            longitude: -46.565482
          },
          {
            latitude: -23.489322,
            longitude: -46.565462
          },
          {
            latitude: -23.489199,
            longitude: -46.561799
          },
          {
            latitude: -23.487625,
            longitude: -46.561301
          },
          {
            latitude: -23.4855,
            longitude: -46.55759
          },
          {
            latitude: -23.486685,
            longitude: -46.551329
          },
          {
            latitude: -23.484176,
            longitude: -46.550615
          },
          {
            latitude: -23.481161,
            longitude: -46.548212
          },
          {
            latitude: -23.481822,
            longitude: -46.546842
          },
          {
            latitude: -23.479677,
            longitude: -46.547848
          },
          {
            latitude: -23.477915,
            longitude: -46.547857
          },
          {
            latitude: -23.468545,
            longitude: -46.545333
          },
          {
            latitude: -23.466415,
            longitude: -46.546425
          },
          {
            latitude: -23.466428,
            longitude: -46.544609
          },
          {
            latitude: -23.46471,
            longitude: -46.543486
          },
          {
            latitude: -23.46224,
            longitude: -46.538618
          },
          {
            latitude: -23.466236,
            longitude: -46.535417
          },
          {
            latitude: -23.467961,
            longitude: -46.536395
          },
          {
            latitude: -23.467025,
            longitude: -46.53663
          },
          {
            latitude: -23.467961,
            longitude: -46.536395
          },
          {
            latitude: -23.466337,
            longitude: -46.535645
          },
          {
            latitude: -23.465572,
            longitude: -46.534187
          },
          {
            latitude: -23.465407,
            longitude: -46.530261
          },
          {
            latitude: -23.461617,
            longitude: -46.524144
          },
          {
            latitude: -23.45878,
            longitude: -46.521096
          },
          {
            latitude: -23.45662,
            longitude: -46.519966
          },
          {
            latitude: -23.456075,
            longitude: -46.517612
          },
          {
            latitude: -23.456554,
            longitude: -46.517226
          }
        ],
        places: [
          {
            latitude: -23.456264014701304,
            longitude: -46.51702946835658
          },
          {
            latitude: -23.44487113322583,
            longitude: -46.51030780731301
          },
          {
            latitude: -23.45030158363943,
            longitude: -46.53007581645781
          },
          {
            latitude: -23.43452192107776,
            longitude: -46.515556939684274
          },
          {
            latitude: -23.437442325398223,
            longitude: -46.55179828978464
          },
          {
            latitude: -23.45066019043172,
            longitude: -46.54900619809692
          },
          {
            latitude: -23.456346539425397,
            longitude: -46.558052575163146
          },
          {
            latitude: -23.467001380881953,
            longitude: -46.53660931100592
          },
          {
            latitude: -23.43221629314209,
            longitude: -46.54498558606693
          },
          {
            latitude: -23.48209082478496,
            longitude: -46.56954669044157
          },
          {
            latitude: -23.46194995450179,
            longitude: -46.495722281778114
          },
          {
            latitude: -23.456519983053084,
            longitude: -46.51716554593639
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
        id: 19,
        name: 'Porto Alegre - Florianópolis',
        type: 'optimized',
        distance: 445173.6,
        time: 19011.300000000003,
        cords: [
          {
            latitude: -29.979847,
            longitude: -51.181743
          },
          {
            latitude: -29.943239,
            longitude: -50.90205
          },
          {
            latitude: -29.890769,
            longitude: -50.714054
          },
          {
            latitude: -29.889986,
            longitude: -50.464032
          },
          {
            latitude: -29.864982,
            longitude: -50.409286
          },
          {
            latitude: -29.897466,
            longitude: -50.344904
          },
          {
            latitude: -29.879588,
            longitude: -50.261055
          },
          {
            latitude: -29.726388,
            longitude: -50.200135
          },
          {
            latitude: -29.467497,
            longitude: -49.955857
          },
          {
            latitude: -29.419732,
            longitude: -49.86025
          },
          {
            latitude: -29.341457,
            longitude: -49.786158
          },
          {
            latitude: -29.285899,
            longitude: -49.756399
          },
          {
            latitude: -29.177866,
            longitude: -49.753443
          },
          {
            latitude: -29.139498,
            longitude: -49.717168
          },
          {
            latitude: -29.120993,
            longitude: -49.642507
          },
          {
            latitude: -29.049469,
            longitude: -49.619711
          },
          {
            latitude: -28.967279,
            longitude: -49.523463
          },
          {
            latitude: -28.946937,
            longitude: -49.530372
          },
          {
            latitude: -28.844315,
            longitude: -49.431519
          },
          {
            latitude: -28.716792,
            longitude: -49.231171
          },
          {
            latitude: -28.666152,
            longitude: -49.114877
          },
          {
            latitude: -28.592952,
            longitude: -49.045259
          },
          {
            latitude: -28.525877,
            longitude: -49.056174
          },
          {
            latitude: -28.478285,
            longitude: -49.032758
          },
          {
            latitude: -28.424552,
            longitude: -48.940497
          },
          {
            latitude: -28.439995,
            longitude: -48.812512
          },
          {
            latitude: -28.34481,
            longitude: -48.734151
          },
          {
            latitude: -28.27703,
            longitude: -48.699941
          },
          {
            latitude: -28.149558,
            longitude: -48.691911
          },
          {
            latitude: -28.055319,
            longitude: -48.717541
          },
          {
            latitude: -27.831862,
            longitude: -48.629689
          },
          {
            latitude: -27.759631,
            longitude: -48.630668
          },
          {
            latitude: -27.65569,
            longitude: -48.678307
          },
          {
            latitude: -27.587956,
            longitude: -48.616401
          },
          {
            latitude: -27.587414,
            longitude: -48.587079
          },
          {
            latitude: -27.59015,
            longitude: -48.583387
          }
        ],
        places: [
          {
            latitude: -29.979786056034413,
            longitude: -51.18170424329912
          },
          {
            latitude: -27.587309091036047,
            longitude: -48.587153197036
          },
          {
            latitude: -27.59017436898165,
            longitude: -48.583422958863196
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
        id: 20,
        name: 'Entregas São Paulo - Guarulhos',
        type: 'optimized',
        distance: 168980.0,
        time: 14898.599999999999,
        cords: [
          {
            latitude: -23.477349,
            longitude: -46.533741
          },
          {
            latitude: -23.496461,
            longitude: -46.55944
          },
          {
            latitude: -23.51782,
            longitude: -46.561512
          },
          {
            latitude: -23.537919,
            longitude: -46.546926
          },
          {
            latitude: -23.553159,
            longitude: -46.518931
          },
          {
            latitude: -23.577769,
            longitude: -46.500734
          },
          {
            latitude: -23.594172,
            longitude: -46.466333
          },
          {
            latitude: -23.622159,
            longitude: -46.47917
          },
          {
            latitude: -23.629848,
            longitude: -46.49205
          },
          {
            latitude: -23.648227,
            longitude: -46.488963
          },
          {
            latitude: -23.656527,
            longitude: -46.49719
          },
          {
            latitude: -23.653006,
            longitude: -46.493046
          },
          {
            latitude: -23.65881,
            longitude: -46.491458
          },
          {
            latitude: -23.657826,
            longitude: -46.48195
          },
          {
            latitude: -23.66659,
            longitude: -46.469399
          },
          {
            latitude: -23.694923,
            longitude: -46.474438
          },
          {
            latitude: -23.713485,
            longitude: -46.460871
          },
          {
            latitude: -23.723641,
            longitude: -46.487508
          },
          {
            latitude: -23.74312,
            longitude: -46.490488
          },
          {
            latitude: -23.749814,
            longitude: -46.496576
          },
          {
            latitude: -23.755704,
            longitude: -46.522588
          },
          {
            latitude: -23.763991,
            longitude: -46.536043
          },
          {
            latitude: -23.761095,
            longitude: -46.545685
          },
          {
            latitude: -23.753818,
            longitude: -46.538893
          },
          {
            latitude: -23.754348,
            longitude: -46.534296
          },
          {
            latitude: -23.769406,
            longitude: -46.534665
          },
          {
            latitude: -23.753396,
            longitude: -46.534399
          },
          {
            latitude: -23.756008,
            longitude: -46.531947
          },
          {
            latitude: -23.715087,
            longitude: -46.56098
          },
          {
            latitude: -23.698914,
            longitude: -46.561631
          },
          {
            latitude: -23.657306,
            longitude: -46.5769
          },
          {
            latitude: -23.636551,
            longitude: -46.594682
          },
          {
            latitude: -23.620797,
            longitude: -46.600949
          },
          {
            latitude: -23.630659,
            longitude: -46.645244
          },
          {
            latitude: -23.615766,
            longitude: -46.660132
          },
          {
            latitude: -23.60548,
            longitude: -46.64864
          },
          {
            latitude: -23.612784,
            longitude: -46.627698
          },
          {
            latitude: -23.669274,
            longitude: -46.632574
          },
          {
            latitude: -23.680216,
            longitude: -46.612272
          },
          {
            latitude: -23.691811,
            longitude: -46.604095
          },
          {
            latitude: -23.727364,
            longitude: -46.607225
          },
          {
            latitude: -23.763408,
            longitude: -46.591387
          },
          {
            latitude: -23.78609,
            longitude: -46.597906
          },
          {
            latitude: -23.816065,
            longitude: -46.584003
          },
          {
            latitude: -23.925504,
            longitude: -46.554591
          },
          {
            latitude: -23.928595,
            longitude: -46.548154
          },
          {
            latitude: -23.924022,
            longitude: -46.533499
          },
          {
            latitude: -23.884186,
            longitude: -46.501546
          },
          {
            latitude: -23.8826,
            longitude: -46.484586
          },
          {
            latitude: -23.896015,
            longitude: -46.47838
          },
          {
            latitude: -23.903333,
            longitude: -46.460394
          },
          {
            latitude: -23.897768,
            longitude: -46.43581
          },
          {
            latitude: -23.886963,
            longitude: -46.432172
          },
          {
            latitude: -23.887322,
            longitude: -46.441314
          },
          {
            latitude: -23.880148,
            longitude: -46.451845
          },
          {
            latitude: -23.896238,
            longitude: -46.463914
          },
          {
            latitude: -23.88031,
            longitude: -46.45047
          },
          {
            latitude: -23.899709,
            longitude: -46.428269
          },
          {
            latitude: -23.915016,
            longitude: -46.420539
          },
          {
            latitude: -23.926901,
            longitude: -46.403466
          },
          {
            latitude: -23.929456,
            longitude: -46.34208
          },
          {
            latitude: -23.93746,
            longitude: -46.325588
          },
          {
            latitude: -23.969468,
            longitude: -46.329206
          },
          {
            latitude: -23.967855,
            longitude: -46.332456
          }
        ],
        places: [
          {
            latitude: -23.477485173813847,
            longitude: -46.533829759719055
          },
          {
            latitude: -23.60547849082174,
            longitude: -46.648749469401565
          },
          {
            latitude: -23.629844033181314,
            longitude: -46.492040774379944
          },
          {
            latitude: -23.75595014433489,
            longitude: -46.53193026038531
          },
          {
            latitude: -23.896696742201442,
            longitude: -46.46449803404258
          },
          {
            latitude: -23.96788055940428,
            longitude: -46.33248283035795
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
        id: 21,
        name: 'Entregas - Passo Fundo',
        type: 'optimized',
        distance: 27142.100000000002,
        time: 3874.3,
        cords: [
          {
            latitude: -28.266082,
            longitude: -52.41501
          },
          {
            latitude: -28.266373,
            longitude: -52.415626
          },
          {
            latitude: -28.267386,
            longitude: -52.41503
          },
          {
            latitude: -28.266856,
            longitude: -52.413899
          },
          {
            latitude: -28.270435,
            longitude: -52.412021
          },
          {
            latitude: -28.2711,
            longitude: -52.409576
          },
          {
            latitude: -28.272904,
            longitude: -52.409281
          },
          {
            latitude: -28.273747,
            longitude: -52.409546
          },
          {
            latitude: -28.274269,
            longitude: -52.409711
          },
          {
            latitude: -28.27229,
            longitude: -52.416906
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
            latitude: -28.258549,
            longitude: -52.423388
          },
          {
            latitude: -28.255491,
            longitude: -52.424442
          },
          {
            latitude: -28.255538,
            longitude: -52.425045
          },
          {
            latitude: -28.254965,
            longitude: -52.424418
          },
          {
            latitude: -28.254104,
            longitude: -52.42335
          },
          {
            latitude: -28.254276,
            longitude: -52.42152
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
            latitude: -28.251467,
            longitude: -52.409851
          },
          {
            latitude: -28.251218,
            longitude: -52.409268
          },
          {
            latitude: -28.246551,
            longitude: -52.411618
          },
          {
            latitude: -28.246193,
            longitude: -52.415381
          },
          {
            latitude: -28.24478,
            longitude: -52.416302
          },
          {
            latitude: -28.241742,
            longitude: -52.418315
          },
          {
            latitude: -28.239374,
            longitude: -52.418714
          },
          {
            latitude: -28.235999,
            longitude: -52.418497
          },
          {
            latitude: -28.234382,
            longitude: -52.407751
          },
          {
            latitude: -28.231564,
            longitude: -52.40228
          },
          {
            latitude: -28.230541,
            longitude: -52.398657
          },
          {
            latitude: -28.230654,
            longitude: -52.395568
          },
          {
            latitude: -28.232478,
            longitude: -52.391453
          },
          {
            latitude: -28.233416,
            longitude: -52.392036
          },
          {
            latitude: -28.235969,
            longitude: -52.389215
          },
          {
            latitude: -28.237961,
            longitude: -52.388382
          },
          {
            latitude: -28.237595,
            longitude: -52.386432
          },
          {
            latitude: -28.237961,
            longitude: -52.388382
          },
          {
            latitude: -28.235969,
            longitude: -52.389215
          },
          {
            latitude: -28.233416,
            longitude: -52.392036
          },
          {
            latitude: -28.232789,
            longitude: -52.391536
          },
          {
            latitude: -28.232616,
            longitude: -52.391185
          },
          {
            latitude: -28.233797,
            longitude: -52.388354
          },
          {
            latitude: -28.237206,
            longitude: -52.374268
          },
          {
            latitude: -28.232662,
            longitude: -52.372416
          },
          {
            latitude: -28.231942,
            longitude: -52.371805
          },
          {
            latitude: -28.232995,
            longitude: -52.370328
          },
          {
            latitude: -28.2335,
            longitude: -52.371103
          },
          {
            latitude: -28.232995,
            longitude: -52.370328
          },
          {
            latitude: -28.233153,
            longitude: -52.370194
          },
          {
            latitude: -28.234382,
            longitude: -52.370039
          },
          {
            latitude: -28.236218,
            longitude: -52.368926
          },
          {
            latitude: -28.238977,
            longitude: -52.372382
          },
          {
            latitude: -28.242268,
            longitude: -52.378789
          },
          {
            latitude: -28.249004,
            longitude: -52.387734
          },
          {
            latitude: -28.249467,
            longitude: -52.387289
          },
          {
            latitude: -28.247916,
            longitude: -52.388768
          },
          {
            latitude: -28.253942,
            longitude: -52.396727
          },
          {
            latitude: -28.254974,
            longitude: -52.395702
          },
          {
            latitude: -28.258289,
            longitude: -52.400081
          },
          {
            latitude: -28.25732,
            longitude: -52.401033
          },
          {
            latitude: -28.257001,
            longitude: -52.400613
          },
          {
            latitude: -28.256455,
            longitude: -52.399892
          },
          {
            latitude: -28.258615,
            longitude: -52.397775
          },
          {
            latitude: -28.258201,
            longitude: -52.3964
          },
          {
            latitude: -28.259526,
            longitude: -52.395278
          },
          {
            latitude: -28.266361,
            longitude: -52.396562
          },
          {
            latitude: -28.266865,
            longitude: -52.394761
          },
          {
            latitude: -28.267372,
            longitude: -52.395004
          },
          {
            latitude: -28.268012,
            longitude: -52.394502
          },
          {
            latitude: -28.268547,
            longitude: -52.392881
          },
          {
            latitude: -28.270092,
            longitude: -52.393554
          },
          {
            latitude: -28.270375,
            longitude: -52.393677
          },
          {
            latitude: -28.270616,
            longitude: -52.391505
          },
          {
            latitude: -28.268562,
            longitude: -52.389444
          },
          {
            latitude: -28.263984,
            longitude: -52.378742
          },
          {
            latitude: -28.263274,
            longitude: -52.376298
          },
          {
            latitude: -28.262099,
            longitude: -52.375523
          },
          {
            latitude: -28.262865,
            longitude: -52.374038
          },
          {
            latitude: -28.263693,
            longitude: -52.374522
          },
          {
            latitude: -28.26429,
            longitude: -52.373127
          },
          {
            latitude: -28.263983,
            longitude: -52.37386
          },
          {
            latitude: -28.262467,
            longitude: -52.373047
          },
          {
            latitude: -28.262284,
            longitude: -52.372062
          },
          {
            latitude: -28.256796,
            longitude: -52.373611
          },
          {
            latitude: -28.255908,
            longitude: -52.368912
          }
        ],
        places: [
          {
            latitude: -28.26622676784077,
            longitude: -52.41492138480406
          },
          {
            latitude: -28.25513918110736,
            longitude: -52.42423796520377
          },
          {
            latitude: -28.244802256545213,
            longitude: -52.41634376349094
          },
          {
            latitude: -28.23772250087311,
            longitude: -52.38640274662052
          },
          {
            latitude: -28.233399202942394,
            longitude: -52.37118329466921
          },
          {
            latitude: -28.269985021331458,
            longitude: -52.39387025084909
          },
          {
            latitude: -28.249814235192417,
            longitude: -52.387754022494676
          },
          {
            latitude: -28.251944250149663,
            longitude: -52.4095875348922
          },
          {
            latitude: -28.257206457219745,
            longitude: -52.40041319236059
          },
          {
            latitude: -28.26372121085201,
            longitude: -52.372819045833054
          },
          {
            latitude: -28.273805765164667,
            longitude: -52.409303059154695
          },
          {
            latitude: -28.255890930234095,
            longitude: -52.368836382288094
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
        id: 22,
        name: 'Viagem - Lages/SP/Rio',
        type: 'sequential',
        distance: 1204783.875,
        time: 69689.781,
        cords: [
          {
            latitude: -27.805121,
            longitude: -50.299769
          },
          {
            latitude: -27.802528,
            longitude: -50.299814
          },
          {
            latitude: -27.802157,
            longitude: -50.304876
          },
          {
            latitude: -27.750312,
            longitude: -50.334978
          },
          {
            latitude: -27.301477,
            longitude: -50.425532
          },
          {
            latitude: -27.161354,
            longitude: -50.466818
          },
          {
            latitude: -26.983808,
            longitude: -50.392975
          },
          {
            latitude: -26.913372,
            longitude: -50.444074
          },
          {
            latitude: -26.613378,
            longitude: -50.230842
          },
          {
            latitude: -26.388074,
            longitude: -50.224363
          },
          {
            latitude: -26.313375,
            longitude: -49.964594
          },
          {
            latitude: -25.916143,
            longitude: -49.610065
          },
          {
            latitude: -25.868332,
            longitude: -49.365285
          },
          {
            latitude: -25.559612,
            longitude: -49.3071
          },
          {
            latitude: -25.543581,
            longitude: -49.303039
          },
          {
            latitude: -25.54392,
            longitude: -49.30399
          },
          {
            latitude: -25.545088,
            longitude: -49.303619
          },
          {
            latitude: -25.544707,
            longitude: -49.302628
          },
          {
            latitude: -25.544815,
            longitude: -49.302101
          },
          {
            latitude: -25.562089,
            longitude: -49.152835
          },
          {
            latitude: -25.344386,
            longitude: -49.043391
          },
          {
            latitude: -25.302375,
            longitude: -48.941583
          },
          {
            latitude: -25.109718,
            longitude: -48.843745
          },
          {
            latitude: -25.087782,
            longitude: -48.604945
          },
          {
            latitude: -24.975996,
            longitude: -48.503381
          },
          {
            latitude: -24.972062,
            longitude: -48.350847
          },
          {
            latitude: -24.92377,
            longitude: -48.262259
          },
          {
            latitude: -24.879971,
            longitude: -48.209292
          },
          {
            latitude: -24.78051,
            longitude: -48.203689
          },
          {
            latitude: -24.646776,
            longitude: -47.9211
          },
          {
            latitude: -24.423642,
            longitude: -47.778858
          },
          {
            latitude: -24.332703,
            longitude: -47.639345
          },
          {
            latitude: -24.262685,
            longitude: -47.379321
          },
          {
            latitude: -24.184978,
            longitude: -47.358608
          },
          {
            latitude: -24.144098,
            longitude: -47.27261
          },
          {
            latitude: -24.074438,
            longitude: -47.24966
          },
          {
            latitude: -24.001963,
            longitude: -47.151789
          },
          {
            latitude: -23.969541,
            longitude: -47.133703
          },
          {
            latitude: -23.929672,
            longitude: -46.996479
          },
          {
            latitude: -23.893337,
            longitude: -46.984254
          },
          {
            latitude: -23.865502,
            longitude: -46.949749
          },
          {
            latitude: -23.85627,
            longitude: -46.941019
          },
          {
            latitude: -23.852603,
            longitude: -46.939293
          },
          {
            latitude: -23.637458,
            longitude: -46.833651
          },
          {
            latitude: -23.633746,
            longitude: -46.829158
          },
          {
            latitude: -23.598545,
            longitude: -46.811902
          },
          {
            latitude: -23.594031,
            longitude: -46.809288
          },
          {
            latitude: -23.57483,
            longitude: -46.70676
          },
          {
            latitude: -23.572608,
            longitude: -46.704106
          },
          {
            latitude: -23.571561,
            longitude: -46.694967
          },
          {
            latitude: -23.564746,
            longitude: -46.67863
          },
          {
            latitude: -23.571004,
            longitude: -46.670388
          },
          {
            latitude: -23.572445,
            longitude: -46.66484
          },
          {
            latitude: -23.558306,
            longitude: -46.653482
          },
          {
            latitude: -23.542681,
            longitude: -46.634899
          },
          {
            latitude: -23.52641,
            longitude: -46.631034
          },
          {
            latitude: -23.521331,
            longitude: -46.630095
          },
          {
            latitude: -23.529775,
            longitude: -46.594783
          },
          {
            latitude: -23.529241,
            longitude: -46.586731
          },
          {
            latitude: -23.486145,
            longitude: -46.506538
          },
          {
            latitude: -23.442416,
            longitude: -46.263966
          },
          {
            latitude: -23.386451,
            longitude: -46.158134
          },
          {
            latitude: -23.369515,
            longitude: -46.13484
          },
          {
            latitude: -23.3285,
            longitude: -46.12952
          },
          {
            latitude: -23.303115,
            longitude: -46.028302
          },
          {
            latitude: -23.219367,
            longitude: -45.89944
          },
          {
            latitude: -23.18838,
            longitude: -45.857563
          },
          {
            latitude: -23.156894,
            longitude: -45.794816
          },
          {
            latitude: -22.886261,
            longitude: -45.283223
          },
          {
            latitude: -22.557151,
            longitude: -44.854031
          },
          {
            latitude: -22.461428,
            longitude: -44.447598
          },
          {
            latitude: -22.453797,
            longitude: -44.295737
          },
          {
            latitude: -22.550785,
            longitude: -44.182767
          },
          {
            latitude: -22.590003,
            longitude: -44.103615
          },
          {
            latitude: -22.583439,
            longitude: -43.961414
          },
          {
            latitude: -22.663882,
            longitude: -43.885247
          },
          {
            latitude: -22.714144,
            longitude: -43.732324
          },
          {
            latitude: -22.747958,
            longitude: -43.444043
          },
          {
            latitude: -22.800241,
            longitude: -43.353635
          },
          {
            latitude: -22.804826,
            longitude: -43.345619
          },
          {
            latitude: -22.822479,
            longitude: -43.252815
          },
          {
            latitude: -22.905552,
            longitude: -43.214083
          },
          {
            latitude: -22.906878,
            longitude: -43.210116
          },
          {
            latitude: -22.910957,
            longitude: -43.2106
          },
          {
            latitude: -22.915708,
            longitude: -43.21026
          },
          {
            latitude: -22.920866,
            longitude: -43.223741
          },
          {
            latitude: -22.922548,
            longitude: -43.222709
          }
        ],
        places: [
          {
            latitude: -27.805122679692204,
            longitude: -50.29982693026551
          },
          {
            latitude: -23.5426212287865,
            longitude: -46.63501595641338
          },
          {
            latitude: -22.922798597159527,
            longitude: -43.22304266824304
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
        id: 23,
        name: 'Entregas - SP',
        type: 'optimized',
        distance: 1947717.4,
        time: 101683.20000000001,
        cords: [
          {
            latitude: -23.53565,
            longitude: -46.624699
          },
          {
            latitude: -23.518946,
            longitude: -46.954011
          },
          {
            latitude: -23.437751,
            longitude: -47.06882
          },
          {
            latitude: -23.259722,
            longitude: -47.85376
          },
          {
            latitude: -23.229584,
            longitude: -48.165112
          },
          {
            latitude: -22.955289,
            longitude: -48.821944
          },
          {
            latitude: -22.910181,
            longitude: -49.094258
          },
          {
            latitude: -22.730542,
            longitude: -49.461816
          },
          {
            latitude: -22.8623,
            longitude: -49.587667
          },
          {
            latitude: -22.929025,
            longitude: -49.891392
          },
          {
            latitude: -22.638772,
            longitude: -50.403583
          },
          {
            latitude: -22.619421,
            longitude: -50.691051
          },
          {
            latitude: -22.306302,
            longitude: -51.250019
          },
          {
            latitude: -22.16873,
            longitude: -51.382728
          },
          {
            latitude: -22.090322,
            longitude: -51.364047
          },
          {
            latitude: -22.168659,
            longitude: -51.326024
          },
          {
            latitude: -22.128196,
            longitude: -51.18266
          },
          {
            latitude: -21.92391,
            longitude: -50.903356
          },
          {
            latitude: -21.717838,
            longitude: -50.739929
          },
          {
            latitude: -21.642647,
            longitude: -50.500784
          },
          {
            latitude: -21.571456,
            longitude: -50.443475
          },
          {
            latitude: -21.557091,
            longitude: -50.342957
          },
          {
            latitude: -21.439657,
            longitude: -50.143809
          },
          {
            latitude: -21.144242,
            longitude: -49.881824
          },
          {
            latitude: -20.830723,
            longitude: -49.360581
          },
          {
            latitude: -20.786516,
            longitude: -49.505309
          },
          {
            latitude: -20.831674,
            longitude: -49.361315
          },
          {
            latitude: -20.502989,
            longitude: -49.3212
          },
          {
            latitude: -20.002974,
            longitude: -49.044197
          },
          {
            latitude: -19.937943,
            longitude: -48.955985
          },
          {
            latitude: -19.67139,
            longitude: -48.987326
          },
          {
            latitude: -19.628072,
            longitude: -48.957318
          },
          {
            latitude: -19.640247,
            longitude: -48.857288
          },
          {
            latitude: -19.578515,
            longitude: -48.825086
          },
          {
            latitude: -19.297648,
            longitude: -48.90722
          },
          {
            latitude: -18.850175,
            longitude: -48.243338
          },
          {
            latitude: -18.884586,
            longitude: -48.266676
          },
          {
            latitude: -18.911424,
            longitude: -48.223776
          },
          {
            latitude: -19.775782,
            longitude: -47.9719
          },
          {
            latitude: -19.779597,
            longitude: -47.920783
          },
          {
            latitude: -19.97431,
            longitude: -47.78988
          },
          {
            latitude: -20.198021,
            longitude: -47.785813
          },
          {
            latitude: -20.59663,
            longitude: -47.882879
          },
          {
            latitude: -20.880285,
            longitude: -47.897969
          },
          {
            latitude: -21.111409,
            longitude: -47.781471
          },
          {
            latitude: -21.16823,
            longitude: -47.798937
          },
          {
            latitude: -21.431124,
            longitude: -47.653283
          },
          {
            latitude: -21.735855,
            longitude: -47.583222
          },
          {
            latitude: -21.816254,
            longitude: -47.497259
          },
          {
            latitude: -22.15395,
            longitude: -47.400372
          },
          {
            latitude: -22.504959,
            longitude: -47.399356
          },
          {
            latitude: -22.859229,
            longitude: -47.206446
          },
          {
            latitude: -22.844696,
            longitude: -47.036314
          },
          {
            latitude: -22.897778,
            longitude: -47.005468
          },
          {
            latitude: -23.096196,
            longitude: -46.623454
          },
          {
            latitude: -23.117258,
            longitude: -46.479869
          },
          {
            latitude: -23.169853,
            longitude: -46.44078
          },
          {
            latitude: -23.194021,
            longitude: -46.344744
          },
          {
            latitude: -23.16474,
            longitude: -46.225515
          },
          {
            latitude: -23.249136,
            longitude: -46.077818
          },
          {
            latitude: -23.30919,
            longitude: -46.046133
          },
          {
            latitude: -23.189181,
            longitude: -45.837196
          },
          {
            latitude: -23.328303,
            longitude: -46.134692
          },
          {
            latitude: -23.422191,
            longitude: -46.208528
          },
          {
            latitude: -23.479709,
            longitude: -46.454346
          },
          {
            latitude: -23.614551,
            longitude: -46.440415
          },
          {
            latitude: -23.660768,
            longitude: -46.472709
          },
          {
            latitude: -23.635259,
            longitude: -46.527608
          }
        ],
        places: [
          {
            latitude: -23.535652849463958,
            longitude: -46.62466556259659
          },
          {
            latitude: -21.16817609372623,
            longitude: -47.79889195742933
          },
          {
            latitude: -18.850174970223748,
            longitude: -48.240494047831476
          },
          {
            latitude: -20.78891162018523,
            longitude: -49.506004151872304
          },
          {
            latitude: -22.091186352150373,
            longitude: -51.362276272327705
          },
          {
            latitude: -22.85921406543116,
            longitude: -47.20644316683064
          },
          {
            latitude: -23.190692374811505,
            longitude: -45.83501824201673
          },
          {
            latitude: -23.635617372441843,
            longitude: -46.527657092933396
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
        id: 24,
        name: 'Entregas - Osasco',
        type: 'optimized',
        distance: 27233.399999999998,
        time: 4977.400000000001,
        cords: [
          {
            latitude: -23.528923,
            longitude: -46.808834
          },
          {
            latitude: -23.529093,
            longitude: -46.805798
          },
          {
            latitude: -23.53515,
            longitude: -46.805182
          },
          {
            latitude: -23.532861,
            longitude: -46.801717
          },
          {
            latitude: -23.532772,
            longitude: -46.801088
          },
          {
            latitude: -23.53274,
            longitude: -46.800715
          },
          {
            latitude: -23.540121,
            longitude: -46.799886
          },
          {
            latitude: -23.540141,
            longitude: -46.799178
          },
          {
            latitude: -23.542924,
            longitude: -46.798868
          },
          {
            latitude: -23.542947,
            longitude: -46.79927
          },
          {
            latitude: -23.543367,
            longitude: -46.799185
          },
          {
            latitude: -23.542947,
            longitude: -46.79927
          },
          {
            latitude: -23.543062,
            longitude: -46.799855
          },
          {
            latitude: -23.543634,
            longitude: -46.800571
          },
          {
            latitude: -23.544276,
            longitude: -46.800512
          },
          {
            latitude: -23.542704,
            longitude: -46.802992
          },
          {
            latitude: -23.542875,
            longitude: -46.806272
          },
          {
            latitude: -23.544033,
            longitude: -46.80761
          },
          {
            latitude: -23.544608,
            longitude: -46.807742
          },
          {
            latitude: -23.544818,
            longitude: -46.80826
          },
          {
            latitude: -23.543347,
            longitude: -46.809398
          },
          {
            latitude: -23.541681,
            longitude: -46.809924
          },
          {
            latitude: -23.541584,
            longitude: -46.81154
          },
          {
            latitude: -23.542542,
            longitude: -46.812759
          },
          {
            latitude: -23.541308,
            longitude: -46.814459
          },
          {
            latitude: -23.540425,
            longitude: -46.818582
          },
          {
            latitude: -23.542067,
            longitude: -46.819133
          },
          {
            latitude: -23.543339,
            longitude: -46.820955
          },
          {
            latitude: -23.545063,
            longitude: -46.821635
          },
          {
            latitude: -23.545287,
            longitude: -46.822887
          },
          {
            latitude: -23.548423,
            longitude: -46.822667
          },
          {
            latitude: -23.55208,
            longitude: -46.82512
          },
          {
            latitude: -23.550487,
            longitude: -46.826784
          },
          {
            latitude: -23.550107,
            longitude: -46.82794
          },
          {
            latitude: -23.550957,
            longitude: -46.829811
          },
          {
            latitude: -23.550938,
            longitude: -46.832221
          },
          {
            latitude: -23.550957,
            longitude: -46.829811
          },
          {
            latitude: -23.550107,
            longitude: -46.82794
          },
          {
            latitude: -23.550321,
            longitude: -46.827338
          },
          {
            latitude: -23.549689,
            longitude: -46.826516
          },
          {
            latitude: -23.551278,
            longitude: -46.824778
          },
          {
            latitude: -23.549878,
            longitude: -46.823397
          },
          {
            latitude: -23.548713,
            longitude: -46.822821
          },
          {
            latitude: -23.550356,
            longitude: -46.821561
          },
          {
            latitude: -23.548518,
            longitude: -46.822071
          },
          {
            latitude: -23.546882,
            longitude: -46.820796
          },
          {
            latitude: -23.547204,
            longitude: -46.819735
          },
          {
            latitude: -23.548186,
            longitude: -46.819969
          },
          {
            latitude: -23.549706,
            longitude: -46.81911
          },
          {
            latitude: -23.550108,
            longitude: -46.817305
          },
          {
            latitude: -23.549856,
            longitude: -46.817332
          },
          {
            latitude: -23.549617,
            longitude: -46.816683
          },
          {
            latitude: -23.55004,
            longitude: -46.813167
          },
          {
            latitude: -23.550671,
            longitude: -46.812128
          },
          {
            latitude: -23.551406,
            longitude: -46.810464
          },
          {
            latitude: -23.5522,
            longitude: -46.809791
          },
          {
            latitude: -23.553159,
            longitude: -46.809568
          },
          {
            latitude: -23.553239,
            longitude: -46.808577
          },
          {
            latitude: -23.55555,
            longitude: -46.805573
          },
          {
            latitude: -23.555866,
            longitude: -46.803464
          },
          {
            latitude: -23.555568,
            longitude: -46.802078
          },
          {
            latitude: -23.558204,
            longitude: -46.79995
          },
          {
            latitude: -23.559292,
            longitude: -46.799481
          },
          {
            latitude: -23.559781,
            longitude: -46.797099
          },
          {
            latitude: -23.558571,
            longitude: -46.795158
          },
          {
            latitude: -23.556328,
            longitude: -46.795745
          },
          {
            latitude: -23.554212,
            longitude: -46.793185
          },
          {
            latitude: -23.554277,
            longitude: -46.792949
          },
          {
            latitude: -23.552939,
            longitude: -46.792403
          },
          {
            latitude: -23.553383,
            longitude: -46.790251
          },
          {
            latitude: -23.555459,
            longitude: -46.785104
          },
          {
            latitude: -23.556655,
            longitude: -46.783131
          },
          {
            latitude: -23.556553,
            longitude: -46.782097
          },
          {
            latitude: -23.555374,
            longitude: -46.781926
          },
          {
            latitude: -23.555948,
            longitude: -46.780356
          },
          {
            latitude: -23.560511,
            longitude: -46.782255
          },
          {
            latitude: -23.564761,
            longitude: -46.781513
          },
          {
            latitude: -23.565039,
            longitude: -46.77892
          },
          {
            latitude: -23.567194,
            longitude: -46.777858
          },
          {
            latitude: -23.565039,
            longitude: -46.77892
          },
          {
            latitude: -23.564761,
            longitude: -46.781513
          },
          {
            latitude: -23.560663,
            longitude: -46.782272
          },
          {
            latitude: -23.558006,
            longitude: -46.78125
          },
          {
            latitude: -23.557249,
            longitude: -46.782736
          },
          {
            latitude: -23.556844,
            longitude: -46.78468
          },
          {
            latitude: -23.556179,
            longitude: -46.785824
          },
          {
            latitude: -23.555295,
            longitude: -46.786446
          },
          {
            latitude: -23.552311,
            longitude: -46.785909
          },
          {
            latitude: -23.545524,
            longitude: -46.782699
          },
          {
            latitude: -23.544376,
            longitude: -46.781428
          },
          {
            latitude: -23.544626,
            longitude: -46.779751
          },
          {
            latitude: -23.54443,
            longitude: -46.778854
          },
          {
            latitude: -23.543575,
            longitude: -46.778807
          },
          {
            latitude: -23.540377,
            longitude: -46.778548
          },
          {
            latitude: -23.53961,
            longitude: -46.776321
          },
          {
            latitude: -23.538065,
            longitude: -46.776088
          },
          {
            latitude: -23.538933,
            longitude: -46.773798
          },
          {
            latitude: -23.539667,
            longitude: -46.772964
          },
          {
            latitude: -23.539607,
            longitude: -46.772205
          },
          {
            latitude: -23.543901,
            longitude: -46.766113
          },
          {
            latitude: -23.544862,
            longitude: -46.765365
          },
          {
            latitude: -23.545603,
            longitude: -46.76373
          },
          {
            latitude: -23.546358,
            longitude: -46.764346
          },
          {
            latitude: -23.546915,
            longitude: -46.764228
          },
          {
            latitude: -23.547623,
            longitude: -46.764889
          },
          {
            latitude: -23.547321,
            longitude: -46.76548
          },
          {
            latitude: -23.546828,
            longitude: -46.765542
          },
          {
            latitude: -23.54529,
            longitude: -46.764244
          },
          {
            latitude: -23.544959,
            longitude: -46.763121
          },
          {
            latitude: -23.545143,
            longitude: -46.762658
          },
          {
            latitude: -23.547916,
            longitude: -46.761008
          },
          {
            latitude: -23.549061,
            longitude: -46.758043
          },
          {
            latitude: -23.548146,
            longitude: -46.756514
          },
          {
            latitude: -23.54844,
            longitude: -46.755031
          },
          {
            latitude: -23.545779,
            longitude: -46.755148
          },
          {
            latitude: -23.545941,
            longitude: -46.754194
          },
          {
            latitude: -23.547368,
            longitude: -46.752394
          },
          {
            latitude: -23.546438,
            longitude: -46.750675
          },
          {
            latitude: -23.537554,
            longitude: -46.754965
          },
          {
            latitude: -23.535879,
            longitude: -46.755211
          }
        ],
        places: [
          {
            latitude: -23.529512060260828,
            longitude: -46.80884861899088
          },
          {
            latitude: -23.54327773555916,
            longitude: -46.8092628205994
          },
          {
            latitude: -23.543372666248388,
            longitude: -46.799218431597296
          },
          {
            latitude: -23.554194315593833,
            longitude: -46.79321250827732
          },
          {
            latitude: -23.546885053586394,
            longitude: -46.765461000519224
          },
          {
            latitude: -23.5328349413589,
            longitude: -46.801082338835414
          },
          {
            latitude: -23.543562527274517,
            longitude: -46.77902610271482
          },
          {
            latitude: -23.556662286149987,
            longitude: -46.783064568395986
          },
          {
            latitude: -23.56719810127005,
            longitude: -46.77788704829197
          },
          {
            latitude: -23.55144152421741,
            longitude: -46.83225100938438
          },
          {
            latitude: -23.550777048732087,
            longitude: -46.81216223138014
          },
          {
            latitude: -23.535872930488438,
            longitude: -46.75531306063883
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
        id: 25,
        name: 'Entregas - Rio',
        type: 'optimized',
        distance: 42228.399999999994,
        time: 7392.9,
        cords: [
          {
            latitude: -22.802863,
            longitude: -43.430835
          },
          {
            latitude: -22.802253,
            longitude: -43.431267
          },
          {
            latitude: -22.798266,
            longitude: -43.421897
          },
          {
            latitude: -22.781924,
            longitude: -43.429517
          },
          {
            latitude: -22.781478,
            longitude: -43.429041
          },
          {
            latitude: -22.778145,
            longitude: -43.43041
          },
          {
            latitude: -22.776149,
            longitude: -43.425576
          },
          {
            latitude: -22.778531,
            longitude: -43.42339
          },
          {
            latitude: -22.777941,
            longitude: -43.420424
          },
          {
            latitude: -22.771065,
            longitude: -43.418894
          },
          {
            latitude: -22.770794,
            longitude: -43.419346
          },
          {
            latitude: -22.770603,
            longitude: -43.421125
          },
          {
            latitude: -22.774492,
            longitude: -43.425558
          },
          {
            latitude: -22.762164,
            longitude: -43.43689
          },
          {
            latitude: -22.760822,
            longitude: -43.440129
          },
          {
            latitude: -22.759697,
            longitude: -43.439832
          },
          {
            latitude: -22.757784,
            longitude: -43.443485
          },
          {
            latitude: -22.760574,
            longitude: -43.446471
          },
          {
            latitude: -22.759335,
            longitude: -43.447888
          },
          {
            latitude: -22.75954,
            longitude: -43.447391
          },
          {
            latitude: -22.758069,
            longitude: -43.446271
          },
          {
            latitude: -22.760071,
            longitude: -43.443401
          },
          {
            latitude: -22.76216,
            longitude: -43.43709
          },
          {
            latitude: -22.794124,
            longitude: -43.407976
          },
          {
            latitude: -22.794569,
            longitude: -43.408232
          },
          {
            latitude: -22.789971,
            longitude: -43.406053
          },
          {
            latitude: -22.788657,
            longitude: -43.401085
          },
          {
            latitude: -22.792451,
            longitude: -43.399903
          },
          {
            latitude: -22.793386,
            longitude: -43.397903
          },
          {
            latitude: -22.793003,
            longitude: -43.397295
          },
          {
            latitude: -22.793821,
            longitude: -43.39531
          },
          {
            latitude: -22.793468,
            longitude: -43.394979
          },
          {
            latitude: -22.7945,
            longitude: -43.393853
          },
          {
            latitude: -22.795211,
            longitude: -43.393093
          },
          {
            latitude: -22.790235,
            longitude: -43.38842
          },
          {
            latitude: -22.786979,
            longitude: -43.382184
          },
          {
            latitude: -22.778998,
            longitude: -43.386979
          },
          {
            latitude: -22.772914,
            longitude: -43.374018
          },
          {
            latitude: -22.771727,
            longitude: -43.372596
          },
          {
            latitude: -22.772202,
            longitude: -43.368508
          },
          {
            latitude: -22.773086,
            longitude: -43.367178
          },
          {
            latitude: -22.771514,
            longitude: -43.362347
          },
          {
            latitude: -22.765364,
            longitude: -43.363448
          },
          {
            latitude: -22.76411,
            longitude: -43.364165
          },
          {
            latitude: -22.764204,
            longitude: -43.364675
          },
          {
            latitude: -22.76411,
            longitude: -43.364165
          },
          {
            latitude: -22.765364,
            longitude: -43.363448
          },
          {
            latitude: -22.768359,
            longitude: -43.363323
          },
          {
            latitude: -22.771436,
            longitude: -43.362304
          },
          {
            latitude: -22.773557,
            longitude: -43.364121
          },
          {
            latitude: -22.775685,
            longitude: -43.361996
          },
          {
            latitude: -22.776788,
            longitude: -43.362245
          },
          {
            latitude: -22.777844,
            longitude: -43.361245
          },
          {
            latitude: -22.787058,
            longitude: -43.364168
          },
          {
            latitude: -22.790111,
            longitude: -43.36435
          },
          {
            latitude: -22.790741,
            longitude: -43.365306
          },
          {
            latitude: -22.792381,
            longitude: -43.365942
          },
          {
            latitude: -22.793224,
            longitude: -43.365336
          },
          {
            latitude: -22.79403,
            longitude: -43.366002
          },
          {
            latitude: -22.793584,
            longitude: -43.365615
          },
          {
            latitude: -22.805796,
            longitude: -43.343879
          },
          {
            latitude: -22.806373,
            longitude: -43.343591
          },
          {
            latitude: -22.807305,
            longitude: -43.344475
          },
          {
            latitude: -22.807673,
            longitude: -43.345959
          },
          {
            latitude: -22.808728,
            longitude: -43.345753
          },
          {
            latitude: -22.811631,
            longitude: -43.347313
          },
          {
            latitude: -22.817704,
            longitude: -43.346914
          },
          {
            latitude: -22.820351,
            longitude: -43.351918
          },
          {
            latitude: -22.818939,
            longitude: -43.35721
          },
          {
            latitude: -22.822177,
            longitude: -43.369041
          },
          {
            latitude: -22.824007,
            longitude: -43.370344
          },
          {
            latitude: -22.824818,
            longitude: -43.373195
          },
          {
            latitude: -22.829427,
            longitude: -43.371139
          },
          {
            latitude: -22.830671,
            longitude: -43.373446
          },
          {
            latitude: -22.831868,
            longitude: -43.374052
          },
          {
            latitude: -22.83131,
            longitude: -43.376634
          },
          {
            latitude: -22.831951,
            longitude: -43.378725
          },
          {
            latitude: -22.836142,
            longitude: -43.380686
          },
          {
            latitude: -22.837044,
            longitude: -43.388859
          },
          {
            latitude: -22.835903,
            longitude: -43.391823
          },
          {
            latitude: -22.835952,
            longitude: -43.393951
          },
          {
            latitude: -22.835667,
            longitude: -43.394621
          },
          {
            latitude: -22.831134,
            longitude: -43.396128
          },
          {
            latitude: -22.828649,
            longitude: -43.398945
          },
          {
            latitude: -22.828914,
            longitude: -43.399748
          },
          {
            latitude: -22.824945,
            longitude: -43.402954
          },
          {
            latitude: -22.82224,
            longitude: -43.406417
          },
          {
            latitude: -22.824195,
            longitude: -43.412803
          }
        ],
        places: [
          {
            latitude: -22.802622300601925,
            longitude: -43.43043478693747
          },
          {
            latitude: -22.79459039482245,
            longitude: -43.39395078001641
          },
          {
            latitude: -22.770826570100468,
            longitude: -43.419181013658374
          },
          {
            latitude: -22.763964414070387,
            longitude: -43.364727271985345
          },
          {
            latitude: -22.811657628814515,
            longitude: -43.34712056217708
          },
          {
            latitude: -22.836083478294114,
            longitude: -43.39395078001641
          },
          {
            latitude: -22.75961192702985,
            longitude: -43.448041495954044
          },
          {
            latitude: -22.8243723045791,
            longitude: -43.41300958881152
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
                  //value={name}
                  //onChange={(event) => console.log('entrou')}
                />
              </Wrapper>
              <Wrapper flexbox gap="g10">
                <Wrapper>
                  <Link
                    href={{
                      pathname: 'management'
                    }}
                  >
                    <Button
                      bgcolor="green"
                      fluid
                      onClick={() => console.log('entrou')}
                    >
                      Adicionar
                    </Button>
                  </Link>
                </Wrapper>
                <Wrapper>
                  <Button fluid onClick={() => console.log('entrou')}>
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
                              query: { id: e.id }
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
                        <Wrapper onClick={() => console.log('entrou')}>
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
