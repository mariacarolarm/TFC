export const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };
export const invalidPasswordLoginBody = { email: 'admin@admin.com', password: 'invalid_password' };
export const invalidEmailLoginBody = { email: 'invalid_email', password: 'secret_admin' };