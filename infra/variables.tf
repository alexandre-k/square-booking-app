variable "VULTR_API_KEY" {
  description = "Exported environment variable"
  type        = string
}

variable "os_name" {
  type    = string
  default = "Debian 11 x64"
  description = "OS name in Vultr format"
}

variable "iso_name" {
  type    = string
  description = "Public ISO in Vultr"
}

variable "ssh_key_name" {
  description = "SSH key used"
  type    = string
}

variable "ansible_user" {
  description = "Ansible user used to run scripts"
  type    = string
}

variable "instance_name" {
  description = "Instance name used as hostname, label"
  type    = string
}

variable "region_name" {
  description = "Region name"
  type = string
}

variable "plan_name" {
  description = "Plan used for the instance"
  type = string
}
