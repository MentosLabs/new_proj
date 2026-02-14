import { ArrowRight, Zap, Shield, Cpu, TrendingUp, Lock, Clock, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Index() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl">AutomateX</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
            <Link to="/projects" className="hover:text-primary transition-colors">Marketplace</Link>
            {userRole === "admin" && (
              <Link to="/admin" className="text-primary font-semibold hover:text-primary/80 transition-colors">Admin Panel</Link>
            )}
          </div>
          <div className="flex items-center gap-3">
            {userRole ? (
              <>
                <span className="text-sm text-muted-foreground capitalize">({userRole})</span>
                <button
                  onClick={() => {
                    localStorage.removeItem("userRole");
                    localStorage.removeItem("userEmail");
                    window.location.reload();
                  }}
                  className="px-6 py-2 text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/10 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="px-6 py-2 text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-all duration-300">
                  Sign In
                </Link>
                <Link to="/signup" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float-up"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-up" style={{ animationDelay: "1s" }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Next Generation Automation</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse">
                Industrial Operations
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Harness the power of Industry 4.0 with intelligent automation, real-time analytics, and seamless IoT integration. Take your manufacturing to the future.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link to="/projects" className="px-8 py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300 inline-block">
                Browse Projects
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">98%</div>
                <p className="text-sm text-muted-foreground mt-2">Uptime</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">10x</div>
                <p className="text-sm text-muted-foreground mt-2">Faster</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">500+</div>
                <p className="text-sm text-muted-foreground mt-2">Factories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to optimize your industrial operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Real-time Monitoring",
                description: "Track every aspect of your operations with live dashboards and instant alerts"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-grade encryption and compliance with ISO 27001 standards"
              },
              {
                icon: TrendingUp,
                title: "Predictive Analytics",
                description: "AI-powered insights to prevent failures before they happen"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Dedicated support team ready to help you succeed"
              },
              {
                icon: Cpu,
                title: "IoT Integration",
                description: "Seamlessly connect all your sensors and devices"
              },
              {
                icon: BarChart3,
                title: "Advanced Reporting",
                description: "Generate comprehensive reports in minutes"
              },
              {
                icon: Lock,
                title: "Data Privacy",
                description: "Your data is encrypted and fully compliant with GDPR"
              },
              {
                icon: Zap,
                title: "API Access",
                description: "Integrate with your existing systems effortlessly"
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group p-6 bg-background border border-border rounded-xl hover:border-primary/50 hover:bg-card/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get up and running in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-4">
            {[
              {
                step: "01",
                title: "Connect",
                description: "Link your industrial equipment and sensors to our platform"
              },
              {
                step: "02",
                title: "Monitor",
                description: "Watch real-time data stream in from all your machines"
              },
              {
                step: "03",
                title: "Analyze",
                description: "AI analyzes patterns and identifies optimization opportunities"
              },
              {
                step: "04",
                title: "Optimize",
                description: "Implement recommendations and watch productivity soar"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="text-4xl font-bold text-primary/30 mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="text-primary">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="relative py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">Tailored Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry-specific automation for manufacturing, logistics, and energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Manufacturing",
                description: "Optimize production lines, reduce downtime, and increase output with intelligent automation and predictive maintenance.",
                color: "from-primary"
              },
              {
                title: "Logistics & Supply Chain",
                description: "Streamline warehouse operations, optimize routing, and track inventory in real-time with IoT sensors.",
                color: "from-secondary"
              },
              {
                title: "Energy & Utilities",
                description: "Monitor power systems, optimize energy consumption, and ensure grid stability with advanced analytics.",
                color: "from-primary"
              }
            ].map((solution, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${solution.color} to-transparent p-0.5 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300`}
              >
                <div className="relative bg-background rounded-[10px] p-8 h-full">
                  <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
                  <div className="mt-6 flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of factories already leveraging Industry 4.0 automation to increase productivity and reduce costs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link to="/projects" className="px-8 py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300 w-full sm:w-auto inline-block text-center">
              Explore Marketplace
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Docs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <Cpu className="w-5 h-5 text-primary" />
              <span className="font-semibold">AutomateX</span>
            </div>
            <p>&copy; 2024 AutomateX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
