resource "aws_launch_template" "spartanchat1" {
  name_prefix   = "spartanchat1"
  image_id      = "ami-0d53d72369335a9d6"
  instance_type = "t2.nano"
}

resource "aws_autoscaling_group" "spartanchat1" {
  availability_zones = ["us-west-1b", "us-west-1c"]
  desired_capacity   = 2
  max_size           = 4
  min_size           = 2
 
  load_balancers = [aws_elb.spartanbalancer1.name]
  launch_template {
    id      = aws_launch_template.spartanchat1.id
    version = "$Latest"
  }
}

resource "aws_launch_template" "spartanchat2" {
  provider      = aws.usw2
  name_prefix   = "spartanchat2"
  image_id      = "ami-0a7c94ee047f0ed09"
  instance_type = "t2.nano"
}
resource "aws_autoscaling_group" "spartanchat2" {
  provider           = aws.usw2
  availability_zones = ["us-west-2b", "us-west-2c"]
  desired_capacity   = 2
  max_size           = 4
  min_size           = 2
 
  load_balancers = [aws_elb.spartanbalancer2.name]
  launch_template {
    id      = aws_launch_template.spartanchat2.id
    version = "$Latest"
  }
}