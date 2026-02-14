import { useState } from "react";
import { Search, Filter, Badge, ArrowRight, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "SmileCare AI",
    category: "Healthcare AI",
    difficulty: "Advanced",
    status: "In Progress",
    highlights: "Real-time dental diagnostics, patient engagement tools",
    image: "bg-gradient-to-br from-pink-500/20 to-red-500/20",
    rating: 4.8,
  },
  {
    id: 2,
    title: "EcoTrack",
    category: "Sustainability",
    difficulty: "Intermediate",
    status: "Available",
    highlights: "Carbon footprint tracker with gamified UX",
    image: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    rating: 4.6,
  },
  {
    id: 3,
    title: "Finlytics",
    category: "Data Science",
    difficulty: "Advanced",
    status: "Completed",
    highlights: "Predictive analytics for financial markets",
    image: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    rating: 4.9,
  },
  {
    id: 4,
    title: "EduConnect",
    category: "EdTech",
    difficulty: "Beginner",
    status: "Available",
    highlights: "Interactive learning platform with quizzes & flashcards",
    image: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    rating: 4.5,
  },
  {
    id: 5,
    title: "VisionHub",
    category: "Computer Vision",
    difficulty: "Advanced",
    status: "In Progress",
    highlights: "Radiograph analysis with automated reporting",
    image: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
    rating: 4.7,
  },
  {
    id: 6,
    title: "DataFlow",
    category: "Data Science",
    difficulty: "Intermediate",
    status: "Available",
    highlights: "Real-time data pipeline with visualization",
    image: "bg-gradient-to-br from-teal-500/20 to-blue-500/20",
    rating: 4.4,
  },
];

const CATEGORIES = ["Data Science", "Web Development", "AI", "Design", "Business", "Healthcare", "Sustainability", "EdTech"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const STATUSES = ["Available", "Completed", "In Progress"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(FEATURED_PROJECTS);

  const handleFilter = () => {
    let filtered = FEATURED_PROJECTS;

    if (selectedCategory.length > 0) {
      filtered = filtered.filter((p) => selectedCategory.includes(p.category));
    }
    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter((p) => selectedDifficulty.includes(p.difficulty));
    }
    if (selectedStatus.length > 0) {
      filtered = filtered.filter((p) => selectedStatus.includes(p.status));
    }
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  };

  const toggleFilter = (value: string, type: "category" | "difficulty" | "status") => {
    const setter = {
      category: setSelectedCategory,
      difficulty: setSelectedDifficulty,
      status: setSelectedStatus,
    }[type];

    const current = {
      category: selectedCategory,
      difficulty: selectedDifficulty,
      status: selectedStatus,
    }[type];

    setter(current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  };

  const handleReset = () => {
    setSelectedCategory([]);
    setSelectedDifficulty([]);
    setSelectedStatus([]);
    setSearchQuery("");
    setFilteredProjects(FEATURED_PROJECTS);
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
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-primary font-semibold">Marketplace</a>
            <a href="#" className="hover:text-primary transition-colors">Docs</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/signin" className="px-4 py-2 text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-all duration-300 text-sm">
              Sign In
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">Explore Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collection of premium projects designed to inspire, educate, and elevate your portfolio.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-20 z-40 py-6 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Category Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Filter className="w-4 h-4 text-primary" />
                Category
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {CATEGORIES.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategory.includes(cat)}
                      onChange={() => toggleFilter(cat, "category")}
                      className="w-4 h-4 rounded bg-card border-border cursor-pointer"
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Filter className="w-4 h-4 text-primary" />
                Difficulty
              </label>
              <div className="space-y-2">
                {DIFFICULTIES.map((diff) => (
                  <label key={diff} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDifficulty.includes(diff)}
                      onChange={() => toggleFilter(diff, "difficulty")}
                      className="w-4 h-4 rounded bg-card border-border cursor-pointer"
                    />
                    <span className="text-sm">{diff}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Filter className="w-4 h-4 text-primary" />
                Status
              </label>
              <div className="space-y-2">
                {STATUSES.map((stat) => (
                  <label key={stat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStatus.includes(stat)}
                      onChange={() => toggleFilter(stat, "status")}
                      className="w-4 h-4 rounded bg-card border-border cursor-pointer"
                    />
                    <span className="text-sm">{stat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleFilter}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              Apply Filters
            </button>
            {(selectedCategory.length > 0 || selectedDifficulty.length > 0 || selectedStatus.length > 0 || searchQuery) && (
              <button
                onClick={handleReset}
                className="px-6 py-2 text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-all duration-300"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <h3 className="text-2xl font-bold">No Projects Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try resetting filters, searching by keyword, or exploring featured categories
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 inline-block"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 block"
                >
                  {/* Project Image/Header */}
                  <div className={`h-32 ${project.image} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card"></div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    {/* Title and Status */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold flex-1">{project.title}</h3>
                        <button onClick={(e) => e.preventDefault()} className="p-1 hover:bg-card/50 rounded-lg transition-colors">
                          <Heart className="w-5 h-5 cursor-pointer hover:fill-primary hover:text-primary transition-colors" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-primary/20 text-primary border-0">{project.category}</Badge>
                        <Badge variant="outline" className="bg-transparent">{project.status}</Badge>
                      </div>
                    </div>

                    {/* Difficulty */}
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold">Difficulty:</span> {project.difficulty}
                    </div>

                    {/* Highlights */}
                    <p className="text-sm text-muted-foreground">{project.highlights}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < Math.floor(project.rating) ? "text-primary text-lg" : "text-muted text-lg"}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">{project.rating}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <div className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                        Explore
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                      <button onClick={(e) => e.preventDefault()} className="px-4 py-2 border border-border rounded-lg hover:bg-card/50 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">🏆 Why Choose Our Projects?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Carefully curated projects that combine quality, impact, and learning value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Premium Quality",
                description: "Each project is vetted for technical depth and real-world impact"
              },
              {
                title: "Portfolio-Ready",
                description: "Showcase your skills with projects that impress employers and investors"
              },
              {
                title: "Collaborative",
                description: "Many projects are open for contributions, feedback, and iteration"
              },
              {
                title: "Diverse Domains",
                description: "From healthcare AI to sustainability, finance, and education"
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-background border border-border rounded-xl hover:border-primary/50 hover:bg-card/50 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">📞 Connect With Us</h2>
          <p className="text-lg text-muted-foreground">
            Have questions or want to contribute? Get in touch with our team.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a href="#" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">About Us</h3>
              <p className="text-sm text-muted-foreground">Learn more about our mission to connect people with premium resources</p>
            </a>
            <a href="#" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p className="text-sm text-muted-foreground">Reach out for collaboration or support</p>
            </a>
            <a href="#" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <p className="text-sm text-muted-foreground">Privacy Policy | Terms & Conditions | Refunds</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 AutomateX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
