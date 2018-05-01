This provides the generic Terraform source for provisioning AWS infrastructure for Payments Widget.

Additionally, the same bash environment scripts enable uploading of the code to S3.


The `Jenkinsfile` in this `/hosting` directory will be used to provision/deploy the infrastructure.

A `Jenkinsfile` in the root of the repo will be used for build/test/deploy of the code, though that deploy step will use the bash in this directory to upload.