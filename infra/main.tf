
resource "vultr_ssh_key" "ssh_key" {
  name    = "vultr_key"
  ssh_key = file("~/.ssh/${var.ssh_key_name}")
}

resource "vultr_instance" "square_booking_app" {
  depends_on       = [vultr_ssh_key.ssh_key]
  plan             = var.server_type
  region           = var.region
  iso_id           = var.server_iso
  hostname         = var.instance_name
  label            = var.instance_name
  ssh_key_ids      = [vultr_ssh_key.ssh_key.id]
  tag              = var.instance_name
  enable_ipv6      = false
  backups          = "disabled"
  ddos_protection  = false
  activation_email = false

  connection {
    host     = self.main_ip
    user     = "core"
    type     = "ssh"
    password = self.default_password
  }

  # provisioner "file" {
  #   source      = "./known_hosts"
  #   destination = "/var/home/core/.ssh/known_hosts"
  # }

  # provisioner "remote-exec" {
  #   inline = [
  #     "chmod +x /var/home/core/provision.sh",
  #     "/var/home/core/provision.sh"
  #   ]
  # }
}


# resource "docker_image" "booking-frontend" {
#   name         = "booking-frontend:latest"
#   keep_locally = false
#   ports {
#     internal = 5000
#     external = 5000
#   }
# }
