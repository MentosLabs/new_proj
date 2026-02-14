import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Crown, Zap, ShoppingCart, Book, ArrowRight, Check } from "lucide-react";

type UserRole = "admin" | "creator" | "customer" | "educator";

const ROLES = [
  {
    id: "admin",
    label: "Admin",
    icon: Crown,
    description: "Manage platform & users",
  },
  {
    id: "creator",
    label: "Creator",
    icon: Zap,
    description: "Sell your projects",
  },
  {
    id: "customer",
    label: "Customer",
    icon: ShoppingCart,
    description: "Buy & explore projects",
  },
  {
    id: "educator",
    label: "Educator",
    icon: Book,
    description: "Teach & guide learners",
  }
];

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  // Creator fields
  companyName?: string;
  portfolioUrl?: string;
  // Educator fields
  institution?: string;
  subject?: string;
  // Customer fields
  phoneNumber?: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const selectedRoleData = ROLES.find((r) => r.id === selectedRole)!;
  const RoleIcon = selectedRoleData.icon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("userRole", selectedRole);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", formData.fullName);
      setIsLoading(false);
      navigate("/");
    }, 1000);
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
            <h1 className="text-4xl font-bold">Create Account</h1>
            <p className="text-muted-foreground">Join AutomateX and start your journey</p>
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">Choose your role:</label>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id as UserRole)}
                    type="button"
                    className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-primary bg-primary/10"
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

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-semibold">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>
            </div>

            {/* Creator Specific */}
            {selectedRole === "creator" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-sm font-semibold">
                    Company/Brand Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Your company name"
                    value={formData.companyName || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="portfolioUrl" className="text-sm font-semibold">
                    Portfolio URL
                  </label>
                  <input
                    id="portfolioUrl"
                    name="portfolioUrl"
                    type="url"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolioUrl || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </>
            )}

            {/* Educator Specific */}
            {selectedRole === "educator" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="institution" className="text-sm font-semibold">
                    Institution/School
                  </label>
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    placeholder="Your institution"
                    value={formData.institution || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold">
                    Subject/Expertise
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  >
                    <option value="">Select your subject</option>
                    <option value="programming">Programming</option>
                    <option value="data-science">Data Science</option>
                    <option value="ai-ml">AI/Machine Learning</option>
                    <option value="web-dev">Web Development</option>
                    <option value="design">Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            {/* Customer Specific */}
            {selectedRole === "customer" && (
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-semibold">
                  Phone Number (Optional)
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phoneNumber || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-semibold">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 rounded mt-1 flex-shrink-0"
              />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="#" className="text-primary hover:text-primary/80">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:text-primary/80 font-semibold">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
