# Controllers

The Controller layer of your architecture is the top layer of your back-end application and the entry point for all front-end requests to this back-end.

In this layer you put all your Express routes that delegate all requests to the service layer. In this way, the service layer doesn't need to know anything about which technology is used to handle requests.

## Rules

- The controller layer only knows about its lower positioned layer: the services
- There should be minimal logic in its methods: handle requests, delegate to services and return the results of the service requests as JSON.

## Naming convention

- \<entity_name\>.routes.ts --> e.g. user.routes.ts
