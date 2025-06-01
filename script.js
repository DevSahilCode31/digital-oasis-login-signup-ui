// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        
        this.init();
    }
    
    init() {
        this.applyTheme();
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }
    
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        
        // Add animation effect
        this.themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 300);
    }
    
    updateThemeIcon() {
        if (this.theme === 'dark') {
            this.themeIcon.className = 'fas fa-sun';
        } else {
            this.themeIcon.className = 'fas fa-moon';
        }
    }
}

// Form Validation
class FormValidator {
    constructor() {
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        this.nameRegex = /^[a-zA-Z\s]{2,50}$/;
    }
    
    validateEmail(email) {
        if (!email) {
            return { isValid: false, message: 'Email is required' };
        }
        if (!this.emailRegex.test(email)) {
            return { isValid: false, message: 'Please enter a valid email address' };
        }
        return { isValid: true, message: '' };
    }
    
    validatePassword(password) {
        if (!password) {
            return { isValid: false, message: 'Password is required' };
        }
        if (password.length < 8) {
            return { isValid: false, message: 'Password must be at least 8 characters long' };
        }
        if (!this.passwordRegex.test(password)) {
            return { 
                isValid: false, 
                message: 'Password must contain uppercase, lowercase, number and special character' 
            };
        }
        return { isValid: true, message: '' };
    }
    
    validateName(name) {
        if (!name) {
            return { isValid: false, message: 'Full name is required' };
        }
        if (!this.nameRegex.test(name)) {
            return { 
                isValid: false, 
                message: 'Please enter a valid full name (2-50 characters, letters only)' 
            };
        }
        return { isValid: true, message: '' };
    }
    
    validateConfirmPassword(password, confirmPassword) {
        if (!confirmPassword) {
            return { isValid: false, message: 'Please confirm your password' };
        }
        if (password !== confirmPassword) {
            return { isValid: false, message: 'Passwords do not match' };
        }
        return { isValid: true, message: '' };
    }
    
    checkPasswordStrength(password) {
        let score = 0;
        let feedback = [];
        
        if (password.length >= 8) score++;
        else feedback.push('At least 8 characters');
        
        if (/[a-z]/.test(password)) score++;
        else feedback.push('Lowercase letter');
        
        if (/[A-Z]/.test(password)) score++;
        else feedback.push('Uppercase letter');
        
        if (/\d/.test(password)) score++;
        else feedback.push('Number');
        
        if (/[@$!%*?&]/.test(password)) score++;
        else feedback.push('Special character');
        
        const strength = ['weak', 'weak', 'fair', 'good', 'strong'][score];
        const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][score];
        
        return { strength, strengthText, score, feedback };
    }
}

// Password Visibility Toggle
class PasswordToggle {
    constructor() {
        this.toggleButtons = document.querySelectorAll('.password-toggle');
        this.init();
    }
    
    init() {
        this.toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => this.togglePassword(e));
        });
    }
    
    togglePassword(e) {
        const button = e.currentTarget;
        const input = button.parentElement.querySelector('input');
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }
}

// Message System
class MessageSystem {
    constructor() {
        this.messageContainer = document.getElementById('messageContainer');
        this.message = document.getElementById('message');
        this.messageText = this.message.querySelector('.message-text');
        this.messageIcon = this.message.querySelector('.message-icon');
        this.messageClose = document.getElementById('messageClose');
        
        this.init();
    }
    
    init() {
        this.messageClose.addEventListener('click', () => this.hideMessage());
    }
    
    showMessage(text, type = 'success', duration = 5000) {
        this.messageText.textContent = text;
        this.message.className = `message ${type}`;
        
        // Set appropriate icon
        if (type === 'success') {
            this.messageIcon.className = 'fas fa-check-circle message-icon';
        } else if (type === 'error') {
            this.messageIcon.className = 'fas fa-exclamation-circle message-icon';
        }
        
        this.messageContainer.classList.add('show');
        
        // Auto hide after duration
        if (duration > 0) {
            setTimeout(() => this.hideMessage(), duration);
        }
    }
    
    hideMessage() {
        this.messageContainer.classList.remove('show');
    }
}

