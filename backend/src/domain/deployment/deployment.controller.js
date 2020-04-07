/*eslint-disable no-unused-vars*/
import Deployment from './deployment.model'

const handleError = (res, err) => {
  if (err) {
    res.json({
      error: err,
    })
  }
}

const createDeployment = (req, res, next) => {
  var deployment = req.body

  Deployment.create(deployment, (err, deployment) => {
    handleError(res, err)
    res.json({
      message: 'Deployment created successfully',
    })
  })
}

const getDeployments = (req, res, next) => {
  Deployment.get({}, (err, deployments) => {
    handleError(res, err)
    res.json({
      deployments: deployments.reverse(),
    })
  })
}

const getDeployment = (req, res, next) => {
  Deployment.getById(req.params.id, (err, deployment) => {
    handleError(res, err)
    res.json({
      deployment: deployment,
    })
  })
}

const updateDeployment = (req, res, next) => {
  var deployment = {
    name: req.body.name,
    description: req.body.description,
  }
  Deployment.update({ _id: req.params.id }, deployment, (err, deployment) => {
    handleError(res, err)
    res.json({
      message: 'Deployment updated successfully',
    })
  })
}

const removeDeployment = (req, res, next) => {
  Deployment.delete({ _id: req.params.id }, (err, deployment) => {
    handleError()
    res.json({
      message: 'Deployment deleted successfully',
    })
  })
}

const Deployments = {
  createDeployment,
  getDeployments,
  getDeployment,
  updateDeployment,
  removeDeployment,
}

export default Deployments
