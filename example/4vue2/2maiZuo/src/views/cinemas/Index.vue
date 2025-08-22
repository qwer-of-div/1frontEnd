<template>
    <div>
        <cinema-header></cinema-header>
        <cinema-filter></cinema-filter>
        <cinema-list></cinema-list>
    </div>
</template>
<script>
import CinemaList from './components/List'
import CinemaFilter from './components/Filter'
import CinemaHeader from './components/Header'

export default {
  components: {
    CinemaList,
    CinemaFilter,
    CinemaHeader
  }
}
</script>