// Social Authentication
class SocialAuth {
    constructor(messageSystem) {
        this.messageSystem = messageSystem;
        this.init();
    }
    
    init() {
        // Google Sign In
        const googleBtns = document.querySelectorAll('.google-btn');
        googleBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleGoogleSignIn(btn));
        });
        
        // Facebook Sign In
        const facebookBtns = document.querySelectorAll('.facebook-btn');
        facebookBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleFacebookSignIn(btn));
        });
    }
    
    handleGoogleSignIn(button) {
        const originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        
        // Simulate Google OAuth flow
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = originalText;
            
            // Simulate success
            this.messageSystem.showMessage('Google sign-in successful! Welcome to Digital Oasis.', 'success');
        }, 2000);
    }
    
    handleFacebookSignIn(button) {
        const originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        
        // Simulate Facebook OAuth flow
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = originalText;
            
            // Simulate success
            this.messageSystem.showMessage('Facebook sign-in successful! Welcome to Digital Oasis.', 'success');
        }, 2000);
    }
}

// Form Manager
class FormManager {
    constructor() {
        this.validator = new FormValidator();
        this.messageSystem = new MessageSystem();
        this.socialAuth = new SocialAuth(this.messageSystem);
        
        this.loginForm = document.getElementById('loginForm');
        this.signupForm = document.getElementById('signupForm');
        this.loginFormElement = document.getElementById('loginFormElement');
        this.signupFormElement = document.getElementById('signupFormElement');
        
        this.showSignupBtn = document.getElementById('showSignup');
        this.showLoginBtn = document.getElementById('showLogin');
        
        this.init();
    }
    
