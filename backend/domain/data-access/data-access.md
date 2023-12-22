# Data Access Objects

Put your data-access objects (DAO's or repositories) here: these are the objects that query your database (CRUD operations).

Your mapper objects are also placed here: they map the result of your queries (prisma objects) to your own domain objects.

## Rules

- Data access objects know the domain objects (not vice versa).
- They should not call other data access objects (services do orchestration).
- They map domain objects to database (prisma) objects and vice cersa.
- They can not call services and controllers.

## Naming convention

- Data access objects: \<entity_name\>.db.ts --> eg. user.db.ts
- Data mappers: \<entity_name\>.mapper.ts --> eg. user.mapper.ts
