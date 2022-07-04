terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }
    vultr = {
      source  = "vultr/vultr"
      version = "2.11.3"
    }
  }
}

provider "vultr" {
  api_key     = var.VULTR_API_KEY
  rate_limit  = 700
  retry_limit = 3

}
provider "docker" {}

