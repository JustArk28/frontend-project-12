const apiPath = '/api/v1'

export default {
  SignUpPath: () => [apiPath, 'signup'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  getChannels: () => [apiPath, 'channels'].join('/'),
  addMessage: () => [apiPath, 'messages'].join('/'),
  getMessages: () => [apiPath, 'messages'].join('/'),
  removeMessages: (id) => [apiPath, 'messages', id].join('/'),
  addChannel: () => [apiPath, 'channels'].join('/'),
  getChannels: () => [apiPath, 'channels'].join('/'),
  editChannel: (id) => [apiPath, 'channels', id].join('/'),
  removeChannel: (id) => [apiPath, 'channels', id].join('/'),
}
