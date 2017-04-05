<template>
  <section class="section">
    <div class="container is-fluid">
      <!-- <a class="button is-primary" @click="goRouteByName('scheduleDefinitions')">
        <span class="icon is-small">
          <i class="fa fa-file-text-o"></i>
        </span>
      </a> -->
      <dm-breadcrumbs :object-links="breadcrumbs"></dm-breadcrumbs>
      
    </div>
  </section>
</template>

<script>
import navigation from 'mixins/navigation'
import DmBreadcrumbs from 'utils/ui/Breadcrumbs.vue'
export default {
  mixins: [
    navigation
  ],
  components: {
    DmBreadcrumbs
  },
  data () {
    return {
      breadcrumbs: [
        {
          route: 'scheduleDefinitions',
          name: 'Definições'
        },
        {
          route: '',
          name: 'Gerador'
        }
      ]
    }
  }
}
</script>

<style lang="css">
</style>
