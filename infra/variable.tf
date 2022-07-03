variable "VULTR_API_KEY" {
  default     = "VULTR_API_KEY"
  description = "Exported environment variable"
  type        = string
}

variable "server_iso" {
  default     = "f28f0d76-65b5-4a7c-b576-a518426a1a35"
  description = "Fedora CoreOS"
  type        = string
}

variable "server_type" {
  default     = "vc2-1c-1gb"
  description = "Type of plan used to host a server"
  type        = string
}

variable "server_label" {
  default     = "Square booking app"
  description = "Label assigned to server"
  type        = string
}

variable "region" {
  default     = "sea"
  description = "America Seattle"
  type        = string
}
