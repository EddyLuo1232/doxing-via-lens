import React, { useState } from 'react';
import { Copy, Check, FileText, Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Citation = () => {
  const [copied, setCopied] = useState(false);

  // Animation hooks
  const headerAnimation = useScrollAnimation({ threshold: 0.2 });
  const citationAnimation = useScrollAnimation({ threshold: 0.3 });

  const bibtex = `@@misc{luo2025doxinglensrevealingprivacy,
      title={Doxing via the Lens: Revealing Privacy Leakage in Image Geolocation for Agentic Multi-Modal Large Reasoning Model}, 
      author={Weidi Luo and Qiming Zhang and Tianyu Lu and Xiaogeng Liu and Yue Zhao and Zhen Xiang and Chaowei Xiao},
      year={2025},
      eprint={2504.19373},
      archivePrefix={arXiv},
      primaryClass={cs.CR},
      url={https://arxiv.org/abs/2504.19373}, 
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Header with animation */}
          <div 
            ref={headerAnimation.ref}
            className={`text-center mb-12 transition-all duration-800 ${
              headerAnimation.isVisible 
                ? 'opacity-1 animate-[fadeInUp_800ms_ease-out_forwards]' 
                : 'opacity-0'
            }`}
          >
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">
              Citation
            </h2>
            <p className="text-xl text-secondary-600">
              If you find our work useful for your research, please consider citing our paper.
            </p>
          </div>

          {/* BibTeX Citation with animation */}
          <div 
            ref={citationAnimation.ref}
            className={`mb-12 transition-all duration-800 ${
              citationAnimation.isVisible 
                ? 'opacity-1 animate-[fadeInUp_800ms_ease-out_200ms_forwards]' 
                : 'opacity-0'
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 card-enhanced-hover">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  BibTeX Citation
                </h3>
                <button
                  onClick={handleCopy}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium btn-enhanced-hover ${
                    copied
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Centered Citation Box */}
              <div className="flex justify-center">
                <div className="bg-gray-800 text-gray-100 p-6 rounded-lg font-mono text-sm leading-relaxed max-w-3xl w-full hover:bg-gray-700 transition-all duration-300">
                  <div className="text-left whitespace-pre-wrap">
                    {bibtex}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Citation Cards */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"> */}
            {/* BibTeX Citation */}
            {/* <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-secondary-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary-600" />
                  BibTeX Citation
                </h3>
                <button
                  onClick={handleCopy}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    copied
                      ? 'bg-green-100 text-green-700'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-secondary-900 text-secondary-100 p-4 rounded-lg text-sm overflow-x-auto font-mono">
                {bibtex}
              </pre>
            </div> */}

            {/* Plain Text Citation */}
            {/* <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                <Quote className="w-5 h-5 mr-2 text-primary-600" />
                Plain Text Citation
              </h3>
              <div className="bg-secondary-50 p-4 rounded-lg text-sm text-secondary-700 border-l-4 border-primary-500">
                <p className="leading-relaxed">
                  Authors Names Here. "DoxBench: Understanding Doxing via the Lens of AI." 
                  <em>arXiv preprint arXiv:2024.xxxxx</em> (2025).
                </p>
              </div>
            </div> */}
          {/* </div> */}

          {/* Paper Links
          <div className="text-center">
            <h3 className="text-xl font-semibold text-secondary-900 mb-6">
              Paper Resources
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="./Doxing_via_the_lens__arxiv (1).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
              <a
                href="https://arxiv.org/abs/2024.xxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary inline-flex items-center space-x-2"
              >
                <span>arXiv</span>
                <span className="text-xs">↗</span>
              </a>
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary inline-flex items-center space-x-2"
              >
                <span>GitHub Repository</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div> */}

          {/* Contact Information */}
          {/* <div className="mt-16 card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4 text-center">
              Questions or Feedback?
            </h3>
            <p className="text-secondary-700 text-center mb-6">
              We welcome questions, feedback, and discussions about our research. 
              Feel free to reach out or open an issue on our GitHub repository.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@yourdomain.com"
                className="btn btn-primary inline-flex items-center space-x-2"
              >
                <span>📧</span>
                <span>Contact Us</span>
              </a>
              <a
                href="https://github.com/your-repo/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary inline-flex items-center space-x-2"
              >
                <span>💬</span>
                <span>Open Discussion</span>
              </a>
            </div>
          </div> */}

        </div>
      </div>
    </section>
  );
};

export default Citation; 