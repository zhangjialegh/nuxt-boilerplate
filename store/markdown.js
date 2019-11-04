export const state = () => ({
  html: ''
})

export const mutations = {
  changeHtml (state, payload) {
    state.html = payload
  }
}