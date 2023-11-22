import xmlbuilder from 'xmlbuilder'

export function generateGPXFile(points, name, places) {
  const gpx = xmlbuilder.create('gpx', { version: '1.0', encoding: 'UTF-8' })
  gpx.att('xmlns', 'http://www.topografix.com/GPX/1/1')
  gpx.att('version', '1.1')
  gpx.att('creator', 'MyFleetOnRoad')

  for (let i = 1; i < places.length - 1; i++) {
    const point = places[i]
    const wpt = gpx.ele('wpt')
    wpt.att('lat', point.latitude)
    wpt.att('lon', point.longitude)
    wpt.ele('ele', {}, point.altitude)
    wpt.ele('time', {}, point.timestamp)
  }

  const route = gpx.ele('rte')
  route.ele('name', {}, name)

  for (let i = 1; i < points.length - 1; i++) {
    const point = points[i]
    const rtept = route.ele('rtept')
    rtept.att('lat', point.latitude)
    rtept.att('lon', point.longitude)
    rtept.ele('ele', {}, point.altitude)
    rtept.ele('time', {}, point.timestamp)
  }

  const gpxData = gpx.end({ pretty: true })

  return gpxData
}
