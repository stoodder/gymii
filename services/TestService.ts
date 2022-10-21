export default class TestService {
  static get() {
    return useFetch('/api/test', {
      method: 'GET'
    })
  }
}
