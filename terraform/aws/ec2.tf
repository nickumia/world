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

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t4g.small"
  associate_public_ip_address = false
  ebs_optimized = false
  key_name = var.ssh_key

  network_interface {
    network_interface_id = aws_network_interface.private_nlp.id
    device_index         = 0
  }

  tags = {
    Name = "nlp-web"
  }
}
