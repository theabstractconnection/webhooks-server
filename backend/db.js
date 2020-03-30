import mongoose from 'mongoose'
import Deployment from './models/deployment'

const {
  MONGO_DB_HOSTNAME,
  MONGO_DB_PORT,
  MONGO_INITDB_DATABASE,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
} = process.env

const buildDatabaseURL = () => {
  let databaseURL
  if (!MONGO_INITDB_ROOT_USERNAME || !MONGO_INITDB_ROOT_PASSWORD) {
    databaseURL = `mongodb://${MONGO_DB_HOSTNAME}:${MONGO_DB_PORT}/${MONGO_INITDB_DATABASE}`
  } else {
    databaseURL = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_DB_HOSTNAME}:${MONGO_DB_PORT}/${MONGO_INITDB_DATABASE}?authSource=admin`
  }
  console.log(databaseURL)
  return databaseURL
}

const connectDatabase = async callback => {
  try {
    await mongoose.connect(buildDatabaseURL(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    callback()
  } catch (error) {
    console.log(error)
  }
}

const models = { Deployment }

export { connectDatabase }
export { models }
