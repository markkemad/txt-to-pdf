pipeline {
    agent any

    environment {
        registry = "markemadd/txt-to-pdf-app"
        registryCredential = 'dockerhub'
        dockerImage = 'nodejsapp'
    }

    stages {
        stage('Cloning Git') {
            steps {
                git branch: 'main', url: 'https://github.com/markkemad/txt-to-pdf.git', credentialsId: 'github'
            }
        }

        stage('Building image') {
            steps {
                script {
                    dockerImage = docker.build registry + ":latest"
                }
            }
        }

        stage('Deploy image') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Cleaning up') {
            steps {
                script {
                    sh "docker rmi $registry:latest"
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker rm -f $(docker ps -aq) || true'
                sh 'docker rmi $registry:latest || true'
            }
        }
    }
}
