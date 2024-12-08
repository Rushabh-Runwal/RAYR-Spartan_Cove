resource "aws_launch_template" "spartanchat1" {
  name_prefix   = "spartanchat1"
  image_id      = "ami-0d53d72369335a9d6"
  instance_type = "t2.nano"
  user_data     = filebase64("${path.module}/install_apache.sh")
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
