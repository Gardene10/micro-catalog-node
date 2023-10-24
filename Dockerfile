FROM node:18-slim

# Instale o bash
RUN apt-get update && apt-get install -y bash && rm -rf /var/lib/apt/lists/*

# Configurar o bash
RUN echo "PS1='\w\$'" >> /root/.bashrc

RUN npm install -g @loopback/cli

RUN npm install -g nodemon

# Crie o diretório do aplicativo
RUN mkdir -p /home/node/app

WORKDIR /home/node/app
