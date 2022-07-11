#!/bin/bash
pacman -Syyu --noconfirm
pacman -S git lxc docker docker-compose certbot certbot-nginx nginx mkcert webhook --noconfirm
systemctl enable --now docker
systemctl status docker
systemctl enable nginx
mkcert 144.202.86.75.vultrusercontent.com localhost 144.202.86.75
mv 144.202.86.75.vultrusercontent.com+2-key.pem cert.key
mv 144.202.86.75.vultrusercontent.com+2.pem cert.pem
systemctl start nginx
ssh-keygen -t ed25519 -N '' -f ~/.ssh/id_ed25519 <<< y
ls -l ~/.ssh
cat ~/.ssh/id_ed25519.pub
useradd -m -G docker -s /bin/bash guest
mkdir /home/guest/.ssh
cp /root/.ssh/authorized_keys /home/guest/.ssh/
cp /root/.ssh/id_ed25519.pub /home/guest/.ssh/
cp /root/.ssh/id_ed25519 /home/guest/.ssh/
chown -R guest:guest /home/guest/.ssh
reboot
