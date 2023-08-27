
resource "aws_lambda_function" "reflexvacuum" {
  function_name = "ReflexVacuum"

  # The bucket name as created earlier with "aws s3api create-bucket"
  s3_bucket = "offline.kamutiv.com"
  s3_key    = "reflexvacuum.zip"

  # "main" is the filename within the zip file (main.js) and "handler"
  # is the name of the property under which the handler function was
  # exported in that file.
  handler = "main.handler"
  runtime = "python3.10"

  role = "${aws_iam_role.main.arn}"
}
