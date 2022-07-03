resource "vultr_instance" "square_booking_app" {
  plan   = var.server_type
  region = var.region
  iso_id = var.server_iso
  label  = var.server_label
  tag    = "booking_app"
}

# resource "docker_image" "booking-frontend" {
#   name         = "booking-frontend:latest"
#   keep_locally = false
#   ports {
#     internal = 5000
#     external = 5000
#   }
# }
