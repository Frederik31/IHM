<template>
  <section class='content' v-if="!loading">
    <div class='box' v-if="selected === 'A'" >
      <div class='box-body'>
        <div class='row'>
          <div class='col-md-6'>
            <p class='text-center'>
              <strong>Tasks of the Day Admin</strong>
            </p>
            <va-chart
              :chart-config='chartConfig'></va-chart>
          </div>
          <div class='col-md-6'>
            <p class='text-center'>
              <strong>Tasks of the Week Admin</strong>
            </p>
            <va-chart
              :chart-config='chartConfig2'
            >
            </va-chart>
          </div>
        </div>
      </div>
    </div>
    <div class='box' v-if="selected === 'A' || selected === 'B'">
      <div class='box-body'>
        <div class='row'>
          <div class='col-md-6'>
            <p class='text-center'>
              <strong>Graph Operator 1</strong>
            </p>
            <va-chart
              :chart-config='bubbleChartConfig'
            >
            </va-chart>
          </div>
          <div class='col-md-6'>
            <p class='text-center'>
              <strong>Graph Operator 2</strong>
            </p>
            <va-chart
              :chart-config='polarAreaChartConfig'
            >
            </va-chart>
          </div>
        </div>
      </div>
    </div>
    <div class='box' v-if="selected === 'A' || selected === 'B' || selected === 'C'">
      <div class='box-body'>
        <div class='row'>
          <div class='col-md-6'>
            <p class='text-center'>
              <strong>Graph User 1</strong>
            </p>
            <va-chart
              :chart-config='radarChartConfig'
            >
            </va-chart>
          </div>
          <div class='col-md-6'>
            <p class='text-center'>
              <strong>Graph User 2</strong>
            </p>
            <va-chart
              :chart-config='barChartConfig'
            >
            </va-chart>
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
import global from '../util/globalApp'

export default {
  components: {
    'va-chart': VAChart
  },
  data () {
    return {
      selected: 'C',
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
      },
      lineChartConfig: {
        type: 'line',
        data: {
          datasets: [{
            label: 'Scatter Dataset',
            data: [{
              x: -10,
              y: 0
            }, {
              x: 0,
              y: 10
            }, {
              x: 10,
              y: 5
            }]
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }]
          }
        }
      },
      barChartConfig: {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
              data: [65, 59, 80, 81, 56, 55, 40]
            }
          ]
        },
        options: {
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      },
      radarChartConfig: {
        type: 'radar',
        data: {
          labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
              label: 'My Second dataset',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: [28, 48, 40, 19, 96, 27, 100]
            }
          ]
        },
        options: {
          scale: {
            reverse: true,
            ticks: {
              beginAtZero: true
            }
          }
        }
      },
      polarAreaChartConfig: {
        type: 'polarArea',
        data: {
          datasets: [{
            data: [
              11,
              16,
              7,
              3,
              14
            ],
            backgroundColor: [
              '#FF6384',
              '#4BC0C0',
              '#FFCE56',
              '#E7E9ED',
              '#36A2EB'
            ],
            label: 'My dataset' // for legend
          }],
          labels: [
            'Red',
            'Green',
            'Yellow',
            'Grey',
            'Blue'
          ]
        },
        options: {
          elements: {
            arc: {
              borderColor: '#000000'
            }
          }
        }
      },
      bubbleChartConfig: {
        type: 'bubble',
        data: {
          datasets: [{
            label: 'First Dataset',
            data: [
              {
                x: 20,
                y: 30,
                r: 15
              },
              {
                x: 40,
                y: 10,
                r: 10
              }
            ],
            backgroundColor: '#FF6384',
            hoverBackgroundColor: '#FF6384'
          }]
        },
        options: {
          elements: {
            points: {
              borderWidth: 1,
              borderColor: 'rgb(0, 0, 0)'
            }
          }
        }
      }
    }
  },
  created () {
    var role = global.currentUser.role
    switch (role) {
      case 'admin':
        this.selected = 'A'
        break
      case 'operator':
        this.selected = 'B'
        break
      case 'user':
        this.selected = 'C'
        break
    }
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
