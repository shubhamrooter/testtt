import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, Mail, MessageSquare, Zap, Book, AlertCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Support() {
  const [searchQuery, setSearchQuery] = useState("");

  const supportCategories = [
    {
      icon: Zap,
      title: "Getting Started",
      description: "Learn the basics and set up your XploitArean account",
      articles: 12,
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Comprehensive guides and technical documentation",
      articles: 24,
    },
    {
      icon: AlertCircle,
      title: "Troubleshooting",
      description: "Solve common issues and technical problems",
      articles: 18,
    },
    {
      icon: Clock,
      title: "API Reference",
      description: "Integration guides and API documentation",
      articles: 16,
    },
  ];

  const faqs = [
    {
      id: "1",
      question: "What is XploitArean and how does it work?",
      answer:
        "XploitArean is an AI-powered security intelligence platform that helps organizations identify zero-day vulnerabilities with advanced reconnaissance, vulnerability detection, and exploit development capabilities. Our platform uses cutting-edge machine learning to analyze and detect security weaknesses in your infrastructure.",
    },
    {
      id: "2",
      question: "How do I get started with XploitArean?",
      answer:
        "To get started, sign up for the waitlist and we'll send you access credentials once the platform launches. You can then create an account, set up your organization, and begin performing security assessments on your targets.",
    },
    {
      id: "3",
      question: "Is my data secure with XploitArean?",
      answer:
        "Yes, we take security very seriously. All data is encrypted in transit and at rest using industry-standard protocols. We comply with GDPR, SOC 2, and other major security standards to ensure your data remains protected.",
    },
    {
      id: "4",
      question: "What kind of support do you offer?",
      answer:
        "We offer 24/7 email support, comprehensive documentation, video tutorials, and personalized onboarding for enterprise customers. Our support team is dedicated to helping you get the most out of XploitArean.",
    },
    {
      id: "5",
      question: "Can I integrate XploitArean with other tools?",
      answer:
        "Yes, XploitArean has a comprehensive REST API that allows integration with popular security tools and platforms. We also offer pre-built integrations with major SIEM and vulnerability management solutions.",
    },
    {
      id: "6",
      question: "What are your pricing plans?",
      answer:
        "We offer flexible pricing based on your organization's needs. Plans include Starter for small teams, Professional for growing organizations, and Enterprise for large deployments with custom requirements. Contact our sales team for detailed pricing.",
    },
    {
      id: "7",
      question: "Is there a free trial available?",
      answer:
        "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.",
    },
    {
      id: "8",
      question: "How often do you release new features?",
      answer:
        "We release new features and updates monthly. Major platform updates happen quarterly with extensive testing and rollout processes to ensure stability.",
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
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">X</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                XploitArean
              </span>
            </Link>

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

              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              How can we help you?
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10">
              Find answers, tutorials, and support resources to get the most out of XploitArean.
            </p>

            <div className="flex w-full max-w-2xl mx-auto mb-4">
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-card border-border/50 text-foreground placeholder:text-muted-foreground rounded-lg mr-2"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg whitespace-nowrap">
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {supportCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 sm:p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-400/10 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:from-blue-400/30 group-hover:to-cyan-400/20 transition-all duration-300">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      {category.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {category.description}
                    </p>

                    <p className="text-xs text-blue-300 font-medium">
                      {category.articles} articles
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about XploitArean.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border/50 rounded-lg px-6 py-4 bg-card/30 hover:bg-card/50 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-semibold text-base sm:text-lg">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 overflow-hidden p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 dot-pattern opacity-20"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center">
                Didn't find what you're looking for?
              </h2>

              <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-8 sm:mb-10">
                Our support team is here to help you. Reach out via email or chat with us.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="flex flex-col items-center p-6 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                  <Mail className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                  <p className="text-muted-foreground text-center mb-4 text-sm">
                    Get help from our support team within 24 hours.
                  </p>
                  <a
                    href="mailto:support@xploitarean.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
                  >
                    support@xploitarean.com
                  </a>
                </div>

                <div className="flex flex-col items-center p-6 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                  <MessageSquare className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                  <p className="text-muted-foreground text-center mb-4 text-sm">
                    Chat with our support team in real-time.
                  </p>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                    Start Chat
                  </button>
                </div>
              </div>
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
