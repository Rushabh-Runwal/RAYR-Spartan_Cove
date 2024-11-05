pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...SpartanCove'
                sh 'make build'  // Adjust this command for your project’s build process
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...SpartanCove'
                sh 'make test'  // Adjust this for your project’s test process
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed for SpartanCove'
            deleteDir()  // Cleans up workspace after each run
        }
    }
}
