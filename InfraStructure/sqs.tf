resource "aws_sqs_queue" "instance_queue" {
  name = "public-to-private-queue"
}

# IAM role for public instance (sender)
resource "aws_iam_role" "public_instance_role" {
  name = "public_instance_sqs_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# IAM policy for public instance to send messages
resource "aws_iam_role_policy" "public_instance_policy" {
  name = "public_instance_sqs_policy"
  role = aws_iam_role.public_instance_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "sqs:SendMessage",
          "sqs:GetQueueUrl",
          "sqs:GetQueueAttributes",
          "sqs:GetQueueUrl",
          "sqs:ListQueues"
        ]
        Resource = aws_sqs_queue.instance_queue.arn
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = "*"
      }
    ]
  })
}

# # Instance profile for the public instance
resource "aws_iam_instance_profile" "public_instance_profile" {
  name = "public_instance_profile"
  role = aws_iam_role.public_instance_role.name
}

# IAM role for private instance (receiver)
resource "aws_iam_role" "private_instance_role" {
  name = "private_instance_sqs_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# IAM policy for private instance to receive messages
resource "aws_iam_role_policy" "private_instance_policy" {
  name = "private_instance_sqs_policy"
  role = aws_iam_role.private_instance_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes",
          "sqs:GetQueueUrl",
          "sqs:ListQueues"
        ]
        Resource = aws_sqs_queue.instance_queue.arn
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = "*"
      }
    ]
  })
}

# Instance profile for the private instance
resource "aws_iam_instance_profile" "private_instance_profile" {
  name = "private_instance_profile"
  role = aws_iam_role.private_instance_role.name
}
