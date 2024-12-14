pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub') // Jenkins credential ID for Docker Hub
        DOCKER_IMAGE = 'markemadd/txt-to-pdf-appp' 
        GIT_REPO = 'https://github.com/markkemad/txt-to-pdf.git' // Replace with your GitHub repo
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: env.GIT_REPO
            }
        }

        stage('Build Docker Image') {
            steps {
                dockerBuildAndPublish {
                    repositoryName(env.DOCKER_IMAGE)
                    tag('latest')
                    registryCredentialsId('docker-hub-credentials')
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    docker.image(env.DOCKER_IMAGE).run('--name nodejs-container -p 3001:3001')
                }
            }
        }

        stage('Test Container') {
            steps {
                script {
                    sh 'sleep 10' // Wait for the container to start up
                    sh "curl -f http://localhost:3001 || exit 1"
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                docker.withRegistry('', 'dockerhub') {
                    sh 'docker push $DOCKER_IMAGE:latest'
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    sh 'docker rm -f nodejs-container || true'
                    sh 'docker rmi $DOCKER_IMAGE:latest || true'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker rm -f nodejs-container || true'
                sh 'docker rmi $DOCKER_IMAGE:latest || true'
            }
        }
    }
}
