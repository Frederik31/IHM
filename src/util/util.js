export function formatDate (dateIn) {
  return dateIn.substring(8) + '-' +
    dateIn.substring(5, 7) + '-' +
    dateIn.substring(0, 4)
}

export function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
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

function createTask (config) {
  var element = config.data
  var task = {
    'id': config.type + '-' + element.MSN,
    'text': config.type,
    'parent': element.MSN,
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
  var status = getRandomInt(0, 2)
  switch (status) {
    case 0:
      task.color = 'green'
      task.status = 'FINISHED'
      break
    case 1:
      task.color = 'blue'
      task.status = 'PENDING'
      break
    case 2:
      task.color = 'yellow'
      task.status = 'STARTED'
      break
  }
  return task
}

export function getMSNTasks (jsondata) {
  let tasks = []
  jsondata.forEach((element) => {
    // Parent task (By MSN)
    var task = {
      'id': element.MSN,
      'text': element.MSN,
      'msn': element.MSN
    }
    var status = getRandomInt(0, 2)
    switch (status) {
      case 0:
        task.color = '#00a65a'
        task.status = 'FINISHED'
        break
      case 1:
        task.color = 'blue'
        task.status = 'PENDING'
        break
      case 2:
        task.color = '#f39c12'
        task.status = 'STARTED'
        break
    }
    tasks.push(task)
    // Now create the subtasks (linked to the parent)
    var mTask = createTask({data: element, type: 'manut', fieldDateStart: 'Manut', duration: 1})
    tasks.push(mTask)
    var pTask = createTask({data: element, type: 'poncage', fieldDateStart: 'Poncage', duration: 1})
    tasks.push(pTask)
    var cTask = createTask({data: element, type: 'cabine', fieldDateStart: 'Start Cabine', fieldDateEnd: 'Fin Cabine'})
    tasks.push(cTask)
    var moTask = createTask({data: element, type: 'moteur', fieldDateStart: 'Start Moteur', fieldDateEnd: 'Fin Moteur'})
    tasks.push(moTask)
    var dTask = createTask({data: element, type: 'doc', fieldDateStart: 'Doc', duration: 1})
    tasks.push(dTask)
  })
  return tasks
}

export function getOLDMSNTasks (jsondata) {
  const tasks = jsondata.map((element) => {
    var task = {
      'id': element.MSN,
      'text': element.MSN,
      'msn': element.MSN
    }
    var status = getRandomInt(0, 2)
    switch (status) {
      case 0:
        task.color = 'green'
        task.status = 'FINISHED'
        break
      case 1:
        task.color = 'blue'
        task.status = 'PENDING'
        break
      case 2:
        task.color = 'yellow'
        task.status = 'STARTED'
        break
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

export function getWidgetTasks (data) {
  const keys = Object.keys(data)
  const lt = []
  for (var nb in data) {
    lt.push(data[nb].length)
  }
  return {keys, lt}
}

export function getPaintType (jsondata) {
  const paintTypes = jsondata.type.map((element) => {
    return element.name
  })
  return paintTypes
}

export function getPaintSubType (jsondata, paintType) {
  const paintTypeFiltered = jsondata.type.filter((element) => {
    return element.name === paintType
  })
  console.log(paintTypeFiltered)
  const paintSubTypes = paintTypeFiltered.map((element2) => {
    return element2.stype.map((stype) => {
      return stype.description
    })
  })
  console.log(paintSubTypes.reduce((memo, it) => (memo.concat(it)), []))
  return paintSubTypes.reduce((memo, it) => (memo.concat(it)), [])
}

export function getPaintDetail (jsondata, paintType, paintSubType) {
  const paintTypeFiltered = jsondata.type.filter((element) => {
    return element.name === paintType
  })
  console.log('paintTypeFiltered')
  console.log(paintTypeFiltered)
  const paintSubTypes = paintTypeFiltered.map((element2) => {
    return element2.stype.filter((stype) => {
      return stype.description === paintSubType
    })
  }).reduce((memo, it) => (memo.concat(it)), [])
  console.log('paintSubTypes')
  console.log(paintSubTypes)
  const paintDetails = paintSubTypes.map((subtype) => {
    return subtype.fields
  }).reduce((memo, it) => (memo.concat(it)), [])
  console.log('paintDetails')
  console.log(paintDetails)
  return paintDetails
}
