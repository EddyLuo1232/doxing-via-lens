---
title: DoxBench LeaderBoard
emoji: 📊
colorFrom: blue
colorTo: purple
sdk: static
app_file: dist/index.html
pinned: false
---

# DoxBench: Understanding Doxing via the Lens of AI

A comprehensive project page for the DoxBench research, featuring an interactive leaderboard and detailed analysis of AI model capabilities in privacy-invasive tasks.

## 🌟 Features

- **Interactive Leaderboard**: Comprehensive evaluation results with sortable tables and interactive charts
- **Performance Metrics**: Multiple evaluation dimensions including VRR, error distances, and geographical accuracy
- **Data Visualization**: Charts with filtering options for different methodologies and metrics
- **Research Paper Access**: Direct links to the full research paper and supplementary materials
- **Responsive Design**: Modern, mobile-friendly interface inspired by RAGEN website aesthetics

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo/doxbench-page.git
cd doxbench-page
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## 📊 Leaderboard Features

The integrated leaderboard maintains all functionality from the original DoxBench leaderboard:

- **Interactive Charts**: Bar charts with model-specific colors and filtering options
- **Sortable Tables**: Click column headers to sort by any metric
- **Method Filtering**: Filter results by vanilla or Chain-of-Thought (CoT) prompting
- **Metric Selection**: Switch between VRR, GLARE, and other performance metrics
- **Model Logos**: Visual identification of different AI model providers

### Metrics Explained

- **VRR (Validation Rate Ratio)**: Percentage of successful privacy-invasive task completions
- **AED (Average Error Distance)**: Mean geographical error in kilometers
- **MED (Median Error Distance)**: Median geographical error in kilometers  
- **State Accuracy**: Percentage of correct state-level predictions
- **Metro Accuracy**: Percentage of correct metropolitan area predictions
- **GLARE Score**: Comprehensive privacy risk assessment score

## 🛠 Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Interactive data visualization
- **Papa Parse**: CSV data parsing
- **Lucide React**: Modern icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation and branding
│   ├── Hero.jsx            # Title, authors, and abstract
│   ├── Algorithm.jsx       # Methodology explanation
│   ├── Findings.jsx        # Key research insights
│   ├── Leaderboard.jsx     # Main leaderboard component
│   ├── Citation.jsx        # BibTeX and citation info
│   ├── Footer.jsx          # Footer with links
│   └── leaderboard/
│       ├── LeaderboardSection.jsx  # Section wrapper
│       ├── DataTable.jsx           # Sortable data table
│       └── VRRChart.jsx           # Interactive charts
├── App.jsx                 # Main application component
├── main.jsx               # React entry point
└── index.css              # Global styles
public/
├── data/                  # CSV data files
├── logos/                 # Model provider logos
└── Doxing_via_the_lens__arxiv (1).pdf  # Research paper
```

## 🎨 Design System

The project follows a design system inspired by the RAGEN website:

- **Colors**: Primary blue, secondary grays, and accent purple
- **Typography**: Inter font family with proper hierarchy
- **Components**: Consistent card layouts, buttons, and spacing
- **Animations**: Subtle hover effects and smooth transitions

## 📖 Content Customization

To customize the content for your research:

1. **Update Author Information**: Edit the `authors` and `affiliations` arrays in `Hero.jsx`
2. **Modify Abstract**: Update the abstract text in the Hero component
3. **Add Research Findings**: Edit the `findings` array in `Findings.jsx`
4. **Update Citation**: Modify the BibTeX and citation information in `Citation.jsx`
5. **Replace PDF**: Add your paper PDF to the `public/` directory
6. **Update Links**: Replace GitHub and arXiv links throughout the components

## 🔧 Data Updates

To update the leaderboard data:

1. Replace the CSV file in `public/data/doxbench_leaderboard.csv`
2. Ensure the CSV maintains the same column structure:
   - Section, Model, Method, VRR, AED_km, MED_km, State_Acc_pct, Metro_Acc_pct, Tract, Block, GLARE_bits
3. Add any new model logos to `public/logos/`
4. Update the logo mapping in `DataTable.jsx` if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

For questions about the research or this project page:

- 📧 Email: contact@yourdomain.com
- 💬 GitHub Issues: [Open an issue](https://github.com/your-repo/issues)
- 📄 Paper: [arXiv:2024.xxxxx](https://arxiv.org/abs/2024.xxxxx)

## ⚠️ Research Disclaimer

This research is conducted for academic purposes to understand and mitigate privacy risks in AI systems. The findings are intended to promote responsible AI development and should not be used for malicious purposes. Please use this work responsibly and in accordance with applicable laws and ethical guidelines.

---

*Built with ❤️ for responsible AI research* 