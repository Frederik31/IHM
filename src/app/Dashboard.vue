<template>
  <section class='content'>
    <div class='box' v-if="!loading">
      <div class='box-body'>
          <div class='col-md-6'>
            <p class='text-center'>
              <strong>Tasks of the Day</strong>
            </p>
            <va-chart
              :chart-config='chartConfig'></va-chart>
          </div>
          <div class='col-md-6'>
            <p class='text-center'>
              <strong>Tasks of the Week</strong>
            </p>
            <va-chart
              :chart-config='chartConfig2'></va-chart>
          </div>
      </div>
    </div>
      </div>
    </div>
  </section>
</template>

<script>
import VAChart from '../components/VAChart.vue'
import { services } from '../vuex/api'
// import * as util from '../util/util.js'

export default {
  components: {
    'va-chart': VAChart
  },
  data () {
    return {
      loading: true,
      chartConfig: {
        type: 'pie',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: ['#00a65a', '#f39c12', '#00c0ef', '#af9c12', '#aec0ef'],
            hoverBackgroundColor: ['#00a65a', '#f39c12', '#00c0ef', '#af9c12', '#aec0ef']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          }
        }
      },
      chartConfig2: {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: ['#00a65a', '#f39c12', '#00c0ef', '#af9c12', '#aec0ef'],
            hoverBackgroundColor: ['#00a65a', '#f39c12', '#00c0ef', '#af9c12', '#aec0ef']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          }
        }
      }
    }
  },
  created () {
    services.dashapi.getDash()
    .then((response) => {
      console.log(response.data)
      const jsondata = response.data
      const jsondataDay = jsondata[0]
      const keys = Object.keys(jsondataDay)
      this.chartConfig.data.labels = keys
      const lt = []
      for (var nb in jsondataDay) {
        lt.push(jsondataDay[nb].length)
      }
      this.chartConfig.data.datasets[0].data = lt

      const jsondataWeek = jsondata[1]
      const keys2 = Object.keys(jsondataWeek)
      this.chartConfig2.data.labels = keys2
      const lt2 = []
      for (var nb2 in jsondataWeek) {
        lt2.push(jsondataWeek[nb2].length)
      }
      this.chartConfig2.data.datasets[0].data = lt2
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      this.loading = false
    })
  }
}
</script>

<style lang='css'>
</style>
