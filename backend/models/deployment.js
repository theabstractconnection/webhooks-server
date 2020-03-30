import mongoose from 'mongoose'

const deploymentSchema = new mongoose.Schema({
  data: {},
  log: [],
  status: '',
})

const Deployment = mongoose.model('Deployment', deploymentSchema)
export default Deployment
