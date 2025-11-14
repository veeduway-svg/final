import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProblemModal } from "@/contexts/ProblemModalProvider";
import logo from "@/assets/veeduway-logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { open } = useProblemModal();

  const navLinks = [
    { name: "Home", href: "#top" },
    { name: "How It Works", href: "#solution" },
    { name: "Common Challenges", href: "#problems" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = targetId === 'top' ? document.documentElement : document.getElementById(targetId);

    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetId === 'top' ? 0 : offsetPosition,
        behavior: 'smooth'
      });

      window.dispatchEvent(new CustomEvent('nav_link_click', {
        detail: { section: targetId }
      }));
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-veeduway-card/95 backdrop-blur-sm z-50 border-b border-veeduway-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href="#top" onClick={(e) => handleSmoothScroll(e, '#top')} className="flex-shrink-0">
            <img src={logo} alt="VeeduWay" className="h-16 lg:h-20 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-veeduway-text hover:text-[#0074D9] transition-colors text-base font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              size="lg"
              onClick={() => open()}
              className="font-semibold bg-[#0074D9] hover:bg-[#005BB5] text-white"
            >
              Get Your Free Guideline
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-veeduway-text hover:text-veeduway-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-veeduway-border">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleSmoothScroll(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className="text-veeduway-text hover:text-[#0074D9] transition-colors text-base font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <Button
                size="lg"
                onClick={() => {
                  open();
                  setMobileMenuOpen(false);
                }}
                className="font-semibold w-full bg-[#0074D9] hover:bg-[#005BB5] text-white"
              >
                Get Your Free Guideline
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
