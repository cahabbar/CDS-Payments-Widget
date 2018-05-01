This provides the generic Terraform source for provisioning AWS infrastructure for Payments Widget.

Additionally, the same bash environment scripts enable uploading of the code to S3.


The `Jenkinsfile` in this `/hosting` directory will be used to provision/deploy the infrastructure.

A `Jenkinsfile` in the root of the repo will be used for build/test/deploy of the code, though that deploy step will use the bash in this directory to upload.



Dependancies:
- AWS CLI tools ( pre-installed on instance )
- add terraform 0.11.5 https://releases.hashicorp.com/terraform/0.11.5/terraform_0.11.5_linux_amd64.zip - SSH into VM and install in /usr/local/bin
- 