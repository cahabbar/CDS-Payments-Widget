pipeline {
    agent any
    environment {
        AWS_PROFILE = sh(script: 'aws iam list-account-aliases | jq .AccountAliases[0] | tr -d [\\"\\\\n]', returnStdout: true)
    }
    parameters {
        choice(choices: 'us-east-1', description: 'What AWS region?', name: 'AWS_DEFAULT_REGION')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Build stuff...'
            }
        }
        stage('Test') {
            steps {
                echo 'Test stuff...'
            }
        }
        stage('Apply') {
            steps {
                echo 'Deploy...'
                dir("hosting") {
                  sh "./uploads3.sh"
                }
            }
        }
    }
}
