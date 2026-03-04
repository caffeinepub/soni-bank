import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowDownCircle,
  ArrowLeftRight,
  ArrowUpCircle,
  Banknote,
  CheckCircle,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Send,
  Settings,
  Shield,
  ShieldCheck,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCallerUserRole, useIsCallerAdmin } from "../hooks/useQueries";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

type Tab =
  | "dashboard"
  | "accounts"
  | "transactions"
  | "transfer"
  | "settings"
  | "admin";

const mockTransactions = [
  {
    date: "Mar 03, 2026",
    description: "Direct Deposit — Employer Payroll",
    type: "credit",
    amount: 4500.0,
  },
  {
    date: "Mar 02, 2026",
    description: "Rent Payment — Prestige Apartments",
    type: "debit",
    amount: -1800.0,
  },
  {
    date: "Mar 01, 2026",
    description: "Grocery Purchase — Nature's Basket",
    type: "debit",
    amount: -124.5,
  },
  {
    date: "Feb 28, 2026",
    description: "Investment Returns — Mutual Fund SIP",
    type: "credit",
    amount: 320.0,
  },
  {
    date: "Feb 27, 2026",
    description: "Utility Bill — Power & Water",
    type: "debit",
    amount: -89.75,
  },
  {
    date: "Feb 25, 2026",
    description: "Online Transfer Received — R. Mehta",
    type: "credit",
    amount: 600.0,
  },
  {
    date: "Feb 23, 2026",
    description: "Insurance Premium — LIC Policy",
    type: "debit",
    amount: -250.0,
  },
  {
    date: "Feb 20, 2026",
    description: "ATM Withdrawal — Bandra Branch",
    type: "debit",
    amount: -200.0,
  },
  {
    date: "Feb 18, 2026",
    description: "Freelance Payment Received",
    type: "credit",
    amount: 1200.0,
  },
  {
    date: "Feb 15, 2026",
    description: "Subscription — Streaming Services",
    type: "debit",
    amount: -29.99,
  },
];

