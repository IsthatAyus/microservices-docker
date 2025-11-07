pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'ayushshrestha42460'
        DOCKERHUB_REPO = 'ayushshrestha42460/microservices'
        DOCKERHUB_CREDENTIALS = credentials('docker-credentials')
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/IsthatAyus/microservices-docker.git'
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
                docker rm -f auth-service-c product-service-c order-service-c mongodb  nginx-reverse-proxy || true
                docker compose down --remove-orphans || true
                docker compose up -d
                '''
            }
        }

        stage('Test Services') {
            steps {
                sh '''
                curl -f http://localhost:8080/auth/ || exit 1
                curl -f http://localhost:8081/product/ || exit 1
                curl -f http://localhost:8082/order/ || exit 1
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
                sh 'docker compose down'
            }
        }
    }
}
