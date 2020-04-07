import Deployment from './deployment.model'

const handleError = (res, err) => {
  if (err) {
    res.json({
      error: err,
    })
  }
}

const createDeployment = (req, res) => {
  var deployment = req.body

  Deployment.create(deployment, (err) => {
    handleError(res, err)
    res.json({
      message: 'Deployment created successfully',
    })
  })
}

const getDeployments = (res) => {
  Deployment.get({}, (err, deployments) => {
    handleError(res, err)
    res.json({
      deployments: deployments.reverse(),
    })
  })
}

const getDeployment = (req, res) => {
  Deployment.getById(req.params.id, (err, deployment) => {
    handleError(res, err)
    res.json({
      deployment: deployment,
    })
  })
}

const updateDeployment = (req, res) => {
  var deployment = {
    name: req.body.name,
    description: req.body.description,
  }
  Deployment.update({ _id: req.params.id }, deployment, (err) => {
    handleError(res, err)
    res.json({
      message: 'Deployment updated successfully',
    })
  })
}

const removeDeployment = (req, res) => {
  Deployment.delete({ _id: req.params.id }, (err) => {
    handleError(res, err)
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
