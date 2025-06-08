import React from 'react';
import { Eye, Brain, Target, Award } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';

const Algorithm = () => {
  // Animation hooks for different sections
  const headerAnimation = useScrollAnimation({ threshold: 0.2 });
  const imageAnimation = useScrollAnimation({ threshold: 0.3 });
  const methodologyAnimation = useScrollAnimation({ threshold: 0.2 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.3 });

  const steps = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Data Collection",
      description: "Systematic gathering of privacy-sensitive scenarios and user information patterns",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Model Evaluation", 
      description: "Testing AI models across various privacy-invasive tasks and scenarios",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Vulnerability Analysis",
      description: "Identifying patterns and weaknesses in model responses to sensitive queries",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Performance Metrics",
      description: "Comprehensive scoring across multiple privacy and accuracy dimensions",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="algorithm" className="py-20 bg-white">
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
            DoxBench Framework
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Our comprehensive evaluation framework systematically assesses AI models' capabilities 
            in privacy-invasive scenarios, providing crucial insights for responsible AI development.
          </p>
        </div>

        {/* Framework Image with animation */}
        <div 
          ref={imageAnimation.ref}
          className={`mb-16 transition-all duration-800 ${
            imageAnimation.isVisible 
              ? 'opacity-1 animate-[scaleIn_800ms_ease-out_200ms_forwards]' 
              : 'opacity-0'
          }`}
        >
          <img 
            src="/framework.png" 
            alt="DoxBench Framework Overview" 
            className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>

        {/* Process Flow with staggered animations */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const stepAnimation = useStaggeredAnimation(index, 150, { threshold: 0.2 });
              
              return (
                <div 
                  key={index} 
                  ref={stepAnimation.ref}
                  className={`relative flex flex-col items-center transition-all duration-800 card-enhanced-hover ${
                    stepAnimation.isVisible 
                      ? `opacity-1 animate-[fadeInUp_800ms_ease-out_${stepAnimation.delay}ms_forwards]` 
                      : 'opacity-0'
                  }`}
                >
                  {/* Connector Line - positioned between cards */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-2 w-4 h-0.5 bg-gradient-to-r from-secondary-300 to-secondary-200 z-0"></div>
                  )}
                  
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-secondary-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Methodology Details with animation */}
        <div 
          ref={methodologyAnimation.ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-800 ${
            methodologyAnimation.isVisible 
              ? 'opacity-1 animate-[fadeInUp_800ms_ease-out_forwards]' 
              : 'opacity-0'
          }`}
        >
          <div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">
              Evaluation Methodology
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 card-enhanced-hover p-4 rounded-lg transition-all duration-300">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Privacy Task Design</h4>
                  <p className="text-secondary-600">We designed comprehensive scenarios covering various aspects of personal information inference and geolocation tasks.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 card-enhanced-hover p-4 rounded-lg transition-all duration-300">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Multi-Model Evaluation</h4>
                  <p className="text-secondary-600">Systematic testing across 24+ state-of-the-art language models with varying architectures and capabilities.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 card-enhanced-hover p-4 rounded-lg transition-all duration-300">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Comprehensive Metrics</h4>
                  <p className="text-secondary-600">Multiple evaluation dimensions including accuracy, privacy risk, and geographical precision.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-secondary-50 to-primary-50 border-0 card-enhanced-hover">
            <h4 className="text-xl font-semibold text-secondary-900 mb-6">Key Metrics</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center hover:bg-white hover:bg-opacity-50 p-2 rounded transition-all duration-200">
                <span className="text-secondary-700">Validation Rate Ratio (VRR)</span>
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center hover:bg-white hover:bg-opacity-50 p-2 rounded transition-all duration-200">
                <span className="text-secondary-700">Average Error Distance (AED)</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center hover:bg-white hover:bg-opacity-50 p-2 rounded transition-all duration-200">
                <span className="text-secondary-700">Median Error Distance (MED)</span>
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center hover:bg-white hover:bg-opacity-50 p-2 rounded transition-all duration-200">
                <span className="text-secondary-700">State Accuracy</span>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center hover:bg-white hover:bg-opacity-50 p-2 rounded transition-all duration-200">
                <span className="text-secondary-700">Metro Accuracy</span>
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center hover:bg-white hover:bg-opacity-50 p-2 rounded transition-all duration-200">
                <span className="text-secondary-700">GLARE Score</span>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
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
          {/* <div className="card max-w-2xl mx-auto bg-gradient-to-r from-primary-500 to-accent-500 text-white border-0 card-enhanced-hover">
            <h3 className="text-2xl font-bold mb-4">Ready to Explore?</h3>
            <p className="text-primary-100 mb-6">
              Dive into our comprehensive leaderboard to see how different AI models perform 
              across privacy-invasive tasks.
            </p>
            <button 
              onClick={() => document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-lg font-semibold btn-enhanced-hover"
            >
              View Leaderboard
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Algorithm; 