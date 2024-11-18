import axios from 'axios'

export const getIpNeo = () => axios<IpNeo>({
  url: 'https://api.ip.sb/geoip',
})