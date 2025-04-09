# NestJS E-Commerce API

A modern e-commerce REST API built with NestJS, TypeORM, and PostgreSQL, featuring user authentication, product management, and category management.

## Features

- 👤 User Management

  - Authentication & Authorization
  - Role-based access control (Admin/User)
  - JWT-based authentication
  - Secure password hashing with bcrypt

- 🛍️ Product Management

  - CRUD operations
  - Product categories
  - Stock management
  - Product images

- 📁 Category Management
  - Hierarchical categories
  - Category-product relationships
  - Category metadata

## Tech Stack

- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **Validation:** Class Validator
- **Language:** TypeScript

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/ecommerce-project.git
cd ecommerce-project
```

2. Install dependencies

```bash
yarn install
```

3. Configure environment variables

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=ecommerce
JWT_SECRET=your_secret_key
```

4. Run database migrations

```bash
yarn migration:run
```

## Running the Application

```bash
# Development
yarn start:dev

# Production
yarn build
yarn start:prod
```

## API Endpoints

### Auth

```
POST /api/auth/signup - Register new user
POST /api/auth/signin - Login user
```

### Users

```
GET /api/users/me - Get current user
PATCH /api/users/me - Update current user
```

### Products

```
GET /api/products - List products
GET /api/products/:id - Get single product
POST /api/products - Create product (Admin)
PATCH /api/products/:id - Update product (Admin)
DELETE /api/products/:id - Delete product (Admin)
```

### Categories

```
GET /api/categories - List categories
GET /api/categories/:id - Get single category
POST /api/categories - Create category (Admin)
PATCH /api/categories/:id - Update category (Admin)
DELETE /api/categories/:id - Delete category (Admin)
```

## Database Schema

### Users

```typescript
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Roles, array: true })
  roles: Roles[];
}
```

## Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## Development Commands

```bash
# Generate migration
yarn migration:generate src/migrations/[MigrationName]

# Run migrations
yarn migration:run

# Revert migration
yarn migration:revert
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
