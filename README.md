# RestaurantSystem

## How to Run

Clone the project

### Backend

1. Open Visual Studio Code.
2. Navigate to the `backend` folder.
3. Run the following commands:
   `docker build -t <image-name-for-backend> .`
   `docker run -p 4000:4000 <image-name-for-backend>`

### Frontend

1. Open another instance of Visual Studio Code.
2. Navigate to the `frontend` folder.
3. Run the following commands:
   `docker build -t <image-name-for-frontend> .`
   `docker run -p 3000:3000 <image-name-for-frontend>`

### Database

1. Run the following commands:
   `docker pull mongodb/mongodb-community-server`
   `docker run --name <image-name-for-database> -d -p 27017:27017 mongodb/mongodb-community-server`
