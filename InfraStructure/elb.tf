#Create a new load balancer
resource "aws_elb" "spartanbalancer1" {
  
  name               = "spartanbalancer1-elb"
  availability_zones = ["us-west-1b", "us-west-1c"]

  listener {
    instance_port     = 80     # What port the instances are listening on
    instance_protocol = "HTTP" # What protocol the instances are using to serve traffic
    lb_port           = 80     # What port the load balancer is listening on
    lb_protocol       = "HTTP" # What protocol the load balancer is using to serve traffic
  }
}
