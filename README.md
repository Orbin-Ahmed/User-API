**Title:** User Authentication App with Product & Contact Management (Node.js & Express.js)

**Description:**

This Node.js and Express.js application provides a robust framework for user registration, login, product and contact list management, and various authentication mechanisms. It's designed to be a secure and scalable foundation for web applications that require user accounts, product data, and contact information handling.

**Features:**

- **User Authentication:**
    - Registration with email, password.
    - Login using email and password with secure password hashing.
    - Authentication types:
        - JWT (JSON Web Token) authentication
- **Product Management:**
    - Create, read, update, and delete products.
    - Secure storage and access of product data.
- **Contact List Management:**
    - Create, read, update, and delete contacts.
    - Secure storage and access of contact information.
- **Modular Design:**
    - Clean code structure for maintainability and scalability.
- **Error Handling:**
    - Proper error handling for a user-friendly experience.
- **Testing:**
    - Unit tests to ensure code functionality.

**Installation:**

1. Clone this repository:

   ```bash
   git clone https://github.com/Orbin-Ahmed/User-API.git
   ```

2. Navigate to the project directory:

   ```bash
   cd User-API
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

**Configuration:**

- Create a `.env` file in the project root directory to store sensitive information (database connection details, secret keys, etc.).
- Ensure the `.env` file is excluded from version control using a `.gitignore` file.

**Usage:**

1. Start the development server:

   ```bash
   npm start
   ```

2. The application will typically run on a default port (e.g., `http://localhost:3000`). Consult the console output for the specific port.

**License:**

This project is licensed under the MIT License (see the LICENSE file for details).
