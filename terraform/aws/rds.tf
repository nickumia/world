data "aws_kms_alias" "db" {
  name = "alias/aws/rds"
}

resource "aws_db_instance" "nlpdb" {
  allocated_storage    = 10
  engine               = "postgres"
  engine_version       = "12.8"
  instance_class       = "db.t2.micro"
  name                 = var.db_name
  username             = var.db_user
  password             = var.db_pass
  parameter_group_name = "default.postgres12"
  skip_final_snapshot  = true

  availability_zone = "${var.region}a"
  db_subnet_group_name = module.vpc.database_subnet_group_name
  # storage_encrypted = true
  # kms_key_id = data.aws_kms_alias.db.id
}
