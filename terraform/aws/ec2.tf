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

  network_interface {
    network_interface_id = aws_network_interface.private_nlp.id
    device_index         = 0
  }

  root_block_device {
    delete_on_termination = true
    encrypted = true
    volume_size = 8
  }

  user_data = <<-EOF
		#! /bin/bash
    sudo apt-get update
		sudo apt-get install -y git python3 python3-pip postgresql-client-common postgresql-client-12 nodejs npm
    git clone https://github.com/nickumia/nlp-web.git
    cd nlp-web
    pip3 install -r requirements.txt
		echo "<h1>Deployed via Terraform</h1>" | sudo tee /var/www/html/index.html
	EOF

  tags = {
    Name = "nlp-web"
  }
}
