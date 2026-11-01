# RentRadar India

A rental discovery experience for India, built with React, TypeScript, and Spring Boot, backed by MySQL.

## What’s here

- Responsive rental discovery page with animated transitions and search filters
- Saved listings, owner listing form, and renter inquiry flow
- Spring REST API for listings, inquiries, moderation, and image uploads
- Listing approval workflow (`PENDING`, `APPROVED`, `REJECTED`)
- 18 Indian sample listings spanning Bengaluru, Pune, Mumbai, Hyderabad, Delhi, Chennai, Jaipur, Ahmedabad, and Kolkata, with rooms, apartments, houses, and condos
- Rent displayed and submitted in Indian rupees (INR)
- Demo listing cards so the experience works without a running API

## Run the frontend locally

Requirements: Node.js 20+

```powershell
npm install
npm run dev
```

The dev server is at `http://localhost:5173`. It proxies `/api` requests to `http://localhost:8080`.

## Run the API locally

Requirements: Java 17+ and Maven.

The API starts with an in-memory H2 database, so you can run the complete app without setting up a database:

```powershell
cd backend
mvn spring-boot:run
```

The local database is temporary and resets when the API stops. The H2 console is available at `http://localhost:8080/h2-console` while the API is running.

## Connect a hosted MySQL database

Create a MySQL database with a cloud database provider such as [Aiven](https://aiven.io/mysql), [Railway](https://railway.com), or [Amazon RDS](https://aws.amazon.com/rds/mysql/). Choose a region near your users (Mumbai, when available). Copy the provider's host, port, database name, username, and password into the backend deployment's environment-variable settings:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `jdbc:mysql://HOST:PORT/rentradar?sslMode=REQUIRED&serverTimezone=Asia/Kolkata` |
| `DATABASE_USERNAME` | Database username from the provider |
| `DATABASE_PASSWORD` | Database password from the provider |
| `DB_POOL_SIZE` | Optional connection-pool limit; defaults to `5` |
| `DDL_AUTO` | Optional Hibernate schema mode; defaults to `update` |

Use your provider's actual database name and SSL instructions in the JDBC URL. Keep credentials in the hosting provider's secret/environment settings; do not commit them to source control. The JDBC URL must start with `jdbc:mysql://`. The MySQL Connector/J driver is already included.

Set the hosted database variables in the terminal before starting Spring Boot:

```powershell
$env:SPRING_PROFILES_ACTIVE = "mysql"
$env:DATABASE_URL = "jdbc:mysql://HOST:PORT/rentradar?sslMode=REQUIRED&serverTimezone=Asia/Kolkata"
$env:DATABASE_USERNAME = "your-database-user"
$env:DATABASE_PASSWORD = "your-database-password"
cd backend
mvn spring-boot:run
```

Hibernate creates and updates the tables. Uploaded images are stored in `backend/uploads` by default; set `UPLOAD_DIR` to change the location.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/listings` | Approved listings; accepts `location`, `maxPrice`, `minBeds`, `type`, and `facility` |
| `POST` | `/api/listings` | Submit a listing for review |
| `GET` | `/api/owner/listings?email=...` | View an owner's listings |
| `GET` | `/api/moderation/listings` | View pending listings |
| `PATCH` | `/api/moderation/listings/{id}` | Approve or reject a listing with `{"status":"APPROVED"}` |
| `POST` | `/api/inquiries` | Send a renter inquiry |
| `POST` | `/api/uploads` | Upload one `file` image (JPEG, PNG, or WebP; up to 8 MB) |

The moderation and owner endpoints are intended for a trusted development environment; authentication and authorization are not configured.
