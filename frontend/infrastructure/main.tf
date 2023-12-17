terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "us-west-2"
}

# Create S3 Bucket
resource "aws_s3_bucket" "recipeapp-react-bucket" {
  bucket = "familyrecipeapp.com"

  tags = {
    Name        = "RecipeApp React App bucket"
  }
}
# temporarily setup s3 website 
resource "aws_s3_bucket_website_configuration" "recipe-app" {
  bucket = aws_s3_bucket.recipeapp-react-bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}
resource "aws_s3_bucket_public_access_block" "allow-website-access" {
  bucket = aws_s3_bucket.recipeapp-react-bucket.id
  block_public_acls       = false
  block_public_policy     = false
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.recipeapp-react-bucket.id

  policy = <<POLICY
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"PublicReadGetObject",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::${aws_s3_bucket.recipeapp-react-bucket.id}/*"]
    }
  ]
}
POLICY
}
# Create Cloudfront entry