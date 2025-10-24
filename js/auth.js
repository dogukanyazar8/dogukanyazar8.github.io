// Authentication Module
// Handles user login, logout, and session management

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.initAuthStateListener();
    }

    // Listen for auth state changes
    initAuthStateListener() {
        if (typeof auth !== 'undefined') {
            auth.onAuthStateChanged((user) => {
                this.currentUser = user;
                this.handleAuthStateChange(user);
            });
        }
    }

    // Handle auth state changes
    handleAuthStateChange(user) {
        const isAdminPage = window.location.pathname.includes('/admin/');
        const isLoginPage = window.location.pathname.includes('/admin/login.html');

        if (isAdminPage && !isLoginPage) {
            if (!user) {
                // Redirect to login if not authenticated
                window.location.href = '/admin/login.html';
            }
        } else if (isLoginPage && user) {
            // Redirect to dashboard if already logged in
            window.location.href = '/admin/dashboard.html';
        }
    }

    // Login with email and password
    async login(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    }

    // Logout
    async logout() {
        try {
            await auth.signOut();
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Get user display name
    getUserDisplayName() {
        return this.currentUser ? this.currentUser.email : 'Guest';
    }
}

// Initialize auth manager
const authManager = new AuthManager();
window.authManager = authManager;
