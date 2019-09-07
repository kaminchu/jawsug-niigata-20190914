provider "aws" {
  region  = "ap-northeast-1"
  profile = "default"
}

resource "aws_s3_bucket" "site" {
  bucket = "jawsug-niigata-20190914-client"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
  policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::jawsug-niigata-20190914-client/*"
    }
  ]
}
EOF
}

resource "null_resource" "remove_and_upload_to_s3" {
  provisioner "local-exec" {
    command = "aws s3 sync ${path.module}/dist s3://${aws_s3_bucket.site.id}"
  }
}
