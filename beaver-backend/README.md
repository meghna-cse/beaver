# Beaver Laravel Backend

### Pre-Requisites
1. Composer
2. Mysql/Postgres
3. PHP

### How to Setup
1. Navigate into the directory
2. Create a copy of the .env.example and name it .env

    `cp .env.example .env`

3. Inside the .env file, define the db connections based on the hosting environment
4. Navigate into the directory

    `cd <your-directory>`

5. Install dependencies to setup the composer project
    
    `composer install`

6. Run the following command to migrate the database
    
    `php artisan migrate`

7. Run the following command to generate key for the laravel project

    `php artisan key:generate`
	
8. To run the backend:
	`php artisan serve`
	
	OR
	
	Use the postman collection to test the working of the endpoints