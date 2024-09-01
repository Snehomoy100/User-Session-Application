# User session management assignment (Hashstack.finance Assignment)
## Submitted by Snehomoy


## Technologies Used

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Docker**

## How to Run the Application Locally

1. **Build and Run with Docker:**

   ```sh
   docker compose up --build
   ```
   Make sure you have Docker daemon installed locally on your system. Once this is up, it should create a container called `hashstack-finance-assignment`.

### Screenshot of docker container
![docker-container](https://i.postimg.cc/2yfJ4HW8/SCR-20240729-lehn.png)

2. **(Optional)** Add a .env file in root:
    **I have added the .env for setting it up on local with convenience (ideally a .env file should be created before running the application, & put the below mentioned in that .env file)**
    ```sh
    POSTGRES_DB= Enter postgres_db_name
    POSTGRES_USER= Enter postgres_db_user
    POSTGRES_PASSWORD= Enter postgres_db_password
    DB_HOST=postgres
    DB_PORT= Enter postgres_db_port
    PORT= Enter application_port
   ```

## How to Test the APIs with curl

1. **Create user API:**
   ```sh
    curl -X POST http://localhost:3000/create-user -H "Content-Type: application/json" -d '{"mobile": "7778889990", "username": "Snehomoy"}'
   ```

2. **To get an user using mobile number API:**
   ```sh
   curl "http://localhost:3000/get-user?mobile=7778889990"
   ```

3. **Logout user API:**
   ```sh
   curl -X POST http://localhost:3000/logout -H "Content-Type: application/json" -d '{"mobile": "7778889990"}'
   ```

## Screenshots of the outputs:
### submit-blog api:
![submit-blog](https://i.ibb.co/WGhrKLx/submit-blog.png)

### search-blog api:
![search-blog](https://i.postimg.cc/bJPqFXbh/search-blog.png)


## Project File Structure

```plaintext
/user-session-management
|-- app.js
|-- server.js
|-- .env
|-- Dockerfile
|-- docker-compose.yml
|-- /controllers
|   |-- userController.js
|-- /models
|   |-- userModel.js
|   |-- sessionModel.js
|-- /db
|   |-- index.js
|-- /utils
|   |-- generateSessionKey.js
|-- package.json
```

