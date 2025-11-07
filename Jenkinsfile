pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')  // set this in Jenkins
        DOCKERHUB_REPO = 'ayushshrestha/multi-service-app'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/IsthatAyus/microservices-docker.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker compose build
                '''
            }
        }

        stage('Run Containers') {
            steps {
                sh '''
                docker compose up -d
                '''
            }
        }

        stage('Test Services') {
            steps {
                sh '''
                curl -f http://localhost/auth/ || exit 1
                curl -f http://localhost/product/ || exit 1
                curl -f http://localhost/order/ || exit 1
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh '''
                echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin
                docker tag auth-service $DOCKERHUB_REPO:auth
                docker tag product-service $DOCKERHUB_REPO:product
                docker tag order-service $DOCKERHUB_REPO:order
                docker push $DOCKERHUB_REPO:auth
                docker push $DOCKERHUB_REPO:product
                docker push $DOCKERHUB_REPO:order
                '''
            }
        }

        stage('Clean Up') {
            steps {
                sh '''
                docker compose down
                '''
            }
        }
    }
}
