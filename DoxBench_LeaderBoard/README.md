---
title: DoxBench Leaderboard
emoji: 🏆
colorFrom: blue
colorTo: purple
sdk: gradio
sdk_version: 4.44.0
app_file: app.py
pinned: false
license: mit
short_description: Document-based location estimation model leaderboard
---

# 🏆 DoxBench Leaderboard

A comprehensive leaderboard for document-based location estimation models, built with Gradio and deployed on Hugging Face Spaces.

## 📋 Overview

This leaderboard showcases the performance of various AI models on document-based location estimation tasks. Models are evaluated across multiple metrics and sections to provide a comprehensive view of their capabilities.

## 🚀 Features

- **Interactive Filtering**: Filter results by section, method, and model
- **Top Performers**: Highlight the best performing models in each section
- **Comprehensive Metrics**: Display multiple evaluation metrics including VRR, AED, MED, and more
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Updates**: Dynamic filtering and sorting capabilities

## 📊 Evaluation Metrics

- **VRR (Visual Recognition Rate)**: Percentage of images correctly recognized
- **AED (Average Error Distance)**: Average distance error in kilometers
- **MED (Median Error Distance)**: Median distance error in kilometers
- **State Acc**: State-level accuracy percentage
- **Metro Acc**: Metropolitan area accuracy percentage
- **Tract**: Census tract level predictions
- **Block**: Census block level predictions
- **GLARE**: Geographic Location and Recognition Evaluation score in bits

## 🔧 Sections

- **Top 1**: Single best prediction accuracy
- **Top 3**: Accuracy when considering top 3 predictions

## 🛠️ Methods

- **vanilla**: Standard model inference
- **+CoT**: Chain-of-Thought enhanced inference

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/DoxBenchLeaderBoard.git
cd DoxBenchLeaderBoard
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

4. Open your browser and navigate to the provided local URL (typically `http://127.0.0.1:7860`)

### Hugging Face Spaces

This leaderboard is designed to be deployed on [Hugging Face Spaces](https://huggingface.co/spaces). Simply:

1. Create a new Space on Hugging Face
2. Upload your code and data files
3. The application will automatically start

## 📁 Data Structure

The leaderboard reads data from `data/doxbench_leaderboard.csv` with the following columns:

- Section
- Model
- Method
- VRR
- AED_km
- MED_km
- State_Acc_pct
- Metro_Acc_pct
- Tract
- Block
- GLARE_bits

## 🎨 Customization

The interface can be customized by modifying:

- **CSS Styling**: Update the `custom_css` variable in `app.py`
- **Metrics**: Add or modify evaluation metrics in the data processing functions
- **Filters**: Extend filtering capabilities in the `filter_data` function
- **Color Scheme**: Adjust the gradient colors and styling in the CSS

## 📝 Citation

If you use this leaderboard or the DoxBench dataset, please cite:

```bibtex
@article{doxbench2024,
  title={DoxBench: A Comprehensive Benchmark for Document-based Location Estimation},
  author={Research Team},
  journal={arXiv preprint},
  year={2024}
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Hugging Face Space](https://huggingface.co/spaces/your-username/doxbench-leaderboard)
- [Dataset](https://huggingface.co/datasets/your-username/doxbench)
- [Paper](https://arxiv.org/abs/2024.xxxxx)

# AI Model Leaderboard

A modern, interactive web application for displaying AI model performance data with beautiful charts and sortable tables.

## Features

🏆 **Dual Section Display**: Separate views for Top 1 and Top 3 performance metrics  
📊 **Interactive Charts**: Beautiful bar charts showing VRR performance using Chart.js  
📋 **Sortable Tables**: Click column headers to sort data by any metric  
🎨 **Modern UI**: Clean, responsive design with Tailwind CSS  
📱 **Mobile Friendly**: Fully responsive layout that works on all devices  
🔍 **Rich Tooltips**: Hover over chart bars for detailed information  

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Beautiful, responsive charts
- **Papa Parse** - CSV parsing library

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Data Format

The application expects CSV data with the following columns:

- `Section`: "Top 1" or "Top 3"
- `Model`: AI model name
- `Method`: Method used (e.g., "vanilla", "+CoT")
- `VRR`: Validation Rate Ratio (percentage)
- `AED_km`: Average Error Distance in kilometers
- `MED_km`: Median Error Distance in kilometers
- `State_Acc_pct`: State Accuracy percentage
- `Metro_Acc_pct`: Metro Accuracy percentage
- `GLARE_bits`: GLARE score in bits

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Page header with title and legend
│   ├── LeaderboardSection.jsx  # Section container (Top 1/Top 3)
│   ├── VRRChart.jsx        # Bar chart component
│   └── DataTable.jsx       # Sortable data table
├── App.jsx                 # Main application component
├── main.jsx               # React entry point
└── index.css              # Global styles and Tailwind imports

public/
└── data/
    └── doxbench_leaderboard.csv  # Data source
```

## Features in Detail

### Interactive Charts
- Bar charts sorted by VRR performance (highest to lowest)
- Color-coded bars for easy model identification
- Rich tooltips showing all metrics on hover
- Responsive design that adapts to screen size

### Sortable Tables
- Click any column header to sort
- Visual indicators for sort direction
- Color-coded cells based on performance thresholds
- Formatted numeric values for better readability

### Performance Indicators
- **VRR**: Green (≥90%), Blue (≥70%), Yellow (≥50%), Red (<50%)
- **Accuracy**: Green (100%), Blue (≥95%), Default (others)

## Customization

### Adding New Metrics
1. Update the CSV with new columns
2. Add column definitions in `DataTable.jsx`
3. Optionally add to chart tooltips in `VRRChart.jsx`

### Styling
- Modify `tailwind.config.js` for theme customization
- Update component classes for styling changes
- Add custom CSS in `src/index.css`

## License

MIT License - feel free to use this project for your own leaderboards!