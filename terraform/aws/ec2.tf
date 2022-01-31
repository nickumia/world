data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_key_pair" "default" {
  key_name   = "temp_default"
  public_key = var.ssh_keys
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  ebs_optimized = false
  key_name      = aws_key_pair.default.id
  subnet_id = module.vpc.public_subnets[0]
  vpc_security_group_ids = [module.vpc.default_security_group_id, aws_security_group.allow_web.id]

  root_block_device {
    delete_on_termination = true
    encrypted = true
    volume_size = 8
  }

  user_data = <<-EOF
		#! /bin/bash
    sudo apt-get update
		sudo apt-get install -y git make python3 python3-pip postgresql-client-common postgresql-client-12 libpq-dev nodejs npm
    git clone https://github.com/nickumia/nlp-web.git
    cd nlp-web
    touch /nlp-web/.env
    echo "POSTGRES_USER=${var.db_user}" >> /nlp-web/.env
    echo "POSTGRES_PASSWORD=${var.db_pass}" >> /nlp-web/.env
    echo "POSTGRES_DB=${var.db_name}" >> /nlp-web/.env
    echo "node.name=es01" >> /nlp-web/.env
    echo "discovery.type=single-node" >> /nlp-web/.env
    echo "bootstrap.memory_lock=true" >> /nlp-web/.env
    echo "ES_JAVA_OPTS=\"-Xms512m -Xmx512m\"" >> /nlp-web/.env
    echo "SERVER_NAME=kamutiv.com" >> /nlp-web/.env
    echo "FLASK_APP=main.py" >>  /nlp-web/.env
    echo "FLASK_RUN_PORT=8000" >> /nlp-web/.env
    echo "FLASK_ENV=production" >> /nlp-web/.env
    echo "DATABASE_URL=postgresql://${var.db_user}:${var.db_pass}@${aws_db_instance.nlpdb.address}:5432/${var.db_name}" >> /nlp-web/.env
    echo "POSTGRES_HOST=${aws_db_instance.nlpdb.address}" >> /nlp-web/.env
    echo "ELASTICSEARCH_URL=http://172.31.27.58:80" >> /nlp-web/.env
    make deploy
	EOF

  tags = {
    Name = "nlp-web"
  }

  depends_on = [
    aws_db_instance.nlpdb
  ]
}
