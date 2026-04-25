# PreDel Blogging Platform API

## Overview

Personal project (Jun 2024 - Sep 2024) consisting of a REST API for a blogging platform.
The service handles user management, authentication, and blog post operations, exposing endpoints consumed by a separate Angular client application.

This API is part of a distributed setup and is not intended to be executed independently.

For full application execution (API + client + database), refer to the Docker Compose project:
[PreDel Blogging Platform](https://github.com/danielpredel/predel-blog.git)

## Features

* User registration and authentication (JWT-based)
* CRUD operations for blog posts
* User-specific content management
* RESTful API design
* Data persistence with MongoDB via Mongoose
* Middleware-based request validation and authorization

## Project Structure

```
src/
├── configs/
│   └── db.js                # Database connection setup
│
├── controllers/
│   ├── auth.controller.js  # Authentication endpoints
│   ├── user.controller.js  # User-related operations
│   └── post.controller.js  # Blog post endpoints
│
├── services/
│   ├── auth.service.js     # Authentication logic
│   ├── user.service.js     # User business logic
│   └── post.service.js     # Post business logic
│
├── models/
│   ├── user.model.js       # User schema
│   └── post.model.js       # Post schema
│
├── routes/
│   ├── auth.routes.js      # Auth routes
│   ├── user.routes.js      # User routes
│   ├── user.post.routes.js # User-Post routes
│   └── post.routes.js      # Post routes
│
├── middleware/
│   ├── auth.middleware.js  # JWT validation
│   ├── date.middleware.js
│   └── email.middleware.js
│
└── utils/
    └── mapper.js           # DTO/entity mapping helpers

app.js                      # Express app configuration
```

## API Overview

### Authentication

* POST `/api/auth/login`

### Users

* POST `/api/users` — Register user
* GET `/api/users/check-email` — Check email availability

### User Posts

* POST `/api/users/posts` — Create post
* GET `/api/users/posts/:id` — Get post for editing
* PATCH `/api/users/posts/:id` — Update post

### Posts

* GET `/api/posts` — Get all posts
* GET `/api/posts/:id` — Get post by id

## Notes

* Follows a layered architecture (controller -> service -> model)
* Uses Mongoose for schema definition and data access
* Stateless authentication via JWT
* Designed to be consumed by a separate frontend application
* Partial implementation: some planned endpoints and features were not completed
* Current version focuses on core flows (authentication, post creation, basic retrieval)
* API structure reflects an early-stage design and may not fully adhere to strict REST conventions


## Project Status

Archived – no active development.
Maintained as a portfolio project.
