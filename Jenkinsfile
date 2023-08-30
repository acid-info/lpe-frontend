pipeline {
  agent { label 'linux' }

  parameters {
    string(
      name: 'IMAGE_TAG',
      defaultValue: params.IMAGE_TAG ?: '',
      description: 'Optional Docker image tag to push.'
    )
  }

  options {
    disableConcurrentBuilds()
    /* manage how many builds we keep */
    buildDiscarder(logRotator(
      numToKeepStr: '20',
      daysToKeepStr: '30',
    ))
  }

  environment {
    IMAGE_NAME = 'statusteam/logos-press-engine'
  }

  stages {
    stage('Build') {
      steps {
        script {
          withCredentials([
            usernamePassword(
              credentialsId: 'logos-press-engine-unbody-api-token',
              usernameVariable: 'UNBODY_PROJECT_ID',
              passwordVariable: 'UNBODY_API_KEY'
            ),
            string(
              credentialsId: 'logos-press-engine-simplecast-token',
              variable: 'SIMPLECAST_ACCESS_TOKEN'
            ),
            string(
              credentialsId: 'logos-press-engine-webhook-token',
              variable: 'REVALIDATE_WEBHOOK_TOKEN'
            ),
          ]) {
            image = docker.build(
              "${IMAGE_NAME}:${GIT_COMMIT.take(8)}",
              ["--build-arg=UNBODY_PROJECT_ID=${env.UNBODY_PROJECT_ID}",
               "--build-arg=UNBODY_API_KEY=${env.UNBODY_API_KEY}",
               "--build-arg=SIMPLECAST_ACCESS_TOKEN=${SIMPLECAST_ACCESS_TOKEN}",
               "--build-arg=REVALIDATE_WEBHOOK_TOKEN=${REVALIDATE_WEBHOOK_TOKEN}",
               "."].join(' ')
            )
          }
        }
      }
    }

    stage('Push') {
      steps { script {
        withDockerRegistry([
          credentialsId: 'dockerhub-statusteam-auto', url: ''
        ]) {
          image.push()
        }
      } }
    }

    stage('Deploy') {
      when { expression { params.IMAGE_TAG != '' } }
      steps { script {
        withDockerRegistry([
          credentialsId: 'dockerhub-statusteam-auto', url: ''
        ]) {
          image.push(params.IMAGE_TAG)
        }
      } }
    }
  }

  post {
    cleanup { cleanWs() }
  }
}
