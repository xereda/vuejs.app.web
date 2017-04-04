<template>
  <div class="">
    <div class="columns is-multiline">
      <div class="column is-6">
        <h4 class="title is-4 has-text-centered">Atendimentos 2017</h4>
        <div class="echarts" ref="echart1" style="width:100%;height:300px;"></div>
        <hr class="is-hidden-tablet">
      </div>
      <div class="column is-6">
        <h4 class="title is-4 is-hidden has-text-centered">Por Profisional</h4>
        <div class="echarts" ref="echart2" style="width:100%;height:300px;"></div>
        <hr class="is-hidden-tablet">
      </div>
    </div>
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
    this.echart2 = Echarts.init(this.$refs.echart2)
    this.echart2.setOption(this.option2)
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
            data: [ 87, 125, 110, 130 ]
          },
          {
            name: 'Bradesco',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [ 38, 45, 61, 83 ]
          },
          {
            name: 'Amil',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [ 8, 15, 20, 26 ]
          },
          {
            name: 'Unimed',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [ 139, 150, 234, 297 ]
          },
          {
            name: 'Particular',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [ 140, 280, 310, 410 ]
          }
        ]
      },
      option2: {
        backgroundColor: '',
        title: {
          show: true,
          text: 'Por profissional',
          left: 'center',
          top: 20,
          textStyle: {
            color: 'rgba(0, 0, 0, 0.5)'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: 'Atendimentos',
            type: 'pie',
            radius: '30%',
            center: [ '50%', '50%' ],
            data: [
              { value: 469, name: 'Prestador A' },
              { value: 354, name: 'Prestador B' },
              { value: 253, name: 'Prestador C' }
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'angle',
            label: {
              normal: {
                textStyle: {
                  color: 'black'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'black'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) { return Math.random() * 200 }
          }
        ]
      }
    }
  },
  methods: {
    onResize () {
      // this.width = this.$refs.echart1.offsetWidth
      if (this.echart) this.echart.resize()
      if (this.echart2) this.echart2.resize()
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
