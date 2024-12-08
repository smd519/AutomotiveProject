# Buzz Cars Web :)

### To make eslint happy:

- run `npm install` (you should see a node_modules folder created)

### To run eslint and prettier:

- `npm run lint:fix`
- `npm run prettier:fix`

### To start the development server outside of docker:

- run `npm run dev`

### Anytime a new dependency is installed via npm:

- run `docker-compose down -v`
- then run `docker compose up --build` to restart
