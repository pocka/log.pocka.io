import Vue from 'vue'

Vue.filter('ymd', strDate => {
  const d = new Date(strDate)

  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
})
