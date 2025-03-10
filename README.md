# Vehicle Booking Application - WheelBook

## Overview

This is a Full Stack application for booking vehicles. Users can select a vehicle based on various criteria and book it for a specific duration.

## Tech Stack

### Backend

- **Database:** PostgreSQL
- **Backend Framework:** Node.js, NestJS
- **API:** GraphQL
- **ORM:** Prisma

### Frontend

- **Framework:** React
- **UI Library:** Material UI

## Features

- Step-by-step form for vehicle booking
- Dynamic filtering based on user input
- Date range selection for booking duration
- Validation for user inputs
- Responsive UI using Material UI

## Installation

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/AtuI-Yadav/WheelBook.git
   ```
2. Navigate to the server folder:
   ```sh
   cd server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```sh
   DATABASE_URL=postgresql://user:password@localhost:5432/your_db
   ```
5. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```
6. Seed the database with initial data:
   ```sh
   npm run seed
   ```
7. Start the server:
   ```sh
   npm run wheelbook-server
   ```

### Frontend Setup

1. Navigate to the client folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

- Open the frontend in your browser at `http://localhost:5173`
- Follow the step-by-step form to book a vehicle
- Backend runs at `http://localhost:=3000/graphql`

## License

This project is licensed under the MIT License.
