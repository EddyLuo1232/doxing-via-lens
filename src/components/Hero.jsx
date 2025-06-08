import React from 'react';
import { ArrowRight, Download, Github, ExternalLink } from 'lucide-react';

const Hero = () => {
  const authors = [
    { name: "Weidi Luo", affiliation: "1", equal: true },
    { name: "Tianyu Lu", affiliation: "2", equal: true },
    { name: "Qiming Zhang", affiliation: "2", equal: true },
    { name: "Xiaogeng Liu", affiliation: "2" },
    { name: "Bin Hu", affiliation: "4" },
    { name: "Yue Zhao", affiliation: "3" },
    { name: "Jieyu Zhao", affiliation: "3" },
    { name: "Song Gao", affiliation: "2" },
    { name: "Patrick McDaniel", affiliation: "2" },
    { name: "Zhen Xiang", affiliation: "1" },
    { name: "Chaowei Xiao", affiliation: "2" },
  ];

  const affiliations = [
    "University of Georgia",
    "University of Wisconsin-Madison", 
    "University of Southern California",
    "University of Maryland"
  ];

  return (
    <section id="hero" className="pt-24 pb-16 relative overflow-hidden">
      {/* 主渐变背景 */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 210, 255, 0.18) 0%, 
            rgba(144, 194, 233, 0.24) 100%)`
        }}
      />
      
      {/* 额外的渐变层增加深度 */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 20%, 
            rgba(255, 210, 255, 0.18) 0%, 
            transparent 50%),
          radial-gradient(circle at 70% 80%, 
            rgba(144, 194, 233, 0.24) 0%, 
            transparent 50%)`
        }}
      />
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Title with left-to-right animation */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6 leading-tight animate-[slideInLeft_1s_ease-out_forwards] opacity-0">
              <span className="gradient-text">Doxing via the Lens</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary-700 mb-4 animate-[slideInUp_1s_ease-out_0.3s_forwards] opacity-0">
            Revealing Location-related Privacy Leakage on Multi-modal Large Reasoning Models
            </h2>
          </div>

          {/* Authors with fade-in animation */}
          <div className="mb-8 animate-[fadeInUp_1s_ease-out_0.6s_forwards] opacity-0">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-4">
              {authors.map((author, index) => (
                <React.Fragment key={index}>
                {/* 在 Bin Hu 之后换行 */}
                {index === 5 && <div className="w-full"></div>}
                <span className="text-gray-700">
                <span className="font-bold text-lg">{author.name}</span>
                  <sup className="text-blue-600 ml-1">{author.affiliation}</sup>
                  {author.equal && <sup className="text-red-600 ml-1">*</sup>}
                  {index < authors.length - 1 && <span className="text-gray-400 ml-2">,</span>}
                </span>
              </React.Fragment>
              ))}
            </div>
            <p className="text-sm text-secondary-500 mb-4 text-center">
              <sup className="text-accent-600">*</sup> Equal Contribution
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-secondary-600">
              {affiliations.map((affiliation, index) => (
                <span key={index}>
                  <sup className="text-primary-600 mr-1">{index + 1}</sup>
                  {affiliation}
                </span>
              ))}
            </div>
            </div>
          </div>

          {/* Action Buttons with enhanced hover effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-[fadeInUp_1s_ease-out_0.9s_forwards] opacity-0">
            <a
              href="/Doxing_via_the_lens__arxiv (1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center space-x-2 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Download size={18} className="group-hover:scale-105 transition-transform duration-200" />
              <span>Read Paper</span>
              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <a
              href="https://arxiv.org/abs/2504.19373"
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl group hover:-translate-y-1"
            >
              <img 
                src="/logos/arxiv-logomark-small.svg" 
                alt="arXiv" 
                className="w-5 h-5 group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-gray-700 font-medium">arXiv</span>
              <ExternalLink size={14} className="text-gray-500 group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <a
              href="https://github.com/lutianyu2001/DoxBench"
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center space-x-2 bg-[#1f2937] hover:bg-[#111827] text-white border-[#1f2937] group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Github size={18} className="group-hover:scale-105 transition-transform duration-200" />
              <span>GitHub</span>
              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <a
              href="https://huggingface.co/datasets/DoxxingTeam/DoxBench"
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center space-x-2 bg-yellow-100 hover:bg-yellow-200 text-gray-800 border-yellow-200 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img 
                src="/logos/huggingface-color.svg" 
                alt="Hugging Face" 
                className="w-6 h-6 group-hover:scale-105 transition-transform duration-200"
              />
              <span>Dataset</span>
              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <button 
              onClick={() => document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-secondary inline-flex items-center space-x-2 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span>Explore Leaderboard</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Key Stats with staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="metric-card text-center animate-[fadeInUp_0.8s_ease-out_1.2s_forwards] opacity-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="text-3xl font-bold text-primary-600 mb-2">11</div>
              <div className="text-secondary-700 font-medium">Multi-modal Models</div>
              <div className="text-sm text-secondary-500">Evaluated across tasks</div>
            </div>
            <div className="metric-card text-center animate-[fadeInUp_0.8s_ease-out_1.4s_forwards] opacity-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="text-3xl font-bold text-accent-600 mb-2">8</div>
              <div className="text-secondary-700 font-medium">Metrics</div>
              <div className="text-sm text-secondary-500">Comprehensive evaluation</div>
            </div>
            <div className="metric-card text-center animate-[fadeInUp_0.8s_ease-out_1.6s_forwards] opacity-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">2</div>
              <div className="text-secondary-700 font-medium">Task Types</div>
              <div className="text-sm text-secondary-500">Top-1 and Top-3 performance</div>
            </div>
          </div>

          {/* Abstract Preview with fade-in animation */}
          <div className="mt-16 card max-w-4xl mx-auto text-left animate-[fadeInUp_1s_ease-out_1.8s_forwards] opacity-0">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">Abstract</h3>
            <p className="text-secondary-700 leading-relaxed">
            Recent advances in multi-modal large reasoning models (MLRMs) have shown significant ability to interpret complex visual content. While these models enable impressive reasoning capabilities, they also introduce novel and underexplored privacy risks. In this paper, we identify a novel category of privacy leakage in MLRMs: Adversaries can infer sensitive geolocation information, such as a user's home address or neighborhood, from user-generated images, including selfies captured in private settings. To formalize and evaluate these risks, we propose a three-level visual privacy risk framework that categorizes image content based on contextual sensitivity and potential for location inference. We further introduce DoxBench, a curated dataset of 500 real-world images reflecting diverse privacy scenarios. Our evaluation across 11 advanced MLRMs and MLLMs demonstrates that these models consistently outperform non-expert humans in geolocation inference and can effectively leak location-related private information. This significantly lowers the barrier for adversaries to obtain users' sensitive geolocation information. We further analyze and identify two primary factors contributing to this vulnerability: (1) MLRMs exhibit strong reasoning capabilities by leveraging visual clues in combination with their internal world knowledge; and (2) MLRMs frequently rely on privacy-related visual clues for inference without any built-in mechanisms to suppress or avoid such usage. To better understand and demonstrate real-world attack feasibility, we propose GeoMiner, a collaborative attack framework that decomposes the prediction process into two stages: clue extraction and reasoning to improve geolocation performance while introducing a novel attack perspective. Our findings highlight the urgent need to reassess inference-time privacy risks in MLRMs to better protect users' sensitive information.
            </p>
          </div>
        </div>
      </div>

      {/* Custom animations using CSS keyframes */}
      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero; 