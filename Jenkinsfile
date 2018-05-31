pipeline {
    agent any
    environment {
        AWS_PROFILE = sh(script: 'aws iam list-account-aliases | jq -jr .AccountAliases[0]', returnStdout: true)
        APIGW_BASE_NAME = 'PW-AWS'
    }
    parameters {
        choice(choices: 'us-east-1', description: 'What AWS region?', name: 'AWS_DEFAULT_REGION')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Build stuff...'
                sh '''
                    unset AWS_PROFILE
                    WSG_APIGW_ID=`aws apigateway get-rest-apis | jq -r '.items[] | { id: .id, name: .name}'|grep -B2 -A1 "$APP_ENV-$APIGW_BASE_NAME"| jq -jr .id`
                    WSG_APIGW_URL="https://$WSG_APIGW_ID.execute-api.$AWS_DEFAULT_REGION.amazonaws.com/$APP_ENV/"

                    echo "WSG_APIGW_URL=$WSG_APIGW_URL"
                    # we may need to run a sed command to sub in this value. or something
                    sed -i '#WSG_APIGW_URL#$WSG_APIGW_URL#g' app/components/ui-layout.js
                    ./go.sh
                '''
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
