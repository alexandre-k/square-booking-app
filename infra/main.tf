resource "vultr_ssh_key" "ssh_key" {
  name    = var.ssh_key_name
  ssh_key = file("~/.ssh/${var.ssh_key_name}.pub")
}

resource "vultr_instance" "booking_app" {
  plan             = data.vultr_plan.plan.id
  region           = data.vultr_region.region.id
  os_id            = data.vultr_os.os.id
  # iso_id            = data.vultr_iso_public.iso.id
  hostname         = var.instance_name
  label            = var.instance_name
  ssh_key_ids      = [data.vultr_ssh_key.key.id]
  enable_ipv6      = false
  backups          = "disabled"
  ddos_protection  = false
  activation_email = false
}

resource "null_resource" "configure-booking-app" {
  connection {
    host     = vultr_instance.booking_app.main_ip
    user     = "core"
    type     = "ssh"
  }

  provisioner "file" {
    source      = "./scripts/provision.sh"
    destination = "/tmp/provision.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/provision.sh",
      "/tmp/provision.sh"
    ]
  }
}


# resource "docker_image" "booking-frontend" {
#   name         = "booking-frontend:latest"
#   keep_locally = false
#   ports {
#     internal = 5000
#     external = 5000
#   }
# }
