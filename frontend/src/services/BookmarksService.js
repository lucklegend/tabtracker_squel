import Api from '@/services/Api'

export default {
  index (bookmark) {
    return Api().get('bookmarks', {
      params: bookmark
    })
  },

  showall (bookmark) {
    return Api().get('bookmarks/all', {
      params: bookmark
    })
  },

  post (bookmark) {
    return Api().post('bookmarks', bookmark)
  },

  delete (bookmarkId) {
    return Api().delete(`bookmarks/${bookmarkId}`)
  }
}
