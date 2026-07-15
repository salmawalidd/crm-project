# Keystone CRM

1. Clone the repository and open the project.
2. In `backend`, run `composer install`, copy `.env.example` to `.env`, and configure MySQL.
3. Run `php artisan key:generate` and `php artisan migrate --seed`.
4. Start Laravel with `php artisan serve`.
5. In `frontend`, run `npm install` and `npm run dev`.