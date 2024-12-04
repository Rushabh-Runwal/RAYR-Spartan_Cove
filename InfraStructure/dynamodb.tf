# Provider for us-west-1
provider "aws" {
  alias  = "us_west_1"
  region = "us-west-1"
}

# Provider for us-west-2
provider "aws" {
  alias  = "us_west_2"
  region = "us-west-2"
}

####################################
# Users Table (us-west-1 & us-west-2)
####################################

# Users Table in us-west-1
resource "aws_dynamodb_table" "users_us_west_1" {
  provider       = aws.us_west_1
  name           = "Users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  # Primary Key
  attribute {
    name = "id"
    type = "S"
  }

  # Global Secondary Index for phoneNumber
  global_secondary_index {
    name            = "PhoneNumberIndex"
    hash_key        = "phoneNumber"
    projection_type = "ALL"
  }

  # Attributes
  attribute {
    name = "phoneNumber"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}

# Users Table in us-west-2
resource "aws_dynamodb_table" "users_us_west_2" {
  provider       = aws.us_west_2
  name           = "Users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  # Primary Key
  attribute {
    name = "id"
    type = "S"
  }

  # Global Secondary Index for phoneNumber
  global_secondary_index {
    name            = "PhoneNumberIndex"
    hash_key        = "phoneNumber"
    projection_type = "ALL"
  }

  # Attributes
  attribute {
    name = "phoneNumber"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}

####################################
# Groups Table (us-west-1 & us-west-2)
####################################

# Groups Table in us-west-1
resource "aws_dynamodb_table" "groups_us_west_1" {
  provider       = aws.us_west_1
  name           = "Groups"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  # Primary Key
  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}

# Groups Table in us-west-2
resource "aws_dynamodb_table" "groups_us_west_2" {
  provider       = aws.us_west_2
  name           = "Groups"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  # Primary Key
  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}

####################################
# Chats Table (us-west-1 & us-west-2)
####################################

# Chats Table in us-west-1
resource "aws_dynamodb_table" "chats_us_west_1" {
  provider       = aws.us_west_1
  name           = "Chats"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  # Primary Key
  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}

# Chats Table in us-west-2
resource "aws_dynamodb_table" "chats_us_west_2" {
  provider       = aws.us_west_2
  name           = "Chats"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  # Primary Key
  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}

####################################
# Messages Table (us-west-1 & us-west-2)
####################################

# Messages Table in us-west-1
resource "aws_dynamodb_table" "messages_us_west_1" {
  provider       = aws.us_west_1
  name           = "Messages"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  # Primary Key
  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}

# Messages Table in us-west-2
resource "aws_dynamodb_table" "messages_us_west_2" {
  provider       = aws.us_west_2
  name           = "Messages"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  # Primary Key
  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}

####################################
# Users_Groups Table (us-west-1 & us-west-2)
####################################

# Users_Groups Table in us-west-1
resource "aws_dynamodb_table" "users_groups_us_west_1" {
  provider       = aws.us_west_1
  name           = "Users_Groups"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "userID"
  range_key      = "groupID"

  # Composite Key
  attribute {
    name = "userID"
    type = "S"
  }

  attribute {
    name = "groupID"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}

# Users_Groups Table in us-west-2
resource "aws_dynamodb_table" "users_groups_us_west_2" {
  provider       = aws.us_west_2
  name           = "Users_Groups"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "userID"
  range_key      = "groupID"

  # Composite Key
  attribute {
    name = "userID"
    type = "S"
  }

  attribute {
    name = "groupID"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}

####################################
# Users_Chats Table (us-west-1 & us-west-2)
####################################

# Users_Chats Table in us-west-1
resource "aws_dynamodb_table" "users_chats_us_west_1" {
  provider       = aws.us_west_1
  name           = "Users_Chats"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "userID"
  range_key      = "chatID"

  # Composite Key
  attribute {
    name = "userID"
    type = "S"
  }

  attribute {
    name = "chatID"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}

# Users_Chats Table in us-west-2
resource "aws_dynamodb_table" "users_chats_us_west_2" {
  provider       = aws.us_west_2
  name           = "Users_Chats"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "userID"
  range_key      = "chatID"

  # Composite Key
  attribute {
    name = "userID"
    type = "S"
  }

  attribute {
    name = "chatID"
    type = "S"
  }

  tags = {
    Environment = "Production"
  }
}
