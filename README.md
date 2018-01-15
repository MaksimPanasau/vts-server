# Server for Vacation Tracking System

Vacation tracking system helps managing employees vacation requests

## Installation

* Execute ```npm install``` in the root folder

## Prerequisites

* Ensure MongoDB is up and running

## Development

### Configuration

Create ```server/config/config.json``` with the following structure:
```
{
  "test": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/helmes-vts",
    "JWT_SECRET": "secret"
  },
  "development": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/helmes-vts-test",
    "JWT_SECRET": "secret"
  }
}
```
Use your values for each constant

### Start

Execute ```npm run start-dev``` or ```npm run start-watch```

The last one is responsive to the code changes

### Test

Execute ```npm run test``` or ```npm run test-watch```

The last one is responsive to the code changes

## Deployment

Execute ```npm start```, providing `PORT`, `MONGODB_URI` and `JWT_SECRET` as environment variables on app startup