    init() {
        // Form switching
        this.showSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSignupForm();
        });
        
        this.showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });
        
        // Form submissions
        this.loginFormElement.addEventListener('submit', (e) => this.handleLogin(e));
        this.signupFormElement.addEventListener('submit', (e) => this.handleSignup(e));
        
        // Real-time validation
        this.setupRealTimeValidation();
        
        // Password strength checker
        this.setupPasswordStrength();
        
        // Forgot password
        this.setupForgotPassword();
    }
    
    showSignupForm() {
        this.loginForm.classList.add('hidden');
        this.signupForm.classList.remove('hidden');
        this.clearAllErrors();
        
        // Focus first input
        setTimeout(() => {
            document.getElementById('signupName').focus();
        }, 100);
    }
    
    showLoginForm() {
        this.signupForm.classList.add('hidden');
        this.loginForm.classList.remove('hidden');
        this.clearAllErrors();
        
        // Focus first input
        setTimeout(() => {
            document.getElementById('loginEmail').focus();
        }, 100);
    }
    
    setupRealTimeValidation() {
        // Login form validation
        const loginEmail = document.getElementById('loginEmail');
        const loginPassword = document.getElementById('loginPassword');
        
        loginEmail.addEventListener('blur', () => this.validateField(loginEmail, 'email'));
        loginPassword.addEventListener('blur', () => this.validateField(loginPassword, 'password'));
        
        // Signup form validation
        const signupName = document.getElementById('signupName');
        const signupEmail = document.getElementById('signupEmail');
        const signupPassword = document.getElementById('signupPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        
        signupName.addEventListener('blur', () => this.validateField(signupName, 'name'));
        signupEmail.addEventListener('blur', () => this.validateField(signupEmail, 'email'));
        signupPassword.addEventListener('blur', () => this.validateField(signupPassword, 'password'));
        confirmPassword.addEventListener('blur', () => this.validateField(confirmPassword, 'confirmPassword'));
        
        // Real-time password confirmation
        confirmPassword.addEventListener('input', () => {
            const password = signupPassword.value;
            const confirm = confirmPassword.value;
            if (confirm) {
                this.validateField(confirmPassword, 'confirmPassword');
            }
        });
    }
    
    setupPasswordStrength() {
        const signupPassword = document.getElementById('signupPassword');
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        
        if (signupPassword && strengthFill && strengthText) {
            signupPassword.addEventListener('input', () => {
                const password = signupPassword.value;
                if (password) {
                    const strength = this.validator.checkPasswordStrength(password);
                    strengthFill.className = `strength-fill ${strength.strength}`;
                    strengthText.textContent = `${strength.strengthText} password`;
                    
                    if (strength.feedback.length > 0 && password.length > 0) {
                        strengthText.textContent += ` (Missing: ${strength.feedback.join(', ')})`;
                    }
                } else {
                    strengthFill.className = 'strength-fill';
                    strengthText.textContent = 'Password strength';
                }
            });
        }
    }
    
    setupForgotPassword() {
        const forgotPasswordLink = document.querySelector('.forgot-password');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleForgotPassword();
            });
        }
    }
    
    handleForgotPassword() {
        const email = document.getElementById('loginEmail').value.trim();
        
        if (!email) {
            this.messageSystem.showMessage('Please enter your email address first', 'error');
            document.getElementById('loginEmail').focus();
            return;
        }
        
        const emailValidation = this.validator.validateEmail(email);
        if (!emailValidation.isValid) {
            this.messageSystem.showMessage('Please enter a valid email address', 'error');
            document.getElementById('loginEmail').focus();
            return;
        }
        
        // Simulate forgot password process
        this.messageSystem.showMessage(`Password reset link sent to ${email}`, 'success');
    }
    
    validateField(field, type) {
        const value = field.value.trim();
        const errorElement = document.getElementById(field.id + 'Error');
        let validation;
        
        switch (type) {
            case 'email':
                validation = this.validator.validateEmail(value);
                break;
            case 'password':
                validation = this.validator.validatePassword(value);
                break;
            case 'name':
                validation = this.validator.validateName(value);
                break;
            case 'confirmPassword':
                const password = document.getElementById('signupPassword').value;
                validation = this.validator.validateConfirmPassword(password, value);
                break;
            default:
                validation = { isValid: true, message: '' };
        }
        
        this.showFieldError(field, errorElement, validation);
        return validation.isValid;
    }
    
    showFieldError(field, errorElement, validation) {
        if (validation.isValid) {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
        } else {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = validation.message;
                errorElement.classList.add('show');
            }
        }
    }
    
    clearAllErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('input');
        
        errorElements.forEach(element => {
            element.textContent = '';
            element.classList.remove('show');
        });
        
        inputElements.forEach(element => {
            element.classList.remove('error');
        });
    }
    
    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        // Validate all fields
        const emailValid = this.validateField(document.getElementById('loginEmail'), 'email');
        const passwordValid = this.validateField(document.getElementById('loginPassword'), 'password');
        
        if (emailValid && passwordValid) {
            // Simulate login process
            this.simulateLogin(email, password);
        } else {
            this.messageSystem.showMessage('Please fix the errors above', 'error');
        }
    }
    
    handleSignup(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate all fields
        const nameValid = this.validateField(document.getElementById('signupName'), 'name');
        const emailValid = this.validateField(document.getElementById('signupEmail'), 'email');
        const passwordValid = this.validateField(document.getElementById('signupPassword'), 'password');
        const confirmPasswordValid = this.validateField(document.getElementById('confirmPassword'), 'confirmPassword');
        
        if (nameValid && emailValid && passwordValid && confirmPasswordValid) {
            // Simulate signup process
            this.simulateSignup(name, email, password);
        } else {
            this.messageSystem.showMessage('Please fix the errors above', 'error');
        }
    }
    
    simulateLogin(email, password) {
        const submitBtn = this.loginFormElement.querySelector('.sign-in-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Simulate success (in real app, this would depend on API response)
            if (email === 'demo@example.com' && password === 'Demo123!') {
                this.messageSystem.showMessage('Welcome back to your Digital Oasis! Login successful.', 'success');
                // In real app: redirect to dashboard
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);
            } else {
                this.messageSystem.showMessage('Invalid credentials. Try demo@example.com / Demo123!', 'error');
            }
        }, 2000);
    }
    
    simulateSignup(name, email, password) {
        const submitBtn = this.signupFormElement.querySelector('.sign-in-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Simulate success
            this.messageSystem.showMessage(`Welcome to Digital Oasis, ${name}! Account created successfully.`, 'success');
            
            // Clear form
            this.signupFormElement.reset();
            this.clearAllErrors();
            
            // Reset password strength indicator
            const strengthFill = document.getElementById('strengthFill');
            const strengthText = document.getElementById('strengthText');
            if (strengthFill && strengthText) {
                strengthFill.className = 'strength-fill';
                strengthText.textContent = 'Password strength';
            }
            
            // Switch to login form after a delay
            setTimeout(() => {
                this.showLoginForm();
                this.messageSystem.showMessage('Please sign in with your new account', 'success');
            }, 2000);
        }, 2000);
    }
}

