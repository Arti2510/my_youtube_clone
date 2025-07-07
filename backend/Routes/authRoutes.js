

import { register, login } from '../Controllers/authController.js';

export function authRoutes(app) {
    app.post('/register', register);
    app.post('/login', login);
}