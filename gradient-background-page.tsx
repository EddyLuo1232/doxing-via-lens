import React from 'react';

export default function GradientBackgroundPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 主渐变背景 */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 210, 255, 0.5) 0%, 
            rgba(144, 194, 233, 0.5) 100%)`
        }}
      />
      
      {/* 额外的渐变层增加深度 */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 20%, 
            rgba(255, 210, 255, 0.3) 0%, 
            transparent 50%),
          radial-gradient(circle at 70% 80%, 
            rgba(144, 194, 233, 0.3) 0%, 
            transparent 50%)`
        }}
      />
      
      {/* 内容区域 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            优雅渐变背景
          </h1>
          <p className="text-lg text-gray-700 text-center max-w-md">
            这是一个使用透明渐变色的精美背景页面，从粉色(#ffd2ff)到蓝色(#90c2e9)，
            50%透明度让效果更加柔和自然。
          </p>
          
          <div className="mt-8 space-y-4">
            <div className="bg-white/30 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-semibold text-gray-800 mb-2">颜色信息</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: '#ffd2ff'}}></div>
                  <span>#ffd2ff (粉色)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: '#90c2e9'}}></div>
                  <span>#90c2e9 (蓝色)</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-pink-300/50 to-blue-300/50 hover:from-pink-300/70 hover:to-blue-300/70 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/30">
              示例按钮
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}