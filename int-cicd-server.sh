#!/bin/bash

# Update packages
sudo apt-get update

# Install packages
sudo apt-get install -y openssh-server docker.io

# Install ngrok and localtunnel using npm
sudo apt-get install -y npm
sudo npm install -g ngrok localtunnel

# Configure SSH to listen on any port
sudo sed -i 's/#Port 22/Port 0/g' /etc/ssh/sshd_config
sudo service ssh restart
