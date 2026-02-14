import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, BarChart3, ShoppingCart, Users, Package, Settings, TrendingUp, AlertCircle, ChevronRight, Menu, X } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  project: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
  date: string;
  email: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "creator" | "customer" | "educator";
  joinDate: string;
  status: "active" | "inactive";
}

const SAMPLE_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customer: "John Smith",
    project: "SmileCare AI",
    amount: 4999,
    status: "completed",
    date: "2024-01-15",
    email: "john@example.com"
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customer: "Sarah Johnson",
    project: "EcoTrack",
    amount: 2999,
    status: "pending",
    date: "2024-01-18",
    email: "sarah@example.com"
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customer: "Mike Chen",
    project: "Finlytics",
    amount: 5999,
    status: "completed",
    date: "2024-01-20",
    email: "mike@example.com"
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customer: "Emma Davis",
    project: "EduConnect",
    amount: 1999,
    status: "pending",
    date: "2024-01-22",
    email: "emma@example.com"
  }
];

const SAMPLE_USERS: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    role: "customer",
    joinDate: "2023-12-01",
    status: "active"
  },
  {
    id: "2",
    name: "Dr. Sarah Chen",
    email: "sarah@example.com",
    role: "creator",
    joinDate: "2023-11-15",
    status: "active"
  },
  {
    id: "3",
    name: "Alex Patel",
    email: "alex@example.com",
    role: "creator",
    joinDate: "2023-10-20",
    status: "active"
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma@example.com",
    role: "educator",
    joinDate: "2024-01-05",
    status: "active"
  }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "users" | "projects" | "settings">("dashboard");
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const userRole = localStorage.getItem("userRole");

  if (userRole !== "admin") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
          <h1 className="text-3xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access the admin panel</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/signin");
  };

  const handleOrderStatusChange = (orderId: string, newStatus: "pending" | "completed" | "cancelled") => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const completedOrders = orders.filter(o => o.status === "completed").length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const totalRevenue = orders.filter(o => o.status === "completed").reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-card rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">🔧</span>
              </div>
              <span className="font-bold text-xl">AutomateX</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Admin Panel</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 border-r border-border bg-card/50 p-6 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase">Management</h3>
              <nav className="space-y-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                  { id: "orders", label: "Orders", icon: ShoppingCart },
                  { id: "users", label: "Users", icon: Users },
                  { id: "projects", label: "Projects", icon: Package },
                  { id: "settings", label: "Settings", icon: Settings }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setSelectedOrder(null);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="bg-background/50 rounded-lg p-4 space-y-3 border border-border">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Orders</span>
                  <span className="font-bold">{orders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-bold text-green-500">{completedOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-bold text-orange-500">{pendingOrders}</span>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to the AutomateX Admin Panel</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <ShoppingCart className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{orders.length}</p>
                  <p className="text-xs text-muted-foreground">All time</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Completed orders</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{SAMPLE_USERS.length}</p>
                  <p className="text-xs text-muted-foreground">Registered</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{((completedOrders / orders.length) * 100).toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">Of orders</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-bold">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-background/50 border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Project</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-background/50 transition-colors cursor-pointer" onClick={() => setSelectedOrder(order)}>
                          <td className="px-6 py-4 text-sm font-mono">{order.orderNumber}</td>
                          <td className="px-6 py-4 text-sm">{order.customer}</td>
                          <td className="px-6 py-4 text-sm">{order.project}</td>
                          <td className="px-6 py-4 text-sm font-semibold">${order.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "completed" ? "bg-green-500/20 text-green-400" :
                              order.status === "pending" ? "bg-orange-500/20 text-orange-400" :
                              "bg-red-500/20 text-red-400"
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Order Management</h1>
                <p className="text-muted-foreground">Manage and track all customer orders</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Orders Table */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-bold">All Orders</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-background/50 border-b border-border">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Order</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr
                            key={order.id}
                            onClick={() => setSelectedOrder(order)}
                            className={`border-b border-border cursor-pointer transition-colors ${
                              selectedOrder?.id === order.id ? "bg-primary/10" : "hover:bg-background/50"
                            }`}
                          >
                            <td className="px-6 py-4 text-sm font-mono">{order.orderNumber}</td>
                            <td className="px-6 py-4 text-sm">{order.customer}</td>
                            <td className="px-6 py-4 text-sm font-semibold">${order.amount}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                order.status === "completed" ? "bg-green-500/20 text-green-400" :
                                order.status === "pending" ? "bg-orange-500/20 text-orange-400" :
                                "bg-red-500/20 text-red-400"
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Order Details */}
                {selectedOrder && (
                  <div className="bg-card border border-border rounded-xl p-6 space-y-6 h-fit sticky top-24">
                    <div>
                      <h3 className="text-lg font-bold mb-4">Order Details</h3>
                      <div className="space-y-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Order Number</p>
                          <p className="font-mono font-bold">{selectedOrder.orderNumber}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Customer</p>
                          <p className="font-semibold">{selectedOrder.customer}</p>
                          <p className="text-xs text-muted-foreground">{selectedOrder.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Project</p>
                          <p className="font-semibold">{selectedOrder.project}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Amount</p>
                          <p className="text-2xl font-bold text-primary">${selectedOrder.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Date</p>
                          <p className="font-semibold">{selectedOrder.date}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <p className="text-sm font-semibold mb-3">Update Status</p>
                      <div className="space-y-2">
                        {(["pending", "completed", "cancelled"] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => handleOrderStatusChange(selectedOrder.id, status)}
                            className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              selectedOrder.status === status
                                ? status === "completed"
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : status === "pending"
                                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                                  : "bg-red-500/20 text-red-400 border border-red-500/30"
                                : "border border-border hover:bg-card/50"
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">User Management</h1>
                <p className="text-muted-foreground">Manage platform users and their roles</p>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-bold">All Users</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-background/50 border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Join Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SAMPLE_USERS.map((user) => (
                        <tr key={user.id} className="border-b border-border hover:bg-background/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-semibold">{user.name}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold capitalize">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{user.joinDate}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Project Management</h1>
                <p className="text-muted-foreground">Manage and moderate projects on the platform</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "SmileCare AI", creator: "Dr. Sarah Chen", status: "active" },
                  { title: "EcoTrack", creator: "Marcus Green", status: "active" },
                  { title: "Finlytics", creator: "Alex Patel", status: "active" },
                ].map((project, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">by {project.creator}</p>
                    </div>
                    <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                    <div className="flex gap-2 pt-4">
                      <button className="flex-1 px-3 py-2 border border-border rounded-lg hover:bg-card/50 transition-colors text-sm font-medium">
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-2 border border-destructive/30 text-destructive rounded-lg hover:bg-destructive/10 transition-colors text-sm font-medium">
                        Disable
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage platform settings and configuration</p>
              </div>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold block mb-2">Platform Name</label>
                      <input
                        type="text"
                        defaultValue="AutomateX"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold block mb-2">Support Email</label>
                      <input
                        type="email"
                        defaultValue="support@automatex.com"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Commission Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold block mb-2">Platform Commission (%)</label>
                      <input
                        type="number"
                        defaultValue="10"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
