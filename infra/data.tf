data "vultr_plan" "plan" {
  filter {
    name = "id"
    values = [var.plan_name]
  }
}
data "vultr_os" "os" {
  filter {
    name   = "name"
    values = [var.os_name]
  }
}

data "vultr_iso_public" "iso" {
  filter {
    name   = "name"
    values = [var.iso_name]
  }
}

data "vultr_region" "region" {
  filter {
    name   = "id"
    values = [var.region_name]
  }
}

data "vultr_ssh_key" "key" {
  filter {
    name   = "name"
    values = [var.ssh_key_name]
  }
}
