# SwissApp: Swiss-system Tournament Manager

## Description
This application is a tool to manage tournaments using the Swiss system. It is designed to register players, generate rounds in a dynamic way based on the number of participants, manage pairings and calculate standings in real time.

It is ideal for competitive tournaments of board games, TCGs or sports where a fair and efficient method of matching players across multiple rounds is required. 

The development started taking into account an existing application (Tournament Operations Manager) due to their UI, which seems improvable. At first, it will handle the backend functionalities very basic so the main focus will be the use of a modern and fresh UI.

## Main Features
- **Players Management:** List the current players in the database with some personal info.
- **Tournament Creation:** Automatic configuration with a basic ruleset and a minimum of 4 players.
- **Round Generation:** Automatic pairing generation using the Monrad system for pairing generation.
- **Standings:** Updated players ranking after each round.
- **Intuitive User Interface:** React-based interaction with Tailwind CSS support.
- **Data Persistence:** Use of SQLite with Eloquent ORM to manage database access and updates.

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/guinotix/swiss-app.git
   ```
2. Go to project's directory:
   ```bash
   cd swiss-app
   ```
3. Install PHP and JavaScript dependencies:
   ```bash
   composer install
   npm install
   ```
4. Configure your environment:
   - Copy `.env.example` file and rename it as `.env`.
   - Configure the database and other variables in `.env`.
5. Genere the key of the application:
   ```bash
   php artisan key:generate
   ```
6. Execute database migrations and data seeders:
   ```bash
   php artisan migrate --seed
   ```
7. Compile the front-end:
   ```bash
   npm run dev
   ```
8. Inicialize the server:
   ```bash
   php artisan serve
   ```

## Current Status
- **Backend:**
  - Basic structure for tournaments, registrations, rounds and pairings.
  - Business validations to avoid bad tournament configuration.
- **Frontend:**
  - React components to show tournaments details, rounds and standings.
  - Modern styling with Tailwind CSS.
- **Database:**
  - Optimized relational design to manage multiple tournaments at the same time.

## Next Tasks (no particular order)
1. **Players Management:** (a) Allow registration for players as well as (b) registration on tournaments.
2. **Tournament Management:** Add standings view after each round.
2. **Single Elimination Rounds:** Add QF/SF/F rounds at the end of the tournament.
3. **Data Exportation:** Allow standings and resuts exportation in PDF or Excel files.
4. **User Authentication:** Add Admin/Player roles to integrate both parties to the desired use of the application.
5. **Notifications:** Send notifications to players about their current status in their tournaments.
6. **Pairing Optimization:** Add tie-breaking algorithm (Buchholz/Cumulative)
