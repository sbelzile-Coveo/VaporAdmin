# Vapor Admin

Build on top of [React-Vapor](https://github.com/coveo/react-vapor), handles the base functionalities of an administration console.

## Usage

### Register a sub-application

```typescript
Vapor.Application.registerApp("Section1", "App1", { routeOptions: { path: "/", component: () => <div/> }});
```

### Register an header section

```typescript
Vapor.Application.registerHeaderSection("logo", { render: CoveoLogoHeaderSection});
```

### Initialize
```typescript
document.addEventListener('DOMContentLoaded', function() {
    Vapor.Application.init(document.getElementById("app"));
});
```

## Build
npm run build

## Demo
npm run build
./dist/index.html
