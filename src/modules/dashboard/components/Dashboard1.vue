<template>
  <div class="">
    <h4 class="title is-4 has-text-centered">Atendimentos 2017</h4>
    <div class="echarts" ref="echart1" style="width:100%;height:300px;"></div>
  </div>
</template>

<script>
import Echarts from 'echarts'

export default {
  name: 'DmDashboard1',
  mounted () {
    console.log(Echarts)
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
        title: {
          text: 'Atendimento no mês',
          show: false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: [ 'Agemed', 'Bradesco', 'Amil', 'Unimed', 'Particular' ]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
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
            boundaryGap: false,
            data: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril' ]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Agemed',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [ 230, 300, 230, 20 ]
          },
          {
            name: 'Bradesco',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [ 220, 182, 191, 14 ]
          },
          {
            name: 'Amil',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [ 150, 232, 201, 4 ]
          },
          {
            name: 'Unimed',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [ 350, 380, 400, 39 ]
          },
          {
            name: 'Particular',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [ 320, 332, 301, 334 ]
          }
        ]
      }
    }
  },
  methods: {
    onResize () {
      this.width = this.$refs.echart1.offsetWidth
      if (this.echart) {
        this.echart.resize()
      }
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
