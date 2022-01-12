# GlobalWebIndex Engineering Challenge

## Go Back-end app

This Go API is built using the Gin web framework, and Ginkgo for testing. It uses a PostgreSQL DB for storing relational information about cats, breeds and image urls. A simple Bearer token authentication has been implemented and the Redis cache instance has been used to give an extra help on JWT management. 
The actual image assets are stored on a AWS S3 bucket with public access permissions. The following sections describes briefly the API structure and interface.

### Endpoints

**Images Controller**
1. Get random cats          : GET api/v1/cats/random
2. Get cats by breed id     : GET api/v1/cats?breed_id=1
3. Get cats                 : GET api/v1/cats?page=1&pageSize=10

**Favourites Controller**
1. Get favourites           : GET api/v1/user/favourites
2. Post favourite           : POST api/v1/user/favourites
3. Delete favourite         : DELETE api/v1/user/favourites/1

**Breeds Controller**
1. Get breeds               : GET api/v1/breeds?page=1&pageSize=10
2. Get breed by Id          : GET api/v1/breeds/1

**User Controller**
1. Create user              : POST api/v1/user
2. Login user               : POST api/v1/user/token
3. Logout user              : DELETE api/v1/user/token

**Version Controller**
1. Get Version              : GET api/v1/version

## Infrastructure

1. **PostgreSQL** Database for storing Image metadata, favourites, breeds and user info
2. **Redis** cache for temporarily storing user tokens. This enables us for token revocation
3. **AWS S3** Bucket for storing the actual images
4. **Docker** for running app, db, cache (possibly on EC3)

## Database

**Tables**
1. Cats, stores all the cat images
2. Breeds, is a table for storing cat breeds
3. Users, stores information about users / credentials
4. Favourites, stores user favourite cat images

## Deployment

The local [Dockerfile](Dockerfile) can be used to build and run the app on a golang docker image.
