FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-18.04

ARG npm_registry

#Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

RUN apt update \
    && apt -y install \
    nodejs \
    npm \
    python2.7 \
    && su --login vscode --shell /bin/bash -c 'mkdir -p ~/{workspace,.{ssh,local/{bin,etc}}} \
    && [ -z "$npm_registry" ] || npm config set registry ${npm_registry} \
    && npm config set prefix ${HOME}/.local \
    && ln -s /usr/bin/python2.7 ~/.local/bin/python2' \
    # I do this to re-source the ~/.profile in order to add the user's personal bin to the PATH
    && su --login vscode --shell /bin/bash -c 'npm install -g npm node-linux-x64 \
    && npm cache clean --force \
    && mv ~/.npmrc ~/.local/etc/npmrc' \
    && apt -y remove \
    nodejs \
    npm \
    && apt -y autoremove \
    && apt -y clean \
    && rm -rf  /var/lib/apt/lists/*

# Switch back to dialog for any ad-hoc use of apt
ENV DEBIAN_FRONTEND=dialog
