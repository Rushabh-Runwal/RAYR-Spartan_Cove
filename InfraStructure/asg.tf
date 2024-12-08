# Frontend Launch Template (existing)
resource "aws_launch_template" "spartanchat1" {
  name_prefix   = "spartanchat1"
  image_id      = "ami-0d53d72369335a9d6"
  instance_type = "t2.micro"
}

# Backend Launch Template (new)
resource "aws_launch_template" "spartanchat_backend" {
  name_prefix   = "spartanchat-backend"
  image_id      = "ami-0d53d72369335a9d6"
  instance_type = "t2.micro"
}

# Frontend ASG (modified)
resource "aws_autoscaling_group" "spartanchat1" {
  name                = "frontend-asg"
  desired_capacity    = 2
  max_size           = 4
  min_size           = 2
  
  vpc_zone_identifier = [
     "${element(module.vpc_west1.public_subnets, 0)}",  
     "${element(module.vpc_west1.private_subnets, 1)}"
  ]
 
  load_balancers = [aws_elb.spartanbalancer1.name]
  
  launch_template {
    id      = aws_launch_template.spartanchat1.id
    version = "$Latest"
  }
}

# Backend ASG (new)
resource "aws_autoscaling_group" "spartanchat_backend" {
  name                = "backend-asg"
  desired_capacity    = 2
  max_size           = 4
  min_size           = 2
  
  vpc_zone_identifier = [
   "${element(module.vpc_west1.private_subnets, 0)}",  # Replace with your backend subnet IDs
   "${element(module.vpc_west1.private_subnets, 1)}"
  ]
 
  launch_template {
    id      = aws_launch_template.spartanchat_backend.id
    version = "$Latest"
  }
}
