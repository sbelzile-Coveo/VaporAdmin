# Vapor Admin

Build on top of [React-Vapor](https://github.com/coveo/react-vapor), handles the base functionalities of an administration console.

## Usage

## Register a sub-application

```typescript
Vapor.Application.registerApp("Section1", "App1", { routeOptions: { path: "/", component: () => <div/> }});
```

## Initialize
```typescript
document.addEventListener('DOMContentLoaded', function() {
    Vapor.Application.init(document.getElementById("app"));
});
```
