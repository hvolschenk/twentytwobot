# Please always stick to the latest named LTS version
FROM node:hydrogen-alpine

# Enable chokidar polling for filesystems that do not support inotify
# I think this is only necessary on Windows
ENV CHOKIDAR_USEPOLLING true
# The home directory for the `node` user
ENV HOME /home/node
# Log files will be piped here
ENV LOG_PATH /var/log/app
# Because `node_modules` will be a level above the application,
# set the path of where `node_modules` will be located
ENV NODE_PATH $HOME/application/node_modules

# Make the log directory
RUN mkdir -p $LOG_PATH && chown -R node:node $LOG_PATH

# Swap to the provided non-root user, `node`
USER node

# Install dependencies into a separate folder
RUN mkdir -p $HOME/application
WORKDIR $HOME/application
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install
ENV PATH $HOME/application/node_modules/.bin:$PATH

# Copy application source code into the container
RUN mkdir -p $HOME/application/app
WORKDIR $HOME/application/app
COPY --chown=node:node . .
