# RestaurantSystem

## How to Run

Clone the project

### Backend

1. Open Visual Studio Code.
2. Navigate to the `backend` folder.
3. Run the following commands:
   `docker build -t <image-name-for-backend> .`
   `docker-compose up --build`

### Frontend

1. Open another instance of Visual Studio Code.
2. Navigate to the `frontend` folder.
3. Run the following commands:
   `docker build -t <image-name-for-frontend> .`
   `docker-compose up --build`

### Database

1. Create an account on mongodb (`https://cloud.mongodb.com/`).
2. Create a cloud database.
3. Retrieve the connection string from your database.
   It should look something like: `mongodb+srv://<username>:<password>@<dbname>.mongodb.net/`.
4. Add the connection string to the .env file in the `backend`.
   Example: `MONGO_URI=mongodb+srv://<username>:<password>@<dbname>.mongodb.net/?retryWrites=true&w=majority`.
