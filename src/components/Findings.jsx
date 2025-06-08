import React from 'react';
import { AlertTriangle, TrendingUp, Shield, Users, MapPin, Eye } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';

const Findings = () => {
  // Animation hooks for different sections
  const headerAnimation = useScrollAnimation({ threshold: 0.2 });
  const impactAnimation = useScrollAnimation({ threshold: 0.3 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.3 });

  const findings = [
    {
      id: 1,
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Significant Privacy Vulnerabilities Across All Models",
      description: "Even state-of-the-art models demonstrate concerning capabilities in inferring private information from minimal data, with top performers achieving over 90% accuracy in location inference tasks.",
      highlight: "90%+ accuracy",
      color: "from-red-500 to-pink-500"
    },
    {
      id: 2,
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Performance Varies Dramatically by Task Complexity",
      description: "Top-3 performance consistently outperforms Top-1 across all models, indicating that privacy risks scale with the number of attempts allowed, raising concerns for real-world applications.",
      highlight: "20-30% improvement",
      color: "from-orange-500 to-yellow-500"
    },
    {
      id: 3,
      icon: <Shield className="w-8 h-8" />,
      title: "Chain-of-Thought Prompting Increases Privacy Risks",
      description: "Models with CoT prompting show enhanced reasoning capabilities that translate to better performance on privacy-invasive tasks, suggesting that improved reasoning can amplify privacy concerns.",
      highlight: "15-25% increase",
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: 4,
      icon: <Users className="w-8 h-8" />,
      title: "Model Size and Architecture Impact Vulnerability",
      description: "Larger, more sophisticated models generally perform better on doxing tasks, indicating that capability improvements come with increased privacy risks that must be carefully managed.",
      highlight: "Size correlates with risk",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 5,
      icon: <MapPin className="w-8 h-8" />,
      title: "Geographic Precision Varies by Location Type",
      description: "Models show higher accuracy for metropolitan areas compared to rural locations, with error distances varying significantly across different geographic regions and population densities.",
      highlight: "Metro vs Rural gap",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 6,
      icon: <Eye className="w-8 h-8" />,
      title: "Privacy Leakage Requires Minimal Information",
      description: "Our analysis reveals that models can infer sensitive location and personal information from surprisingly small amounts of contextual data, highlighting the need for better privacy protections.",
      highlight: "Minimal data needed",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section id="findings" className="py-20 bg-secondary-50">
      <div className="section-container">
        {/* Header with animation */}
        <div 
          ref={headerAnimation.ref}
          className={`text-center mb-16 transition-all duration-800 ${
            headerAnimation.isVisible 
              ? 'opacity-1 animate-[fadeInUp_800ms_ease-out_forwards]' 
              : 'opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold text-secondary-900 mb-6">
            Key Findings
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Our comprehensive evaluation reveals critical insights about AI model vulnerabilities 
            and privacy risks that have important implications for responsible AI development.
          </p>
        </div>

        {/* Findings Grid with staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {findings.map((finding, index) => {
            const findingAnimation = useStaggeredAnimation(index, 150, { threshold: 0.2 });
            
            return (
              <div 
                key={finding.id} 
                ref={findingAnimation.ref}
                className={`card hover:shadow-xl transition-all duration-800 group card-enhanced-hover ${
                  findingAnimation.isVisible 
                    ? `opacity-1 animate-[fadeInUp_800ms_ease-out_${findingAnimation.delay}ms_forwards]` 
                    : 'opacity-0'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${finding.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {finding.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                        Finding {finding.id}: {finding.title}
                      </h3>
                    </div>
                    <p className="text-secondary-700 mb-4 leading-relaxed">
                      {finding.description}
                    </p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${finding.color} text-white`}>
                      {finding.highlight}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Summary with animation */}
        <div 
          ref={impactAnimation.ref}
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-800 ${
            impactAnimation.isVisible 
              ? 'opacity-1 animate-[fadeInUp_800ms_ease-out_forwards]' 
              : 'opacity-0'
          }`}
        >
          <div className="lg:col-span-2">
            <div className="card bg-gradient-to-br from-red-50 to-pink-50 border-red-200 card-enhanced-hover">
              <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                Critical Implications
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 hover:bg-red-50 hover:bg-opacity-50 p-3 rounded transition-all duration-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-red-800">
                    <strong>Immediate Risk:</strong> Current AI models pose significant privacy risks that could be exploited for malicious purposes, requiring urgent attention from developers and policymakers.
                  </p>
                </div>
                <div className="flex items-start space-x-3 hover:bg-red-50 hover:bg-opacity-50 p-3 rounded transition-all duration-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-red-800">
                    <strong>Scaling Concerns:</strong> As models become more capable, these privacy vulnerabilities are likely to increase, making proactive measures essential.
                  </p>
                </div>
                <div className="flex items-start space-x-3 hover:bg-red-50 hover:bg-opacity-50 p-3 rounded transition-all duration-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-red-800">
                    <strong>Regulatory Need:</strong> Our findings highlight the urgent need for privacy-preserving AI development practices and appropriate regulatory frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="metric-card text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 card-enhanced-hover">
              <div className="text-3xl font-bold text-blue-600 mb-2">83.5%</div>
              <div className="text-blue-800 font-medium">Max VRR Score</div>
              <div className="text-sm text-blue-600">Highest validation rate</div>
            </div>
            
            <div className="metric-card text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 card-enhanced-hover">
              <div className="text-3xl font-bold text-green-600 mb-2">5.46km</div>
              <div className="text-green-800 font-medium">Best MED</div>
              <div className="text-sm text-green-600">Median error distance</div>
            </div>

            <div className="metric-card text-center bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 card-enhanced-hover">
              <div className="text-3xl font-bold text-purple-600 mb-2">2002</div>
              <div className="text-purple-800 font-medium">Max GLARE</div>
              <div className="text-sm text-purple-600">Privacy risk score</div>
            </div>
          </div>
        </div>

        {/* Call to Action with animation */}
        <div 
          ref={ctaAnimation.ref}
          className={`mt-16 text-center transition-all duration-800 ${
            ctaAnimation.isVisible 
              ? 'opacity-1 animate-[fadeInUp_800ms_ease-out_200ms_forwards]' 
              : 'opacity-0'
          }`}
        >
          {/* <div className="card max-w-3xl mx-auto bg-gradient-to-r from-secondary-900 to-secondary-800 text-white border-0 card-enhanced-hover">
            <h3 className="text-2xl font-bold mb-4">Explore the Complete Analysis</h3>
            <p className="text-secondary-200 mb-6">
              Dive deeper into our comprehensive benchmark results and see detailed performance 
              comparisons across all evaluated models and metrics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold btn-enhanced-hover"
              >
                View Leaderboard
              </button>
              <a
                href="./Doxing_via_the_lens__arxiv (1).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary-900 px-6 py-3 rounded-lg font-semibold btn-enhanced-hover inline-flex items-center justify-center"
              >
                Read Full Paper
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Findings; 