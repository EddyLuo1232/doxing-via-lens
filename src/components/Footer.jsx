import React from 'react';
import { Github, FileText, Mail, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation hooks
  const footerAnimation = useScrollAnimation({ threshold: 0.1 });

  return (
    <footer className="bg-secondary-900 text-white">
      <div 
        ref={footerAnimation.ref}
        className={`section-container py-12 transition-all duration-800 ${
          footerAnimation.isVisible 
            ? 'opacity-1 animate-[fadeInUp_800ms_ease-out_forwards]' 
            : 'opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">🔍</span>
              </div>
              <span className="text-xl font-bold">Doxing via the Lens</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
            Revealing Location-related Privacy Leakage on Multi-modal Large Reasoning Models
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/lutianyu2001/DoxBench"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-all duration-300 hover:scale-110 btn-enhanced-hover p-2 rounded"
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="./Doxing_via_the_lens__arxiv (1).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-all duration-300 hover:scale-110 btn-enhanced-hover p-2 rounded"
                aria-label="Research Paper"
              >
                <FileText className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@yourdomain.com"
                className="text-secondary-400 hover:text-white transition-all duration-300 hover:scale-110 btn-enhanced-hover p-2 rounded"
                aria-label="Contact Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#algorithm"
                  className="text-secondary-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Framework
                </a>
              </li>
              <li>
                <a
                  href="#findings"
                  className="text-secondary-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Key Findings
                </a>
              </li>
              <li>
                <a
                  href="#leaderboard"
                  className="text-secondary-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="./Doxing_via_the_lens__arxiv (1).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center space-x-1"
                >
                  <span>Paper</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/lutianyu2001/DoxBench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center space-x-1"
                >
                  <span>Code</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://arxiv.org/abs/2504.19373"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center space-x-1"
                >
                  <span>arXiv</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/datasets/DoxxingTeam/DoxBench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center space-x-1"
                >
                  <span>Dataset</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              
              <li>
                <a
                  href="https://github.com/lutianyu2001/DoxBench/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center space-x-1"
                >
                  <span>Issues</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © {currentYear} Doxxing Team. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-secondary-400 hover:text-white text-sm transition-all duration-300 hover:-translate-y-1"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-secondary-400 hover:text-white text-sm transition-all duration-300 hover:-translate-y-1"
              >
                Terms of Use
              </a>
              <a
                href="mailto:contact@yourdomain.com"
                className="text-secondary-400 hover:text-white text-sm transition-all duration-300 hover:-translate-y-1"
              >
                Contact
              </a>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-secondary-800">
            <p className="text-secondary-500 text-xs text-center max-w-4xl mx-auto hover:text-secondary-400 transition-colors duration-300">
              <strong>Research Disclaimer:</strong> This research is conducted for academic purposes to understand 
              and mitigate privacy risks in AI systems. The findings are intended to promote responsible AI development 
              and should not be used for malicious purposes. Please use this work responsibly and in accordance with 
              applicable laws and ethical guidelines.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 