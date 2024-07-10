# base image
FROM node:16-alpine 

# WORKDIR tells where to put all the files
WORKDIR /app

# runs commands (RUN used for setting up the application)
RUN npm install
RUN tsc -b
RUN npx prisma generate

# first . tells from where to copy the files so . here tells the curr directory and second . tells where to put so second . tells to put in /app which is our working dir
COPY . .

EXPOSE 3000

# CMD used when we will have to run commands after our application starts running
CMD [ "node", "dist/index.js" ]

# then to build the image for current dir having dockerfile
# * in terminal write our these command: docker build -t name_of_the_image .  ##(. to tell where to build)
# then we can run image normally