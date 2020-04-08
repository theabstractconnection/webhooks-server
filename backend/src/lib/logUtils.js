export const formatLogData = (data) => {
  return data.split('\n').filter((d) => d)
}

export const appendToProcessLog = (fullLog, type, data) => {
  fullLog.push({
    type: type,
    output: data,
  })
}

export const buildLogMessage = (_id, type, data) => {
  return {
    event: 'log',
    _id,
    log: {
      type: type,
      output: data,
    },
  }
}
