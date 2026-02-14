import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Crown, Zap, ShoppingCart, Book, Zap as Demo } from "lucide-react";

type UserRole = "admin" | "creator" | "customer" | "educator";

const DEMO_CREDENTIALS = {
  admin: {
    email: "admin@automatex.com",
    password: "Admin@123",
    name: "Admin Demo"
  },
  creator: {
    email: "creator@automatex.com",
    password: "Creator@123",
    name: "Creator Demo"
  },
  customer: {
    email: "customer@automatex.com",
    password: "Customer@123",
    name: "Customer Demo"
  },
  educator: {
    email: "educator@automatex.com",
    password: "Educator@123",
    name: "Educator Demo"
  }
};

const ROLES = [
  {
    id: "admin",
    label: "Admin",
    icon: Crown,
    description: "Manage platform & users",
    color: "from-red-500/20 to-pink-500/20",
    borderColor: "border-red-500/30"
  },
  {
    id: "creator",
    label: "Creator",
    icon: Zap,
    description: "Sell your projects",
    color: "from-orange-500/20 to-yellow-500/20",
    borderColor: "border-orange-500/30"
  },
  {
    id: "customer",
    label: "Customer",
    icon: ShoppingCart,
    description: "Buy & explore projects",
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30"
  },
  {
    id: "educator",
    label: "Educator",
    icon: Book,
    description: "Teach & guide learners",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30"
  }
];

export default function SignIn() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedRoleData = ROLES.find((r) => r.id === selectedRole)!;
  const RoleIcon = selectedRoleData.icon;
  const demoCredentials = DEMO_CREDENTIALS[selectedRole];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("userRole", selectedRole);
      localStorage.setItem("userEmail", email);
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">🔧</span>
            </div>
            <span className="font-bold text-xl">AutomateX</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          {/* Demo Credentials Alert */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <Demo className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-primary">Demo Account Available</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try AutomateX with pre-filled demo credentials for any role
                </p>
              </div>
            </div>
            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-medium text-sm"
            >
             
            </button>
                   </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">Select your role:</label>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id as UserRole)}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                      isSelected
                        ? `${role.borderColor} bg-card/80 border-current`
                        : "border-border bg-card/40 hover:bg-card/60"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-primary" : ""}`} />
                    <p className="text-sm font-semibold">{role.label}</p>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span>Remember me</span>
              </label>
              <Link to="#" className="text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2 border border-border rounded-lg hover:bg-card/50 transition-colors">
              Google
            </button>
            <button className="py-2 border border-border rounded-lg hover:bg-card/50 transition-colors">
              GitHub
            </button>
          </div>

     </div>
          {/* Sign Up Link */}
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
