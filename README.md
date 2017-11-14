# Data-App-Boilerplate

Some boilerplate code for building applications that have a lot of data-science smarts in the background.
Ready to deploy to production on AWS in less than an hour!

Includes user authentication using Auth0.
- Python 3
- React.js
- React Redux
- Redux Sagas
- Auth0 authentication
- Postgres + SQLAlchemy
- FlaskMigrate
- Webpack
- Docker



## To deploy to Amazon:
### Install Docker locally
https://www.docker.com/

### Install Front-End Requirements
```
npm install
```

### Upload Docker Images to amazon ECR 
- Download and set up the amazon cli:

https://aws.amazon.com/cli/

(make sure you have an account set with permission to call ecr:GetAuthorizationToken )

- Navigate to the repository section of aws in your chosen location ( for example https://ap-southeast-2.console.aws.amazon.com/ecs/home?region=ap-southeast-2#/repositories)
 and create a new repository.
 
- In build_ecs.sh set REPOSITORY_URI to match that of the repository you just created. Eg:
`290492953667.dkr.ecr.ap-southeast-2.amazonaws.com/databoilerplate`
- run build_ecs.sh

### Deploy app
```
eb deploy
```

### Set up DB
- Go to Amazon RDS and set up a postgres database in the same Availability zone as the app you just created.
Follow this guide here to link the database to your newly deployed app:
http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.RDS.html

- Modify [database] settings in config_files/prod_config.ini to match the settings of the database you just created

-run build_ecs.sh and `eb deploy` one more time

all done!

