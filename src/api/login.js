import request from '../utils/request'

const login = (data) => {
  return request({
    url: `/user/login?userCode=${data.userCode}&psk=${data.psk}`,
    method: 'get',
    data
  })
}

export { login }