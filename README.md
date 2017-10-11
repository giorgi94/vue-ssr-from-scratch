# Vue from scratch

This project is created directly by `npm init ...` 

This project uses `express` as its dev server. It is using server side rendering, `axios` for http requests and `vuex` partially to handle async data. It can resolve router and modify header, like title and meta.

```sh
# to build client and server bundles
npm run build

# to run project in development mode
npm run dev

# to run project in production mode
npm start

# to run project on 3000 port
PORT=3000 npm start
```

When working in development mode you can change/update your projects files and after browser refresh changes will take place, you won't need to restart server.