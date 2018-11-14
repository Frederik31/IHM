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
      'parent': config.type
    }
    if (element[config.fieldDateStart] && element[config.fieldDateStart].length === 10) {
      task['start_date'] = formatDate(element[config.fieldDateStart])
    }

    if (config.duration) {
      task['duration'] = config.duration
    } else {
      if (config.fieldDateEnd) {
        if (element[config.fieldDateEnd] && element[config.fieldDateEnd].length === 10) {
          task['end_date'] = formatDate(element[config.fieldDateEnd])
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

export function getGanttPaintTasks (jsondata) {
  const type = 'paint'
  const tasks = jsondata.map((element) => {
    var task = {
      'id': type + '-' + element.MSN,
      'text': element.MSN,
      'parent': type
    }
    // Compute start date : Add 1 day to date corresponding to 'Fin Cabine'
    var date = new Date(element['Fin Cabine'])
    date.setDate(date.getDate() + 1)
    date = date.toISOString().substring(0, 10)
    task['start_date'] = formatDate(date)
    task['end_date'] = formatDate(element['Fin Paint'])

    return task
  })
  tasks.unshift({
    'id': type,
    'text': type
  })
  return tasks
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