function getAccountNumber(principal: string): string {
  const hash = principal
    .replace(/[^a-z0-9]/gi, "")
    .toUpperCase()
    .slice(0, 12);
  return `SONI-${hash.slice(0, 4)}-${hash.slice(4, 8)}-${hash.slice(8, 12)}`;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { identity, clear } = useInternetIdentity();
  const { data: role } = useCallerUserRole();
  const { data: isAdmin } = useIsCallerAdmin();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transferForm, setTransferForm] = useState({
    recipient: "",
    amount: "",
    description: "",
  });
  const [displayName, setDisplayName] = useState("Account Holder");

  const principal = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal =
    principal.length > 20
      ? `${principal.slice(0, 12)}...${principal.slice(-6)}`
      : principal;
  const accountNumber = getAccountNumber(principal);

  const handleLogout = () => {
    clear();
    void navigate({ to: "/" });
  };

  const handleTransfer = () => {
    if (!transferForm.recipient || !transferForm.amount) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Transfer initiated successfully!");
    setTransferForm({ recipient: "", amount: "", description: "" });
  };

  const navItems: {
    tab: Tab;
    icon: typeof LayoutDashboard;
    label: string;
    adminOnly?: boolean;
  }[] = [
    { tab: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { tab: "accounts", icon: CreditCard, label: "Accounts" },
    { tab: "transactions", icon: ArrowLeftRight, label: "Transactions" },
    { tab: "transfer", icon: Send, label: "Transfer" },
    { tab: "settings", icon: Settings, label: "Settings" },
    ...(isAdmin
      ? [
          {
            tab: "admin" as Tab,
            icon: ShieldCheck,
            label: "Admin",
            adminOnly: true,
          },
        ]
      : []),
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <img
            src="/assets/generated/soni-bank-logo-transparent.dim_200x200.png"
            alt="Soni Bank"
            className="h-9 w-9 object-contain"
          />
          <span className="font-display text-lg font-bold text-sidebar-foreground">
            Soni <span className="text-gold">Bank</span>
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ tab, icon: Icon, label, adminOnly }) => (
          <button
            type="button"
            key={tab}
            data-ocid={`dashboard.${tab}.tab`}
            onClick={() => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-gold text-navy-dark shadow-gold"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{label}</span>
            {adminOnly && (
              <Badge className="ml-auto bg-gold/20 text-gold text-xs border-gold/30 px-1.5 py-0.5 h-auto">
                Admin
              </Badge>
            )}
          </button>
        ))}
      </nav>

      {/* User info + logout */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center border border-gold/30">
            <User className="w-4 h-4 text-gold" />
          </div>
          <div className="min-w-0">
            <div className="text-sidebar-foreground font-medium text-xs truncate">
              {displayName}
            </div>
            <div className="text-sidebar-foreground/40 text-xs truncate">
              {shortPrincipal}
            </div>
          </div>
          {isAdmin && (
            <Badge className="ml-auto bg-gold/20 text-gold text-xs border-gold/30 px-1.5 py-0.5 h-auto flex-shrink-0">
              Admin
            </Badge>
          )}
        </div>
        <Button
          data-ocid="nav.logout_button"
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-2 text-sidebar-foreground/60 hover:text-red-400 hover:bg-red-400/10 text-sm px-3"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm border-0 cursor-default"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="lg:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="font-display font-bold text-foreground text-lg capitalize">
                {activeTab === "dashboard"
                  ? "Overview"
                  : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Badge className="bg-gold/10 text-gold border-gold/30 text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            )}
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Online</span>
            </div>
            <Button
              data-ocid="nav.logout_button"
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sign Out</span>
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Welcome Card */}
              <div className="bg-navy rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 rounded-full translate-y-8 -translate-x-8" />
                <div className="relative z-10">
                  <p className="text-white/60 text-sm font-medium mb-1">
                    Welcome back,
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                    {displayName}
                  </h2>
                  <p className="text-white/50 text-xs font-mono truncate max-w-xs">
                    {shortPrincipal}
                  </p>
                  {role && (
                    <Badge className="mt-3 bg-gold/20 text-gold border-gold/30 capitalize">
                      {role} Account
                    </Badge>
                  )}
                </div>
              </div>

              {/* Account Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1 bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground text-sm font-medium">
                      Total Balance
                    </span>
                    <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                  <div className="font-display text-3xl font-bold text-foreground">
                    $12,450
                    <span className="text-lg text-muted-foreground">.00</span>
                  </div>
                  <p className="text-muted-foreground text-xs mt-1">
                    Savings Account
                  </p>
                </div>

                <div className="sm:col-span-2 bg-card border border-border rounded-2xl p-5">
                  <h3 className="text-foreground font-semibold text-sm mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      data-ocid="dashboard.deposit_button"
                      onClick={() => toast.success("Deposit flow initiated")}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors group"
                    >
                      <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                        <ArrowDownCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        Deposit
                      </span>
                    </button>
                    <button
                      type="button"
                      data-ocid="dashboard.withdraw_button"
                      onClick={() => toast.success("Withdrawal flow initiated")}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors group"
                    >
                      <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                        <ArrowUpCircle className="w-5 h-5 text-red-500" />
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        Withdraw
                      </span>
                    </button>
                    <button
                      type="button"
                      data-ocid="dashboard.transfer_button"
                      onClick={() => setActiveTab("transfer")}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Send className="w-5 h-5 text-gold" />
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        Transfer
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Transactions Preview */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">
                    Recent Activity
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab("transactions")}
                    className="text-gold text-sm hover:text-gold-dark transition-colors flex items-center gap-1"
                  >
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-3">
                  {mockTransactions.slice(0, 4).map((t) => (
                    <div
                      key={`${t.date}-${t.description}`}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            t.type === "credit"
                              ? "bg-green-500/10"
                              : "bg-red-500/10"
                          }`}
                        >
                          {t.type === "credit" ? (
                            <ArrowDownCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowUpCircle className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-foreground text-sm font-medium line-clamp-1 max-w-[180px] sm:max-w-xs">
                            {t.description}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {t.date}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`font-semibold text-sm flex-shrink-0 ${
                          t.type === "credit"
                            ? "text-green-500"
                            : "text-red-400"
                        }`}
                      >
                        {t.type === "credit" ? "+" : ""}$
                        {Math.abs(t.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ACCOUNTS TAB */}
          {activeTab === "accounts" && (
            <motion.div
              key="accounts"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="bg-navy rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-24 translate-x-24" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">
                        Soni Bank
                      </p>
                      <h2 className="font-display text-2xl font-bold text-white">
                        Savings Account
                      </h2>
                    </div>
                    <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center border border-gold/30">
                      <Banknote className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/40 text-xs mb-0.5">
                        Account Number
                      </p>
                      <p className="text-white font-mono font-medium tracking-widest text-sm">
                        {accountNumber}
                      </p>
                    </div>
                    <Separator className="border-white/10" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-white/40 text-xs mb-0.5">Balance</p>
                        <p className="font-display text-2xl font-bold text-gold">
                          $12,450.00
                        </p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs mb-0.5">
                          Account Type
                        </p>
                        <p className="text-white font-semibold">Savings</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs mb-0.5">Status</p>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-semibold text-sm">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-4">
                  Account Details
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Account Holder", value: displayName },
                    { label: "Principal ID", value: shortPrincipal },
                    { label: "Account Type", value: "Savings Account" },
                    { label: "Interest Rate", value: "4.25% p.a." },
                    { label: "Account Open Date", value: "January 15, 2025" },
                    { label: "Last Transaction", value: "March 3, 2026" },
                    { label: "Branch", value: "Soni Bank — Digital Branch" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground text-sm">
                        {item.label}
                      </span>
                      <span className="text-foreground text-sm font-medium text-right max-w-[60%] truncate">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TRANSACTIONS TAB */}
          {activeTab === "transactions" && (
            <motion.div
              key="transactions"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="font-semibold text-foreground">
                    Transaction History
                  </h3>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    Last 30 days
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-muted-foreground font-medium">
                          Date
                        </TableHead>
                        <TableHead className="text-muted-foreground font-medium">
                          Description
                        </TableHead>
                        <TableHead className="text-muted-foreground font-medium">
                          Type
                        </TableHead>
                        <TableHead className="text-muted-foreground font-medium text-right">
                          Amount
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTransactions.map((t, idx) => (
                        <TableRow
                          key={`${t.date}-${t.description}`}
                          data-ocid={`transactions.item.${idx + 1}`}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                            {t.date}
                          </TableCell>
                          <TableCell className="text-foreground text-sm max-w-[220px]">
                            <span className="line-clamp-1">
                              {t.description}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs capitalize ${
                                t.type === "credit"
                                  ? "bg-green-500/10 text-green-600 border-green-500/20"
                                  : "bg-red-500/10 text-red-500 border-red-500/20"
                              }`}
                            >
                              {t.type}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className={`text-right font-semibold text-sm whitespace-nowrap ${
                              t.type === "credit"
                                ? "text-green-500"
                                : "text-red-400"
                            }`}
                          >
                            {t.type === "credit" ? "+" : ""}$
                            {Math.abs(t.amount).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TRANSFER TAB */}
          {activeTab === "transfer" && (
            <motion.div
              key="transfer"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-xl space-y-6"
            >
              <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center border border-gold/30">
                    <Send className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Send Money
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Transfer funds securely
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="recipient"
                    className="text-foreground/80 text-sm font-medium"
                  >
                    Recipient Account ID <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="recipient"
                    data-ocid="transfer.input"
                    placeholder="SONI-XXXX-XXXX-XXXX"
                    value={transferForm.recipient}
                    onChange={(e) =>
                      setTransferForm((prev) => ({
                        ...prev,
                        recipient: e.target.value,
                      }))
                    }
                    className="font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="amount"
                    className="text-foreground/80 text-sm font-medium"
                  >
                    Amount (USD) <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      $
                    </span>
                    <Input
                      id="amount"
                      data-ocid="transfer.input"
                      type="number"
                      placeholder="0.00"
                      value={transferForm.amount}
                      onChange={(e) =>
                        setTransferForm((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
                      }
                      className="pl-7"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="description"
                    className="text-foreground/80 text-sm font-medium"
                  >
                    Description
                  </Label>
                  <Input
                    id="description"
                    data-ocid="transfer.input"
                    placeholder="Payment for services..."
                    value={transferForm.description}
                    onChange={(e) =>
                      setTransferForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="bg-muted/60 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Transfers are processed within 1-3 business days. Ensure the
                    recipient account ID is correct. Soni Bank is not liable for
                    transfers to incorrect accounts.
                  </p>
                </div>

                <Button
                  data-ocid="transfer.submit_button"
                  onClick={handleTransfer}
                  className="w-full bg-navy hover:bg-navy-dark text-white font-semibold rounded-xl py-2.5 transition-all duration-200 hover:shadow-navy"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Transfer
                </Button>
              </div>
            </motion.div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <motion.div
              key="settings"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-xl space-y-6"
            >
              {/* Profile Info */}
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-navy/10 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-navy" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    Profile Information
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      label: "Principal ID",
                      value: shortPrincipal,
                      mono: true,
                    },
                    {
                      label: "Account Role",
                      value:
                        role === UserRole.admin
                          ? "Administrator"
                          : role === UserRole.user
                            ? "Standard User"
                            : "Guest",
                    },
                    { label: "Account Status", value: "Active" },
                    {
                      label: "Security Level",
                      value: "High — Internet Identity",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center py-2.5 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground text-sm">
                        {item.label}
                      </span>
                      <span
                        className={`text-foreground text-sm font-medium max-w-[55%] text-right truncate ${
                          item.mono ? "font-mono" : ""
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Display Name */}
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center border border-gold/30">
                    <Settings className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground">Preferences</h3>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="display-name"
                    className="text-foreground/80 text-sm font-medium"
                  >
                    Display Name
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="display-name"
                      data-ocid="settings.input"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your display name"
                      className="flex-1"
                    />
                    <Button
                      data-ocid="settings.save_button"
                      onClick={() => toast.success("Display name updated!")}
                      className="bg-navy hover:bg-navy-dark text-white font-medium"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    Security Status
                  </h3>
                </div>
                {[
                  { label: "Identity Provider", status: "Verified", ok: true },
                  { label: "Session Active", status: "Secure", ok: true },
                  {
                    label: "Two-Factor Auth",
                    status: "Enabled via II",
                    ok: true,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-2 border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground text-sm">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-green-600 text-sm font-medium">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                data-ocid="nav.logout_button"
                variant="outline"
                onClick={handleLogout}
                className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400 font-semibold rounded-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out of Soni Bank
              </Button>
            </motion.div>
          )}

          {/* ADMIN TAB */}
          {activeTab === "admin" && isAdmin && (
            <motion.div
              key="admin"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="bg-navy rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full -translate-y-12 translate-x-12" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center border border-gold/40 flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white mb-1">
                      Admin Panel
                    </h2>
                    <p className="text-white/60 text-sm">
                      You have administrator privileges for Soni Bank.
                    </p>
                    <Badge className="mt-3 bg-gold/20 text-gold border-gold/40">
                      Admin Access Granted
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    label: "Total Accounts",
                    value: "1,248,392",
                    icon: User,
                    trend: "+2.4%",
                  },
                  {
                    label: "Active Sessions",
                    value: "34,891",
                    icon: CheckCircle,
                    trend: "+0.8%",
                  },
                  {
                    label: "Daily Transactions",
                    value: "$48.2M",
                    icon: ArrowLeftRight,
                    trend: "+5.1%",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-card border border-border rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-muted-foreground text-sm">
                        {stat.label}
                      </span>
                      <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-4 h-4 text-gold" />
                      </div>
                    </div>
                    <div className="font-display text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <p className="text-green-500 text-xs mt-1">
                      {stat.trend} this week
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  System Status
                </h3>
                <div className="space-y-3">
                  {[
                    { service: "Core Banking API", status: "Operational" },
                    { service: "Payment Gateway", status: "Operational" },
                    {
                      service: "Internet Identity Auth",
                      status: "Operational",
                    },
                    {
                      service: "Canister Backend (ICP)",
                      status: "Operational",
                    },
                    {
                      service: "Fraud Detection System",
                      status: "Operational",
                    },
                  ].map((item) => (
                    <div
                      key={item.service}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <span className="text-foreground/80 text-sm">
                        {item.service}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-green-600 text-sm font-medium">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-border px-4 sm:px-6 lg:px-8 py-3 bg-card flex justify-between items-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Soni Bank. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/50 hover:text-muted-foreground text-xs transition-colors"
          >
            Built with ❤️ caffeine.ai
          </a>
        </footer>
      </main>
    </div>
  );
}
