pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'make build'  // Adjust this command for your project’s build process
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'make test'  // Adjust this for your project’s test process
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed'
            deleteDir()  // Cleans up workspace after each run
        }
    }
}
