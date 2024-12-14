pipeline { 
    environment { 
        registry = "markemadd/txt-to-pdf-app" 
        registryCredential = 'dockerhub' 
        dockerImage = 'nodejsapp' 
    }
    agent any 
    stages {
        stage('Cloning Git') { 
            steps { 
                git 'https://github.com/markkemad/txt-to-pdf.git' 
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
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push() 
                    }
                } 
            }
        } 
        stage('Cleaning up') { 
            steps { 
                sh "docker rmi $registry:latest" 
            }
        }
    }
}
