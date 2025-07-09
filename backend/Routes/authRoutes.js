

import { register, login } from '../Controllers/authController.js';

export function authRoutes(app) {
    app.post('/api/auth/register', register);
    app.post('/api/auth/login', login);
}