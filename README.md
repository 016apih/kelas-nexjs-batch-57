This is a Next.js project bootstrapped with create-next-app.

## clone repo
   ```bash
   git clone https://github.com/016apih/kelas-nexjs-batch-57.git
   ```

## Getting Started with docker
   First, run the development server:

   ```bash
   docker-compose up --build
   ```

## Getting Started with local dev
   - install
      ```bash
         npm install
      ```

   - initialisasi prisma
      ```bash
         npx prisma init
      ```

   - migrate model
      ```bash
         npx prisma migrate
      ```

   - run local dev
      ```bash
         npm run dev
         # or
         yarn dev
         # or
         pnpm dev
         # or
         bun dev
      ```

Open http://localhost:3000 with your browser to see the result.
