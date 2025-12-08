import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Shield,
  Target,
  Zap,
  Eye,
  BarChart3,
  Bug,
} from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Advanced Reconnaissance",
      description:
        "Conduct exhaustive scans to identify your entire attack surface with precision tools.",
    },
    {
      icon: Eye,
      title: "Vulnerability Detection",
      description:
        "Identify security weaknesses with our AI-powered detection for each icon.",
    },
    {
      icon: Zap,
      title: "Exploit Development",
      description:
        "Create and test custom exploits in our secure labs with built-in guidance.",
    },
    {
      icon: Target,
      title: "Target Management",
      description:
        "Organize and track all your testing targets in one centralized, secure dashboard.",
    },
    {
      icon: BarChart3,
      title: "Detailed Reporting",
      description:
        "Generate professional reports with customizable templates for all stakeholders.",
    },
    {
      icon: Bug,
      title: "Zero-Day Exploit",
      description:
        "Defend your assets beyond traditional detection. Zero Trust & proactive threat hunting.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">X</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                XploitArean
              </span>
            </div>

            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    English <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Spanish</DropdownMenuItem>
                  <DropdownMenuItem>French</DropdownMenuItem>
                  <DropdownMenuItem>German</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-6 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span className="text-xs sm:text-sm text-blue-300 font-medium">
                COMING SOON
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Discover the{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Future
              </span>
              <br />
              of{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Zero-Day
              </span>{" "}
              Detection
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10">
              Unlock the power of AI to identify zero-day vulnerabilities with
              ease. Stay ahead of cyber threats with our cutting-edge platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6 sm:mb-8">
              <form
                onSubmit={handleSubscribe}
                className="flex w-full sm:w-auto gap-2"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-card border-border/50 text-foreground placeholder:text-muted-foreground w-full sm:w-64 rounded-lg"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg whitespace-nowrap"
                >
                  Join the Waitlist
                </Button>
              </form>
            </div>

            {isSubscribed && (
              <p className="text-sm text-green-400 mb-4">
                Thanks for signing up! Check your email.
              </p>
            )}

            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border border-border flex items-center justify-center text-xs font-bold text-white">
                  A
                </div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border border-border flex items-center justify-center text-xs font-bold text-white">
                  B
                </div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-border flex items-center justify-center text-xs font-bold text-white">
                  C
                </div>
              </div>
              <span>1000+ Professionals have already signed up</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-4 sm:mb-6">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm text-blue-300 font-medium">
                Features
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Key Platform Features
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how our comprehensive suite of tools can transform your
              security testing workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 sm:p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-400/10 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:from-blue-400/30 group-hover:to-cyan-400/20 transition-all duration-300">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 overflow-hidden p-8 sm:p-12 lg:p-16 text-center">
            <div className="absolute inset-0 dot-pattern opacity-20"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Get early access to next-gen security intelligence
              </h2>

              <p className="text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10">
                Join the waitlist now and be among the first to test our
                AI-powered platform.
              </p>

              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 rounded-lg text-base font-semibold">
                Join the Waitlist
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 backdrop-blur-md mt-20 sm:mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
            <p>© 2024 XploitArean. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
