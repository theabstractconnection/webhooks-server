import Deployments from './deployment.controller'

const deploymentRoutes = router => {
  router.post('/create', Deployments.createDeployment)
  router.get('/get', Deployments.getDeployments)
  router.get('/get/:id', Deployments.getDeployment)
  router.put('/update/:id', Deployments.updateDeployment)
  router.delete('/remove/:id', Deployments.removeDeployment)
}

export default deploymentRoutes
