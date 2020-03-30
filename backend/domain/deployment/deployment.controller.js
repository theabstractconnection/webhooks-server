import Deployment from './deployment.model'

const createDeployment = (req, res, next) => {
  var deployment = req.body

  Deployment.create(deployment, (err, deployment) => {
    if (err) {
      res.json({
        error: err,
      })
    }
    res.json({
      message: 'Deployment created successfully',
    })
  })
}

const getDeployments = (req, res, next) => {
  Deployment.get({}, (err, deployments) => {
    if (err) {
      res.json({
        error: err,
      })
    }
    res.json({
      deployments: deployments,
    })
  })
}

const getDeployment = (req, res, next) => {
  Deployment.getById(req.params.id, (err, deployment) => {
    if (err) {
      res.json({
        error: err,
      })
    }
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
    if (err) {
      res.json({
        error: err,
      })
    }
    res.json({
      message: 'Deployment updated successfully',
    })
  })
}

const removeDeployment = (req, res, next) => {
  Deployment.delete({ _id: req.params.id }, (err, deployment) => {
    if (err) {
      res.json({
        error: err,
      })
    }
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
