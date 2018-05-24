pipeline {
    agent any
    environment {
        AWS_PROFILE = sh(script: 'aws iam list-account-aliases | jq -jr .AccountAliases[0]', returnStdout: true)
    }
    parameters {
        choice(choices: 'us-east-1', description: 'What AWS region?', name: 'AWS_DEFAULT_REGION')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Build stuff...'
                sh "./go.sh"
            }
        }
        stage('Test') {
            steps {
                echo 'Test stuff...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy...'
                dir("hosting") {
                  sh "./uploads3.sh"
                }
            }
        }
    }
}
