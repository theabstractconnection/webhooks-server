import mongoose from 'mongoose'

const deploymentSchema = new mongoose.Schema(
  {
    webhookDeliveryId: {
      type: String,
      required: true,
    },
    data: {},
    logs: Array,
    status: {
      type: String,
      enum: ['Pending', 'Success', 'Failure'],
      required: true,
    },
  },
  { minimize: false }
)

export default deploymentSchema
