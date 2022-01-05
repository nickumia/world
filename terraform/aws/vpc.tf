resource "aws_vpc" "web_vpc" {
  cidr_block = "172.18.0.0/16"

  tags = {
    Name = "nlp-web-vpc"
  }
}

resource "aws_subnet" "nlp_subnet" {
  vpc_id            = aws_vpc.web_vpc.id
  cidr_block        = "172.18.10.0/24"
  availability_zone = "${var.region}a"

  tags = {
    Name = "nlp-private-subnet"
  }
}

resource "aws_network_interface" "private_nlp" {
  subnet_id   = aws_subnet.nlp_subnet.id
  private_ips = ["172.18.10.100"]

  tags = {
    Name = "nlp-private-interface"
  }
}
