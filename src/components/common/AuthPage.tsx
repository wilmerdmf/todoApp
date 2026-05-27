import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks";

const AuthPage = () => {
  const {
    isLoginMode,
    isAuthLoading,
    formData,
    showPassword,
    handleChange,
    handleSubmit,
    handleToggleMode,
    handleTogglePassword,
  } = useAuth();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLoginMode ? "Welcome back" : "Create account"}</h2>
          <p>{isLoginMode ? "Sign in to your account" : "Start managing your tasks"}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="auth-input-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <div className="auth-password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete={isLoginMode ? "current-password" : "new-password"}
                minLength={6}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={handleTogglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="auth-submit-button" type="submit" disabled={isAuthLoading}>
            {isAuthLoading ? "Loading..." : isLoginMode ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="auth-toggle">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
          <button type="button" onClick={handleToggleMode}>
            {isLoginMode ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
