# Family Recipe App
This is a serverless react app that is intended to be used to store and share recipes across family members. The main goal was to create a central repository for all our recipes so that we wouldn't have to continue to text images of recipes back and forth. 




## Setup
Setup for this application will require and AWS account, as well as having terraform installed on your system. 

### Backend
1. In ``` backend/infrastructure/``` run:

    1.1 ``` terraform init ```
    
    1.2 ``` terraform plan ```

    1.3 ``` terraform apply ```

    1.4 **Note this will create AWS resources**

### Frontend
1. Create a .env file that contains the following information that is output from the backend terraform run 
``` 
REACT_APP_API_URL= # url for api gateway created above
REACT_APP_USERPOOL_ID= # aws cognito userpool id
REACT_APP_REGION= #Likely us-east-1 or us-west-2
REACT_APP_POOL_CLIENT_ID= # aws cognito app pool id
``` 
2. Run ``` npm run build ``` in ``` frontend/recipeapp```
3. In ```frontend/infrastructure``` Run:
    
    3.1 ``` terraform init ```
    
    3.2 ``` terraform plan ```

    3.3 ``` terraform apply ```
4. Run ./deploy.sh replacing the bucketname with the bucket created by terraform. 
