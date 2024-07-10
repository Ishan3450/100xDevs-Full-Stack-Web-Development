Viewing all the volume
```docker volume ls```

Creating a volume
``` docker volume create volume_database ```

Mounting a mongo db to volume we've created
```docker run -v volume_database:/data/db -p 27017:27017 mongo```




```docker network ls```

Creating a network
```docker network create new_network_name```

Linking an image to the network (here --name is super important)
```docker run -d -v volume_database:/data/db --name mongoTest --network new_network_name -p 27017:27017 mongo```

Now instead of locahost:port in url we have to write mongoTest (--name thing) to start communication