export const state = () => ({
    authorName: 'Penulis 1',
    authorID: 0,
    accessToken: '',
})
  
export const mutations = {
    setAuthorName (state, target) {
      state.authorName = target
    },
    setAccessToken (state, target) {
      state.accessToken = target
    }
}
    