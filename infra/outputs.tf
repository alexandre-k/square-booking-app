output "vultr_ssh_key_attributes" {
  description = "SSH key"
  value       = vultr_ssh_key.ssh_key
  sensitive   = true
}

output "vultr_instance_attributes" {
  description = "Created instance"
  value       = vultr_instance.square_booking_app
  sensitive   = true
}

output "ssh_string" {
  value = "ssh -i ~/.ssh/${var.ssh_key_name} ${var.ansible_user}@${vultr_instance.square_booking_app.main_ip}"
}