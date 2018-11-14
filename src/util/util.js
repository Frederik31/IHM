export function formatDate (dateIn) {
  return dateIn.substring(8) + '-' +
    dateIn.substring(5, 7) + '-' +
    dateIn.substring(0, 4)
}

export function getGanttTasks (config) {
  const tasks = config.data.map((element) => {
    var task = {
      'id': config.type + '-' + element.MSN,
      'text': element.MSN,
      'parent': config.type,
      'msn': element.MSN
    }
    if (element[config.fieldDateStart] && element[config.fieldDateStart].length === 10) {
      task['start_date'] = formatDate(element[config.fieldDateStart])
      task['o_start_date'] = task['start_date']
    }

    if (config.duration) {
      task['duration'] = config.duration
    } else {
      if (config.fieldDateEnd) {
        if (element[config.fieldDateEnd] && element[config.fieldDateEnd].length === 10) {
          task['end_date'] = formatDate(element[config.fieldDateEnd])
          task['o_end_date'] = task['end_date']
        }
      } else {
        task['duration'] = 1 // Default duration
      }
    }

    return task
  })
  tasks.unshift({
    'id': config.type,
    'text': config.type
  })
  return tasks
}

export function getMSNTasks (jsondata) {
  const tasks = jsondata.map((element) => {
    var task = {
      'id': element.MSN,
      'text': element.MSN,
      'msn': element.MSN
    }
    task['start_date'] = formatDate(element['Manut'])
    task['end_date'] = formatDate(element['Fin Prod'])
    task['o_start_date'] = task['start_date']
    task['o_end_date'] = task['end_date']
    return task
  })
  return tasks
}

export function getGanttPaintTasks (jsondata) {
  const type = 'paint'
  const tasks = jsondata.map((element) => {
    var task = {
      'id': type + '-' + element.MSN,
      'text': element.MSN,
      'parent': type,
      'msn': element.MSN
    }
    // Compute start date : Add 1 day to date corresponding to 'Fin Cabine'
    var date = new Date(element['Fin Cabine'])
    date.setDate(date.getDate() + 1)
    date = date.toISOString().substring(0, 10)
    task['start_date'] = formatDate(date)
    task['end_date'] = formatDate(element['Fin Paint'])
    task['o_start_date'] = task['start_date']
    task['o_end_date'] = task['end_date']

    return task
  })
  tasks.unshift({
    'id': type,
    'text': type
  })
  return tasks
}
