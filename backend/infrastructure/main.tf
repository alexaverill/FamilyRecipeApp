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
    name               = "recipeIdIndex"
    hash_key           = "recipeId"
    range_key          = "userId"
    projection_type    = "ALL"
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
// Lambdas
module "create_recipe_lambda" {
  source = "./lambda_module"
  source_path =  "../${path.module}/lambdas/src/createRecipe"
  output_path = "${path.module}/createRecipe.zip"
  lambda_name = "createrecipe-lambda"
  handler_path = "index.handler"
}
module "get_recipes_lambda" {
  source = "./lambda_module"
  source_path =  "../${path.module}/lambdas/src/getRecipes"
  output_path = "${path.module}/getRecipes.zip"
  lambda_name = "get-recipes-lambda"
  handler_path = "index.handler"
}

#api gateway
resource "aws_apigatewayv2_api" "recipeapp-gateway" {
  name          = "RecipeAppsGateway"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["POST", "GET", "DELETE","OPTIONS"]
    allow_headers = ["content-type","authorization"]
    max_age = 300
  }
}
resource "aws_apigatewayv2_stage" "recipeApp_gateway_stage" {
  api_id = aws_apigatewayv2_api.recipeapp-gateway.id

  name        = "recipeapp_gateway_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}
resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.recipeapp-gateway.name}"

  retention_in_days = 30
}
resource "aws_cloudwatch_log_group" "api_gw_stage" {
  name = "/aws/api_gw/${aws_apigatewayv2_stage.recipeApp_gateway_stage.id}/example"

  retention_in_days = 30
}

# resource "aws_apigatewayv2_authorizer" "auth" {
#   # name          = "CognitoUserPoolAuthorizer"
#   # type          = "JWT"
#   # rest_api_id   = aws_apigatewayv2_api.familylistapp_gateway.id
#   # provider_arns = ["${aws_cognito_user_pool.pool.arn}"]
#   api_id           = aws_apigatewayv2_api.familylistapp_gateway.id
#   authorizer_type  = "JWT"
#   identity_sources = ["$request.header.Authorization"]
#   name             = "authorizer"

#   jwt_configuration {
#      audience = [aws_cognito_user_pool_client.client.id]
#     issuer   = "https://${aws_cognito_user_pool.pool.endpoint}"
#   }
# }

module "create_recipe_api" {
  permission_name = "create-recipe"
  source = "./api_endpoint_module"
  gateway_id=aws_apigatewayv2_api.recipeapp-gateway.id
  route="create-recipe"
  method="POST"
  lambda_arn = module.create_recipe_lambda.lambda_arn
  lambda_function_name = module.create_recipe_lambda.lambda_function_name
  region = var.region
  account_id = local.account_id
  auth_type = "NONE"
  authorizer_id = ""
  gateway_execution_arn = aws_apigatewayv2_api.recipeapp-gateway.execution_arn
}
module "get_recipes_api" {
  permission_name = "get-recipes"
  source = "./api_endpoint_module"
  gateway_id=aws_apigatewayv2_api.recipeapp-gateway.id
  route="get-recipes"
  method="GET"
  lambda_arn = module.get_recipes_lambda.lambda_arn
  lambda_function_name = module.get_recipes_lambda.lambda_function_name
  region = var.region
  account_id = local.account_id
  auth_type = "NONE"
  authorizer_id = ""
  gateway_execution_arn = aws_apigatewayv2_api.recipeapp-gateway.execution_arn
}