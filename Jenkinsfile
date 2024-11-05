pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...SpartanCove'
                sh 'npm run clean'
                sh 'npm run build'  // Adjust this command for your project’s build process
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...SpartanCove'
                sh 'npm test'  // Adjust this for your project’s test process
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
