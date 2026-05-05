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

# --- ECR Repositories (Already created in previous run) ---
data "aws_ecr_repository" "client" {
  name = "zenvy-client"
}

data "aws_ecr_repository" "server" {
  name = "zenvy-server"
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

# --- Security Group for ECS Tasks (Already created in previous run) ---
data "aws_security_group" "ecs_tasks" {
  name = "zenvy-ecs-tasks-sg"
}

# --- IAM Role for ECS Task Execution (AWS Academy LabRole) ---
data "aws_iam_role" "lab_role" {
  name = "LabRole"
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
  execution_role_arn       = data.aws_iam_role.lab_role.arn

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
  execution_role_arn       = data.aws_iam_role.lab_role.arn

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
