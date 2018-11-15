<template lang="html">
  <div class="container-fluid">
    <h1>{{ mode.toUpperCase() }} Planning</h1>
    <div class="col-md-6" v-if="!loading">
      <button type="button" class="btn btn-default">Export to PDF</button>
      <button type="button" class="btn btn-default">Validate</button>
    </div>
    <div class="col-md-12" v-if="!loading">
        <gantt class="gantt_wrapper panel" :tasks="tasks" @task-updated="logTaskUpdate" @link-updated="logLinkUpdate" @task-selected="selectTask"></gantt>
        <div id="my-form">
        	<label for="description">MSN </label><input type="text" name="description" value="" ><br>
          <label for="o_start_date">Original start date </label><input type="text" name="o_start_date" value="" ><br>
          <label for="n_start_date">New start date </label><input type="text" name="n_start_date" value="" ><br>
          <label for="o_end_date">Original end date </label><input type="text" name="o_end_date" value="" ><br>
          <label for="n_end_date">New end date </label><input type="text" name="n_end_date" value="" ><br>
        	<input type="button" name="close" value="Close"  style='width:100px;'>
        </div>
   </div>
 </div>
</template>

<script>
import Gantt from '../components/Gantt.vue'
import * as util from '../util/util.js'
import { services } from '../vuex/api'

export default {
  name: 'app',
  components: {Gantt},
  data () {
    return {
      mode: 'msn',
      loading: true,
      tasks: {},
      selectedTask: null,
      messages: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.loading = true
    this.loadData(to.params.type)
    .then((tasks) => {
      this.tasks = {
        data: tasks
      }
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      this.loading = false
    })
    next()
  },
  created () {
    this.loading = true
    this.loadData(this.$route.params.type)
    .then((tasks) => {
      this.tasks = {
        data: tasks
      }
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      this.loading = false
    })
  },
  filters: {
    toPercent (val) {
      if (!val) return '0'
      return Math.round((+val) * 100)
    },
    niceDate (obj) {
      return `${obj.getFullYear()} / ${obj.getMonth() + 1} / ${obj.getDate()}`
    }
  },
  methods: {
    selectTask (task) {
      this.selectedTask = task
    },

    addMessage (message) {
      this.messages.unshift(message)
      if (this.messages.length > 40) {
        this.messages.pop()
      }
    },

    logTaskUpdate (id, mode, task) {
      let text = (task && task.text ? ` (${task.text})` : '')
      let message = `Task ${mode}: ${id} ${text} ${task.start_date} ${task.end_date} --> ${task.attr1}`
      console.log(message)
      services.ganttapi.updateGantt(task.msn, 'po', task.start_date)
      .then((response) => {
        console.error('gant updated')
      })
      .catch((error) => {
        console.error(error)
      })
      this.addMessage(message)
    },

    logLinkUpdate (id, mode, link) {
      let message = `Link ${mode}: ${id}`
      if (link) {
        message += ` ( source: ${link.source}, target: ${link.target} )`
      }
      this.addMessage(message)
    },
    loadData (mode) {
      this.mode = mode
      return new Promise((resolve, reject) => {
        services.ganttapi.getGantt()
        .then((response) => {
          const jsondata = response.data
          let tasks = null
          if (mode === 'msn') {
            tasks = util.getMSNTasks(jsondata)
          } else {
            const manutTasks = util.getGanttTasks({data: jsondata, type: 'manut', fieldDateStart: 'Manut', duration: 1})
            const poncageTasks = util.getGanttTasks({data: jsondata, type: 'poncage', fieldDateStart: 'Poncage', duration: 1})
            const cabineTasks = util.getGanttTasks({data: jsondata, type: 'cabine', fieldDateStart: 'Start Cabine', fieldDateEnd: 'Fin Cabine'})
            const paintTasks = util.getGanttPaintTasks(jsondata)
            const moteurTasks = util.getGanttTasks({data: jsondata, type: 'moteur', fieldDateStart: 'Start Moteur', fieldDateEnd: 'Fin Moteur'})
            const docTasks = util.getGanttTasks({data: jsondata, type: 'doc', fieldDateStart: 'Doc', duration: 1})

            tasks = manutTasks
              .concat(poncageTasks)
              .concat(cabineTasks)
              .concat(paintTasks)
              .concat(moteurTasks)
              .concat(docTasks)
          }
          resolve(tasks)
        })
        .catch((error) => {
          reject(error)
        })
      })
    }
  }
}
</script>

<style>
		.weekend {
			background: #f4f7f4 !important;
		}

		.gantt_selected .weekend {
			background: #FFF3A1 !important;
		}

		.well {
			text-align: right;
		}

		@media (max-width: 991px) {
			.nav-stacked > li {
				float: left;
			}
		}

		.container-fluid .row {
			margin-bottom: 10px;
		}

		.container-fluid .gantt_wrapper {
			height: 700px;
			width: 100%;
		}

		.gantt_container {
			border-radius: 4px;
		}

		.gantt_grid_scale {
			background-color: transparent;
		}

		.gantt_hor_scroll {
			margin-bottom: 1px;
		}

    #my-form {
      position: absolute;
      top: 100px;
      left: 200px;
      z-index: 3;
      display: none;
      background-color: white;
      border: 1px solid gray;
      padding: 20px 20px 5px 20px;

      font-family: Tahoma;
      font-size: 10pt;

    }

    #my-form input[type="button"]{
      margin: 10px;
    }

</style>
