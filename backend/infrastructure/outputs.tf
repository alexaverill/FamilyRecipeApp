output "base_url" {
  description = "Base URL for API Gateway"

  value = aws_apigatewayv2_stage.recipeApp_gateway_stage.invoke_url
}