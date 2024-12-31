# Just contains basic docker concept and command for a decent quickstart using docker

* To check correct installation
```
npm run hello-world
```

* run:
```
docker run <name_of_the_image>
```

* to check which images are running:
```
docker ps
```

* to kill:
```
docker kill <container_id>
```

* running a simple image:
```
docker run mongo
docker run -p main_computer_port:image_default_port mongo
-d is for detached mode
```

* for postgre
```
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
-e is environment variables

docker exec -it <container_id> /bin/bash 
above line gets you in the postgre container just like we used to write psql in our terminal

then after exec command
psql -h localhost -d postgres -U postgres
```