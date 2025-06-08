import React, { useState } from 'react';
import { Menu, X, Github, FileText, ExternalLink } from 'lucide-react';

const Header = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Algorithm', href: '#algorithm', id: 'algorithm' },
    { name: 'Findings', href: '#findings', id: 'findings' },
    { name: 'Leaderboard', href: '#leaderboard', id: 'leaderboard' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-secondary-200 z-50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">🔍</span>
            </div>
            <span className="text-xl font-bold text-secondary-900">Doxing via the Lens</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium btn-enhanced-hover px-3 py-2 rounded ${
                  activeSection === item.id
                    ? 'text-primary-600'
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Logo Links */}
          <div className="hidden md:flex items-center space-x-4">
            {/* PDF Link */}
            <a
              href="./Doxing_via_the_lens__arxiv (1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 text-secondary-600 hover:text-secondary-900 btn-enhanced-hover rounded"
              title="Paper PDF"
            >
              <FileText size={20} className="group-hover:scale-105 transition-transform duration-200" />
            </a>
            
            {/* arXiv Link */}
            <a
              href="https://arxiv.org/abs/2504.19373"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 text-secondary-600 hover:text-secondary-900 btn-enhanced-hover rounded"
              title="arXiv Paper"
            >
                                  <img 
                      src="./logos/arxiv-logo.svg" 
                alt="arXiv" 
                width="36" 
                height="36" 
                className="group-hover:scale-105 transition-transform duration-200" 
              />
            </a>
            
            {/* GitHub Link */}
            <a
              href="https://github.com/lutianyu2001/DoxBench"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 text-secondary-600 hover:text-secondary-900 btn-enhanced-hover rounded"
              title="GitHub Repository"
            >
              <Github size={20} className="group-hover:scale-105 transition-transform duration-200" />
            </a>
            
            {/* Hugging Face Link */}
                              <a
                    href="https://huggingface.co/datasets/DoxxingTeam/DoxBench"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 text-secondary-600 hover:text-secondary-900 btn-enhanced-hover rounded"
                    title="Hugging Face Dataset"
                  >
                    <img 
                      src="./logos/huggingface-color.svg" 
                alt="Hugging Face" 
                width="20" 
                height="20" 
                className="group-hover:scale-105 transition-transform duration-200" 
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 btn-enhanced-hover"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left text-base font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-primary-600'
                      : 'text-secondary-600 hover:text-secondary-900'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="flex justify-center space-x-6 pt-4 border-t border-secondary-200">
                {/* Mobile PDF Link */}
                <a
                  href="./Doxing_via_the_lens__arxiv (1).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 text-secondary-600"
                  title="Paper PDF"
                >
                  <FileText size={20} />
                </a>
                
                {/* Mobile arXiv Link */}
                <a
                  href="https://arxiv.org/abs/2504.19373"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 text-secondary-600"
                  title="arXiv Paper"
                >
                  <img 
                    src="./logos/arxiv-logomark-small.svg" 
                    alt="arXiv" 
                    width="20" 
                    height="20" 
                  />
                </a>
                
                {/* Mobile GitHub Link */}
                <a
                  href="https://github.com/lutianyu2001/DoxBench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 text-secondary-600"
                  title="GitHub Repository"
                >
                  <Github size={20} />
                </a>
                
                {/* Mobile Hugging Face Link */}
                <a
                  href="https://huggingface.co/datasets/DoxxingTeam/DoxBench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 text-secondary-600"
                  title="Hugging Face Dataset"
                >
                  <img 
                    src="./logos/huggingface-color.svg" 
                    alt="Hugging Face" 
                    width="20" 
                    height="20" 
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 