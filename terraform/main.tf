terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "random_id" "bucket_suffix" {
  byte_length = 6
}

resource "aws_s3_bucket" "my_bucket" {
  bucket = "zenvy-app-bucket-${random_id.bucket_suffix.hex}"

  tags = {
    Name        = "zenvy-app-bucket"
    Environment = "Dev"
  }
}

# Enable versioning
resource "aws_s3_bucket_versioning" "my_bucket_versioning" {
  bucket = aws_s3_bucket.my_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Enable server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "my_bucket_encryption" {
  bucket = aws_s3_bucket.my_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Block all public access
resource "aws_s3_bucket_public_access_block" "my_bucket_public_access_block" {
  bucket = aws_s3_bucket.my_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
}

# --- ECR Repositories ---
resource "aws_ecr_repository" "client" {
  name                 = "zenvy-client"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

resource "aws_ecr_repository" "server" {
  name                 = "zenvy-server"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

# --- ECS Cluster ---
resource "aws_ecs_cluster" "main" {
  name = "zenvy-cluster"
}

# --- Default VPC & Subnets ---
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# --- Security Group for ECS Tasks ---
resource "aws_security_group" "ecs_tasks" {
  name        = "zenvy-ecs-tasks-sg"
  description = "Allow inbound access to client and server"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 4007
    to_port     = 4007
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# --- IAM Role for ECS Task Execution ---
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "zenvyECSTaskExecutionRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# --- Initial ECS Task Definitions (Dummy Images) ---
# We use a dummy image (e.g. nginx) so Terraform can create the service.
# The GitHub Action will immediately update this to the real application image.
resource "aws_ecs_task_definition" "client" {
  family                   = "zenvy-client-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name      = "zenvy-client-container"
    image     = "nginx:latest"
    essential = true
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
    }]
  }])
}

resource "aws_ecs_task_definition" "server" {
  family                   = "zenvy-server-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name      = "zenvy-server-container"
    image     = "nginx:latest"
    essential = true
    portMappings = [{
      containerPort = 4007
      hostPort      = 4007
    }]
  }])
}

# --- ECS Services ---
resource "aws_ecs_service" "client" {
  name            = "zenvy-client-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.client.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true
  }

  lifecycle {
    ignore_changes = [task_definition] # Let GitHub Actions manage this!
  }
}

resource "aws_ecs_service" "server" {
  name            = "zenvy-server-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.server.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true
  }

  lifecycle {
    ignore_changes = [task_definition] # Let GitHub Actions manage this!
  }
}