// Input Animation Handler
class InputAnimationHandler {
    constructor() {
        this.inputs = document.querySelectorAll('input');
        this.init();
    }
    
    init() {
        this.inputs.forEach(input => {
            // Handle placeholder animation
            input.addEventListener('focus', () => this.handleFocus(input));
            input.addEventListener('blur', () => this.handleBlur(input));
            
            // Check if input has value on page load
            if (input.value) {
                input.classList.add('has-value');
            }
            
            // Monitor value changes
            input.addEventListener('input', () => {
                if (input.value) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        });
    }
    
    handleFocus(input) {
        input.parentElement.classList.add('focused');
    }
    
    handleBlur(input) {
        input.parentElement.classList.remove('focused');
    }
}

// Accessibility Handler
class AccessibilityHandler {
    constructor() {
        this.init();
    }
    
    init() {
        // Add keyboard navigation support
        this.setupKeyboardNavigation();
        
        // Add ARIA labels and descriptions
        this.setupAriaLabels();
        
        // Handle focus management
        this.setupFocusManagement();
    }
    
    setupKeyboardNavigation() {
        // Allow Enter key to submit forms
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
                const form = e.target.closest('form');
                if (form) {
                    const submitBtn = form.querySelector('.sign-in-btn');
                    if (submitBtn && !submitBtn.disabled) {
                        submitBtn.click();
                    }
                }
            }
        });
        
        // Allow Escape key to close messages
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const messageContainer = document.getElementById('messageContainer');
                if (messageContainer.classList.contains('show')) {
                    messageContainer.classList.remove('show');
                }
            }
        });
    }
    
    setupAriaLabels() {
        // Add aria-describedby for error messages
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            const errorElement = document.getElementById(input.id + 'Error');
            if (errorElement) {
                input.setAttribute('aria-describedby', errorElement.id);
            }
        });
        
        // Add aria-live for dynamic content
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.setAttribute('aria-live', 'polite');
        messageContainer.setAttribute('aria-atomic', 'true');
    }
    
    setupFocusManagement() {
        // Focus management is handled in FormManager
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }
        });
        
        // Monitor form interaction performance
        this.monitorFormPerformance();
    }
    
    monitorFormPerformance() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const startTime = performance.now();
                
                // Monitor validation time
                setTimeout(() => {
                    const endTime = performance.now();
                    console.log('Form Validation Time:', endTime - startTime, 'ms');
                }, 0);
            });
        });
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new PasswordToggle();
    new FormManager();
    new InputAnimationHandler();
    new AccessibilityHandler();
    new PerformanceMonitor();
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Console welcome message
    console.log('%c🌟 Welcome to Digital Oasis!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Login System Loaded Successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cDemo Credentials:', 'color: #10b981; font-weight: bold;');
    console.log('Email: demo@example.com');
    console.log('Password: Demo123!');
    
    // Add some visual flair
    console.log('%c✨ Features:', 'color: #f093fb; font-weight: bold;');
    console.log('• Light/Dark theme toggle');
    console.log('• Real-time form validation');
    console.log('• Password strength indicator');
    console.log('• Social authentication simulation');
    console.log('• Mobile responsive design');
    console.log('• Accessibility features');
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment the following lines if you want to add PWA capabilities
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // In production, you might want to send this to an error tracking service
});

// Add some Easter eggs for developers
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konami[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konami.length) {
            console.log('%c🎉 Konami Code Activated! Welcome to the Digital Oasis Developer Zone!', 'color: #f093fb; font-size: 18px; font-weight: bold;');
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 3000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});