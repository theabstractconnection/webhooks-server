import mongoose from 'mongoose'
import deploymentSchema from './deployment.schema'

deploymentSchema.statics = {
  create(data, cb) {
    var deployment = new this(data)
    deployment.save(cb)
  },
  get(query, cb) {
    this.find(query, cb)
  },
  getById(id, cb) {
    this.findById(id, cb)
  },
  update(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb)
  },
  delete(query, cb) {
    this.findOneAndDelete(query, cb)
  },
}

const Deployment = mongoose.model('Deployment', deploymentSchema)
export default Deployment
