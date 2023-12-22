# Domain model

In this folder you put the most important objects of your application: your domain objects.

Domain objects represent your **business entities** (eg user, counter, profile,...) and besides the data, they contain all the **business and validation rules**.

## Rules

-   Domain objects are the lowest layer of your architecture, so they can only call other domain objects.
-   As a consequence, domain objects cannot call services and controllers from your domain objects. They should not now anything about layers above them.
-   Domain objects don't call data access objects, they are called by data access objects.

## Naming convention

-   \<entity_name\>.ts --> eg. user.ts
