# Services

The services layer (some paradigma's also call this the application layer) receives requests from its upper position layer: the controllers.

Services represent the use-cases of your application (eg. register a user). It is a "thin" layer that orchestrates all the necessary requests to data access & domain objects to fullfil a business scenario.

## Rules

- Services don't know anything about controllers (routes), the layer above them. They are agnostic about which technology is used to handle requests that delegate to them. So in theory, that technology can be replaced by something completely else without touching any code in services and domain.
- Services do not contain any business logic and validation rules (that is the responsibility of the domain objects). They only wire the different data access & domain objects together for a specific use-case (orchestration).

## Naming convention

- \<entity_name\>.service.ts --> eg. user.service.ts
