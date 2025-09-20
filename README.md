# Mini Blogging App

This project is a small-scale blogging platform built with modern web technologies. It showcases key features of Next.js 15 including Server Components, Server Actions and data-fetching strategies to create a fast, dynamic and scalable application.

---

### How to Run the Project

Follow these steps to set up and run the project locally.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ArshadChowdhury/mini-blogging-app.git
    cd mini-blogging-app
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up the database:**
    Create a `.env` file in the project root and add your database connection URL. But for local development, we'll use a SQLite database so we need to change this in schema.prisma - 
    ```env
    datasource db {
      provider = "sqlite"
      url = "file:./dev.db" 
    }
    ```

4.  **Run Prisma generation**
    This command will generate prisma & migration tables as necessary.
    ```bash
    npx prisma generate
    ```

5.  **Start the development server:**
    ```bash
    pnpm run dev
    ```

6.  **Open the application:**
    Your application will be running at `http://localhost:3000`.

---

### ✨ Features Implemented

This platform includes the following key features:

* **Homepage (`/`)**: Displays a list of blog posts with **infinite scroll** for a seamless user experience.
* **Post Details (`/post/[id]`)**: A dedicated page for viewing a single post's content.
* **Search Functionality (`/search`)**: Allows users to search for posts by their title or content.
* **Admin Page (`/admin`)**: A dedicated page to **create new blog posts** using a form. This form leverages **Server Actions** for secure and efficient data submission.

---

### 💻 Tech Stack and Choices

| Category | Technology/Choice | Reason |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** | Chosen for its powerful features like Server Components and Server Actions, which enable server-side rendering for improved performance and data security. The App Router provides a modern, flexible routing and data-fetching model. |
| **Styling** | **Tailwind CSS** | A utility-first CSS framework that allows for rapid UI development by writing styles directly in the markup. It's highly customizable and efficient. |
| **Database & ORM** | **Prisma** | A next-generation ORM that simplifies database access with a powerful, type-safe API. It handles migrations and database interactions efficiently, making development faster and less error-prone. |
| **Type Checking** | **TypeScript** | Used throughout the project to provide static typing. This helps catch errors early, improves code quality, and enhances developer productivity, especially in larger projects. |
| **Data Fetching** | **Server Components** | Data fetching is performed directly within Server Components (`async` components), eliminating the need for client-side API calls. This reduces bundle size and improves initial page load times. |
| **Mutations** | **Server Actions** | Implemented for creating new posts on the `/admin` page. Server Actions handle form submissions securely on the server, simplifying state management and reducing boilerplate code compared to traditional API routes. |
| **State Management** | **React Query (TanStack Query)** | It's not a hard dependency for this simple app that's why didn't implement React-Query but it's an excellent choice for managing server state, providing automatic caching, background fetching, and revalidation to ensure data is always fresh and responsive. |
