import { Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProblemModal } from '@/contexts/ProblemModalProvider';
import logo from '@/assets/veeduway-logo.png';

const Footer = () => {
  const { open } = useProblemModal();

  const handleDownloadClick = () => {
    window.dispatchEvent(new CustomEvent('footer_cta_click', {
      detail: { source: 'footer' }
    }));
    open();
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-veeduway-alt border-t border-veeduway-border">
      <div className="max-w-6xl mx-auto px-6">
        <nav aria-label="Footer" className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="VeeduWay" className="h-8 w-auto md:h-9" />
            <p className="mt-3 text-sm text-veeduway-muted max-w-xs">
              Transparent guidance for first-time homeowners in Tamil Nadu.
            </p>

            <div className="mt-4 flex items-center gap-4 text-veeduway-muted">
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-veeduway-text uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={handleDownloadClick}
                  className="text-sm text-veeduway-muted hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
                >
                  Download Guideline
                </button>
              </li>
              <li>
                <a
                  href="#problems"
                  onClick={(e) => handleSmoothScroll(e, 'problems')}
                  className="text-sm text-veeduway-muted hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
                >
                  Problem Finder
                </a>
              </li>
              <li>
                <a
                  href="#solution"
                  onClick={(e) => handleSmoothScroll(e, 'solution')}
                  className="text-sm text-veeduway-muted hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
                >
                  Solution Overview
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-veeduway-text uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-veeduway-muted hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-veeduway-muted hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-veeduway-text uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-veeduway-muted hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@veeduway.com"
                  className="text-sm text-veeduway-muted hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-veeduway-muted hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-veeduway-muted hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="py-6 border-t border-veeduway-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-veeduway-muted text-center md:text-left">
            © 2025 VeeduWay. Built with love in India.
          </p>

          <div className="flex items-center gap-4 text-sm text-veeduway-muted">
            <Link
              to="/privacy"
              className="hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
            >
              Privacy
            </Link>
            <span className="text-veeduway-border">|</span>
            <Link
              to="/terms"
              className="hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
            >
              Terms
            </Link>
            <span className="text-veeduway-border">|</span>
            <a
              href="#"
              className="hover:text-[#0074D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0074D9] rounded"
            >
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
