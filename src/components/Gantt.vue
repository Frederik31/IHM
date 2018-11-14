<template>
    <div ref="gantt"></div>
</template>

<script>
import 'dhtmlx-gantt'

export default {
  name: 'gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },

  methods: {
    $_initGanttEvents: function () {
      this.events = []
      if (gantt.$_eventsInitialized) {
        return
      }
      var event = gantt.attachEvent('onTaskSelected', (id) => {
        let task = gantt.getTask(id)
        this.$emit('task-selected', task)
      })
      this.events.push(event)

      event = gantt.attachEvent('onTaskDrag', (id, mode, task, original) => {
        console.log(`onTaskDrag ${mode}`)
        var modes = gantt.config.drag_mode
        if (mode === modes.move) {
          var diff = task.start_date - original.start_date
          console.log(diff)
        }
      })
      this.events.push(event)

      event = gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
        task.color = 'orange'
        gantt.refreshTask(task.id)
        this.$emit('task-updated', id, 'updated', task)
      })
      this.events.push(event)

      gantt.$_eventsInitialized = true
    }
  },

  destroyed () {
    for (var i = 0; i < this.events.length; i++) {
      gantt.detachEvent(this.events[i])
    }
    this.events = []
    gantt.clearAll()
    gantt.$_eventsInitialized = false
  },

  mounted () {
    this.$_initGanttEvents()
    this.taskId = null

    // FPL : Customizing the lightbox
    gantt.showLightbox = (id) => {
      this.taskId = id
      var task = gantt.getTask(id)

      var form = document.getElementById('my-form')
      var input = form.querySelector("[name='description']")
      input.focus()
      input.value = task.text

      input = form.querySelector("[name='o_start_date']")
      input.value = task.o_start_date
      input = form.querySelector("[name='o_end_date']")
      input.value = task.o_end_date
      input = form.querySelector("[name='n_start_date']")
      input.value = task.start_date
      input = form.querySelector("[name='n_end_date']")
      input.value = task.end_date

      form.style.display = 'block'

      form.querySelector("[name='close']").onclick = () => {
        gantt.hideLightbox()
      }
    }

    gantt.hideLightbox = () => {
      document.getElementById('my-form').style.display = ''
      this.taskId = null
    }

    gantt.config.drag_progress = false
    gantt.config.drag_resize = false
    gantt.config.min_column_width = 30
    gantt.config.scale_height = 60
    gantt.config.date_scale = '%d'
    gantt.config.subscales = [
      { unit: 'month', step: 1, date: '%F, %Y' },
      { unit: 'year', step: 1, date: '%Y' }
    ]

    gantt.config.row_height = 22
    gantt.config.columns = [
      { name: 'text', label: 'Task name', width: '*', tree: true },
      { name: 'start_date', label: 'Start time', align: 'center' },
      { name: 'duration', label: 'Duration', align: 'center' }
    ]

    gantt.init(this.$refs.gantt)
    gantt.parse(this.$props.tasks)
  }
}
</script>

<style>
  @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
