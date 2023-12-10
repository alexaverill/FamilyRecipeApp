terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}
variable "region" {
  type = string
  default = "us-west-2"
}
data "aws_caller_identity" "current" {}

locals {
    account_id = data.aws_caller_identity.current.account_id
}
resource "aws_dynamodb_table" "recipe-dynamodb-table" {
  name           = "Recipes"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "recipeId"
  range_key      = "userId"

  attribute {
    name = "recipeId"
    type = "S"
  }
  attribute {
    name = "userId"
    type = "S"
  }
  global_secondary_index {
    name               = "UserIdIndex"
    hash_key           = "userId"
    range_key          = "recipeId"
    projection_type    = "ALL"
  }
  tags = {
    Name        = "recipe-app-table"

  }
}
resource "aws_dynamodb_table" "recipe-users-dynamodb-table" {
  name           = "RecipeUsers"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "userId"
  range_key      = "username"
  attribute {
    name = "userId"
    type = "S"
  }
  attribute {
    name="username"
    type = "S"
  }
  global_secondary_index {
    name = "usernameIndex"
    hash_key = "username"
    projection_type = "ALL"
  }
  tags = {
    Name        = "recipe-app-users-table"

  }
}