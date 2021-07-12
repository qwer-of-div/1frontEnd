<template>
  <div style="height:80vh">
    <iframe width="100%"
            height="100%"
            :src="basePath+':8080/form-generator/#/'"
            frameborder="0" />
  </div>
</template>

<script>
const path = process.env.VUE_APP_BASE_PATH

export default {
  name: 'FormGenerator',
  data () {
    return {
      basePath: path
    }
  }
}
</script>
