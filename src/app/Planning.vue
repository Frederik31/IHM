<template lang="html">
  <div class="container-fluid">
    <h1>Planning</h1>
    <div class="col-md-12" v-if="!loading">
        <gantt class="gantt_wrapper panel" :tasks="tasks" @task-updated="logTaskUpdate" @link-updated="logLinkUpdate" @task-selected="selectTask"></gantt>
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
      loading: true,
      tasks: {},
      selectedTask: null,
      messages: []
    }
  },
  created () {
    services.ganttapi.getGantt()
    .then((response) => {
      console.log(response.data)
      const jsondata = response.data

      const manutTasks = util.getGanttTasks({data: jsondata, type: 'manut', fieldDateStart: 'Manut', duration: 1})
      const poncageTasks = util.getGanttTasks({data: jsondata, type: 'poncage', fieldDateStart: 'Poncage', duration: 1})
      const cabineTasks = util.getGanttTasks({data: jsondata, type: 'cabine', fieldDateStart: 'Start Cabine', fieldDateEnd: 'Fin Cabine'})
      const paintTasks = util.getGanttPaintTasks(jsondata)
      const moteurTasks = util.getGanttTasks({data: jsondata, type: 'moteur', fieldDateStart: 'Start Moteur', fieldDateEnd: 'Fin Moteur'})
      const docTasks = util.getGanttTasks({data: jsondata, type: 'doc', fieldDateStart: 'Doc', duration: 1})

      const tasks = manutTasks
        .concat(poncageTasks)
        .concat(cabineTasks)
        .concat(paintTasks)
        .concat(moteurTasks)
        .concat(docTasks)

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
      let message = `Task ${mode}: ${id} ${text}`
      this.addMessage(message)
    },

    logLinkUpdate (id, mode, link) {
      let message = `Link ${mode}: ${id}`
      if (link) {
        message += ` ( source: ${link.source}, target: ${link.target} )`
      }
      this.addMessage(message)
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
</style>
