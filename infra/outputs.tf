output "vultr_instance_attributes" {
  description = "Created instance"
  value       = vultr_instance.booking_app.main_ip
}

output "ssh_connection" {
  value = "ssh -i ~/.ssh/${var.ssh_key_name} ${var.ansible_user}@${vultr_instance.booking_app.main_ip}"
}
