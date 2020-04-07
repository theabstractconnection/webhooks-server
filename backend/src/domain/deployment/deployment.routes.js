import Deployments from './deployment.controller'

const deploymentRoutes = (router) => {
  router.post('/', Deployments.createDeployment)
  router.get('/', Deployments.getDeployments)
  router.get('/:id', Deployments.getDeployment)
  router.put('/:id', Deployments.updateDeployment)
  router.delete('/:id', Deployments.removeDeployment)
}

export default deploymentRoutes
