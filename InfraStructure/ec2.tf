resource "tls_private_key" "key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "key_pair" {
  key_name   = "key"
  public_key = tls_private_key.key.public_key_openssh

  provisioner "local-exec" {
    command = "echo '${tls_private_key.key.private_key_pem}' > ${path.module}/key.pem && chmod 0700 ${path.module}/key.pem"
  }
}

resource "aws_eip" "lb1" {
  instance = aws_instance.bastion_host1.id
  domain   = "vpc"
}
resource "aws_instance" "bastion_host1" {
  ami                    = "ami-0d53d72369335a9d6"
  instance_type          = "t2.nano"
  key_name              = aws_key_pair.key_pair.key_name
  availability_zone      = "us-west-1b"
  subnet_id             = module.vpc_west1.public_subnets[0]
  iam_instance_profile   = aws_iam_instance_profile.public_instance_profile.name
  vpc_security_group_ids = [aws_security_group.allow_ssh_http_west1.id]
}

resource "aws_instance" "private_instance1" {
  ami                    = "ami-0d53d72369335a9d6"
  instance_type          = "t2.nano"
  key_name              = aws_key_pair.key_pair.key_name
  availability_zone      = "us-west-1b"
  subnet_id             = module.vpc_west1.private_subnets[0]
  vpc_security_group_ids = [
    aws_security_group.icmp_sg_west1.id,
    aws_security_group.allow_ssh_http_from_bastion_west1.id
  ]
  iam_instance_profile   = aws_iam_instance_profile.private_instance_profile.name
  tags = {
    Name = "PrivateInstance1"
  }
}

resource "aws_eip" "lb2" {
  provider = aws.usw2
  instance = aws_instance.bastion_host2.id
  domain   = "vpc"
}
resource "aws_instance" "bastion_host2" {
  provider = aws.usw2
  ami      = "ami-0a7c94ee047f0ed09"
  instance_type = "t2.nano"
  key_name = aws_key_pair.key_pair.key_name
  availability_zone = "us-west-2b"
  subnet_id = module.vpc_west2.public_subnets[0]
  iam_instance_profile   = aws_iam_instance_profile.public_instance_profile.name
  vpc_security_group_ids = [aws_security_group.allow_ssh_http_west2.id]
}

resource "aws_instance" "private_instance2" {
  provider = aws.usw2
  ami      = "ami-0a7c94ee047f0ed09"
  instance_type = "t2.nano"
  key_name = aws_key_pair.key_pair.key_name
  availability_zone = "us-west-2b"
  subnet_id = module.vpc_west2.private_subnets[0]
  vpc_security_group_ids = [
    aws_security_group.icmp_sg_west2.id,
    aws_security_group.allow_ssh_http_from_bastion_west2.id
  ]
  iam_instance_profile   = aws_iam_instance_profile.private_instance_profile.name
  tags = {
    Name = "PrivateInstance2"
  }
}

output "instance" {
  value = [aws_instance.bastion_host1.public_ip,
    aws_instance.private_instance1.private_ip,
    aws_instance.bastion_host2.public_ip,
     aws_instance.private_instance2.private_ip
  ]
  description = "The public and private IP addresses of the instances"
}