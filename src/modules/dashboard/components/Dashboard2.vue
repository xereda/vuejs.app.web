<template>
  <div class="">
    <div class="columns is-multiline">
      <div class="column">
        <h4 class="title is-4 has-text-centered">No-show 2017</h4>
        <div class="echarts" ref="echart1" style="width:100%;height:300px;"></div>
        <hr class="is-hidden-tablet">
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts'

export default {
  name: 'DmDashboard2',
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.echart = Echarts.init(this.$refs.echart1)
    this.echart.setOption(this.option)
  },
  beforeDestroy () {
    if (window) {
      window.removeEventListener('resize', this.onResize)
    }
  },
  data () {
    return {
      echart: '',
      option: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [ 'Jan', 'Fev', 'Mar', 'Abr' ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Atendimentos'
          }
        ],
        series: [
          {
            name: 'No-show',
            type: 'bar',
            barWidth: '90%',
            data: [ 35, 15, 8, 2 ]
          }
        ]
      }
    }
  },
  methods: {
    onResize () {
      // this.width = this.$refs.echart1.offsetWidth
      if (this.echart) this.echart.resize()
    }
  },
  components: {
  }
}
</script>

<style lang="css">
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
