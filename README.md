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

### Install the Amazon CLI
- Register an AWS account (https://aws.amazon.com/)
- Download and set up the amazon cli (https://aws.amazon.com/cli/)


### Install Front-End Requirements
From project direcotry:
```
npm install
```

### Install Python Requirements for local editing:
```
pip3 install -r requirements.txt
```
(consider using a virtual environment https://docs.python.org/3/tutorial/venv.html)

### Upload Docker Images to amazon ECR 
(make sure you have an account set with permission to call ecr:GetAuthorizationToken )

- Create a repository in the Amazon EC2 Container Registry in your chosen geographic location ( for example https://ap-southeast-2.console.aws.amazon.com/ecs/home?region=ap-southeast-2#/repositories for Amazon's AP-Southeast-2 region)
 and create a new repository.
 
- In in your project files 'dockerrun.aws.json' and 'build_ecs.sh', wherever you see '[PUT YOUR REPOSITORY URI HERE]' (there are 4 places in total), paste in the URI for the repository you just created ( looks like `290492953667.dkr.ecr.ap-southeast-2.amazonaws.com/databoilerplate`).
WARNING, you cannot have a space in the variable definition in build_ecs.sh. That is:
```
REPOSITORY_URI=290492953667.dkr.ecr.ap-southeast-2.amazonaws.com/boilerplate
```
is good
```
REPOSITORY_URI = 290492953667.dkr.ecr.ap-southeast-2.amazonaws.com/boilerplate
```
is Bad


- run build_ecs.sh
```
bash build_ecs.sh
```

### Deploy app
In terminal run:
```
eb init
````
(Choose a location and accept defaults)

```
eb create
```
(Choose a name you like and then defaults)

```
eb deploy
```
(accept defaults)


### Set up DB
- Go to Amazon RDS and set up a postgres database in the same Availability zone as the app you just created.
Follow this guide here to link the database to your newly deployed app:
http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.RDS.html

- Modify [database] settings in config_files/prod_config.ini to match the settings of the database you just created


### Optional: Set up Auth0
- Go to www.auth0.com and create an account. Update the [Auth0] fields in config_files/prod_config.ini with your own settings. In the auth0 settings, be sure to add your domain to the allowed web origins and CORS origins. Also consider adding local host 


### Update app with new settings
- once again run build_ecs.sh and `eb deploy`


all done!

