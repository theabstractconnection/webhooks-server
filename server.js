const express = require( 'express' );
const bodyParser = require('body-parser');
const childProcess = require("child_process");
const crypto = require('crypto');

const app = express();

const sigHeaderName = 'X-Hub-Signature'

const API_SECRET = process.env.API_SECRET || '';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || '';
const GITHUB_ORGANIZATION = process.env.GITHUB_ORGANIZATION || '';
const SERVER_USERNAME = process.env.SERVER_USERNAME;

const PORT = process.env.PORT || 9000 ;

app.use(bodyParser.json())

app.post( '/', verifyPostData, ( req, res ) => {
  const sender = req.body.sender.login;
  const organization = req.body.repository.owner.login;
  const repositoryName = req.body.repository.name;
  const repositorySshUrl = req.body.repository.ssh_url;
  
 
  console.log(SERVER_USERNAME)
  console.log(repositoryName)
  console.log(repositorySshUrl)
  
  console.log(sender === GITHUB_USERNAME && organization === GITHUB_ORGANIZATION)
  // console.log( 'received webhook', req.body );

  if (sender === GITHUB_USERNAME && organization === GITHUB_ORGANIZATION) {
    deploy(req, res, repositoryName, repositorySshUrl);
  }
});

app.use((err, req, res, next) => {
  if (err) console.error(err)
  res.status(403).send('Request body was not signed or verification failed')
})

app.listen( PORT, () => console.log( `Webhook server started on port ${PORT}` ) );


function verifyPostData(req, res, next) {
  const payload = JSON.stringify(req.body)
  if (!payload) {
    return next('Request body empty')
  }

  const sig = req.get(sigHeaderName) || ''
  const hmac = crypto.createHmac('sha1', API_SECRET)
  const digest = Buffer.from('sha1=' + hmac.update(payload).digest('hex'), 'utf8')
  const checksum = Buffer.from(sig, 'utf8')
  if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
    return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`)
  }
  return next()
}

function deploy(req, res, repositoryName, repositorySshUrl) {
  console.log('DEPLOY')
  let deploymentProcessOutput = '';

  const deploymentProcess = childProcess.spawn('/bin/bash',
    [
      '-c', `
        export PROJECT_NAME="${repositoryName}";
        export GIT_URL="${repositorySshUrl}";
        export TARGET="${req.query.target || ''}";
        export SERVER_USERNAME="${SERVER_USERNAME}";
        ./deploy.sh 
      `
    ]
  )
 
  deploymentProcess.stdout.setEncoding('utf8');
  deploymentProcess.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
      data=data.toString();
      deploymentProcessOutput+=data;
      if (deploymentProcessOutput.includes('BUILDING SERVICES')){
        res.sendStatus(200);
      }
  });

  deploymentProcess.stderr.setEncoding('utf8');
  deploymentProcess.stderr.on('data', function(data) {
      console.log('stderr: ' + data);
      data=data.toString();
      deploymentProcessOutput+=data;
      return res.sendStatus(500);
  });
}