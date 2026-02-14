import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check, Share2, Heart, Star, Users, Calendar } from "lucide-react";

const PROJECT_DATA = {
  1: {
    title: "SmileCare AI",
    tag: "Healthcare AI",
    price: 4999,
    currency: "$",
    bundleCount: 8,
    mainImage: "bg-gradient-to-br from-pink-500/30 to-red-500/30",
    rating: 4.8,
    reviews: 128,
    downloads: 1250,
    description: "Unlock the power of dental diagnostics with 8+ AI-powered projects covering Real-time dental analysis, Patient engagement tools, and Diagnostic algorithms, using cutting-edge frameworks like TensorFlow and PyTorch.",
    subProjects: [
      "Real-time Dental Diagnostics Engine",
      "Patient Engagement Platform",
      "AI-Powered Disease Detection",
      "Treatment Recommendation System",
      "Dental Imaging Processor",
      "Patient Records Manager",
      "Analytics Dashboard",
      "Mobile Application"
    ],
    features: [
      "8+ complete healthcare AI projects",
      "Medical-grade frameworks",
      "HIPAA-compliant datasets",
      "Production-ready code",
      "Real-time processing capabilities",
      "Mobile-optimized solutions"
    ],
    creator: {
      name: "Dr. Sarah Chen",
      title: "AI Healthcare Specialist",
      avatar: "🏥",
      followers: 2400,
      projects: 12,
      rating: 4.9,
      bio: "Specialized in healthcare AI and dental technology with 8+ years of experience"
    }
  },
  2: {
    title: "EcoTrack",
    tag: "Sustainability",
    price: 2999,
    currency: "$",
    bundleCount: 6,
    mainImage: "bg-gradient-to-br from-green-500/30 to-emerald-500/30",
    rating: 4.6,
    reviews: 94,
    downloads: 856,
    description: "Transform environmental awareness with 6+ sustainability projects featuring Carbon footprint tracking, Gamified user experience, and Real-time emissions monitoring, using modern frameworks like React and Django.",
    subProjects: [
      "Carbon Footprint Calculator",
      "Sustainability Dashboard",
      "Emission Tracker Widget",
      "Gamification Engine",
      "Community Challenges Platform",
      "Impact Report Generator"
    ],
    features: [
      "6+ complete sustainability projects",
      "Gamification mechanics included",
      "Real-time data tracking",
      "User-friendly interfaces",
      "API integration ready",
      "Mobile responsive design"
    ],
    creator: {
      name: "Marcus Green",
      title: "Sustainability Developer",
      avatar: "🌱",
      followers: 1800,
      projects: 9,
      rating: 4.7,
      bio: "Environmental tech enthusiast building solutions for a greener planet"
    }
  },
  3: {
    title: "Finlytics",
    tag: "Data Science",
    price: 5999,
    currency: "$",
    bundleCount: 12,
    mainImage: "bg-gradient-to-br from-blue-500/30 to-cyan-500/30",
    rating: 4.9,
    reviews: 167,
    downloads: 2100,
    description: "Master financial prediction with 12+ data science projects covering Predictive analytics, Risk assessment, Portfolio optimization, and Market analysis, using advanced libraries like scikit-learn and TensorFlow.",
    subProjects: [
      "Stock Price Predictor",
      "Risk Assessment Engine",
      "Portfolio Optimizer",
      "Market Anomaly Detector",
      "Fraud Detection System",
      "Credit Scoring Model",
      "Economic Trend Analyzer",
      "Options Pricing Calculator",
      "Sentiment Analysis for Stocks",
      "Backtesting Framework",
      "Automated Trading Bot",
      "Performance Attribution Tool"
    ],
    features: [
      "12+ advanced analytics projects",
      "Real market datasets included",
      "Backtesting framework",
      "Machine learning models",
      "Advanced statistical analysis",
      "Professional reporting tools"
    ],
    creator: {
      name: "Alex Patel",
      title: "Data Science & Finance Expert",
      avatar: "📊",
      followers: 3200,
      projects: 15,
      rating: 4.95,
      bio: "10+ years in quantitative finance and machine learning"
    }
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECT_DATA[id as keyof typeof PROJECT_DATA];
  const [cartItems, setCartItems] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setCartItems(cartItems + 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">🔧</span>
            </div>
            <span className="font-bold text-xl">AutomateX</span>
          </a>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-card rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2">
              <Link to="/signin" className="px-4 py-2 text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-all duration-300 text-sm">
                Sign In
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-sm">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{project.creator.avatar}</span>
                <div>
                  <h1 className="text-4xl font-bold">{project.title}</h1>
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold mt-2">
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(project.rating) ? "text-primary text-lg" : "text-muted text-lg"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span>{project.rating} ({project.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{project.downloads.toLocaleString()} downloads</span>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className={`h-64 ${project.mainImage} rounded-xl border border-border flex items-center justify-center`}>
              <div className="text-center space-y-2">
                <div className="text-6xl">{project.creator.avatar}</div>
                <p className="text-muted-foreground">{project.tag}</p>
              </div>
            </div>

            {/* What's Included */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                📦 What's Included
              </h2>
              <p className="text-muted-foreground">{project.bundleCount} Projects</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.subProjects.map((subProject, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-card/50 border border-border/50 rounded-lg hover:border-primary/30 transition-colors">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{subProject}</span>
                  </div>
                ))}
              </div>
              <button className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-4">
                View All Projects →
              </button>
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About this project</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Features</h2>
              <div className="space-y-3">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <div className="sticky top-20 space-y-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <div className="text-3xl font-bold">
                    {project.currency}
                    {project.price.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isAdded
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/50"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>

                {isAdded && (
                  <button className="w-full py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                    View Cart
                  </button>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 py-2 border border-border rounded-lg hover:bg-card/50 transition-colors flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button className="flex-1 py-2 border border-border rounded-lg hover:bg-card/50 transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </div>

              {/* Creator Profile */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-bold">Project Creator</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{project.creator.avatar}</div>
                    <div className="flex-1">
                      <h4 className="font-bold">{project.creator.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.creator.title}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {project.creator.bio}
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-background/50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold">{project.creator.followers.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">Followers</p>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold">{project.creator.projects}</div>
                      <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-primary" />
                        {project.creator.rating}
                      </div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>

                  <button className="w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold text-sm">
                    View Profile
                  </button>
                </div>
              </div>

              {/* More by Creator */}
              <div className="bg-card/30 border border-border rounded-xl p-4 space-y-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Explore {project.creator.projects - 1} more projects by {project.creator.name.split(' ')[0]}
                </p>
                <button className="text-primary font-semibold text-sm hover:text-primary/80">
                  View All →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
