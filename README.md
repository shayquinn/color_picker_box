# Color Picker Box 🎨

A lightweight, interactive color picker dialog application with context menu support. Right-click anywhere to create multiple color picker dialogs and explore color selection with ease.

## 📋 Description

Color Picker Box is a browser-based application that allows users to create draggable color picker dialogs dynamically through a context menu interface. Built with vanilla JavaScript and Node.js, this project provides an intuitive way to select and work with colors.

## ✨ Features

- **Context Menu Integration**: Right-click anywhere on the page to create a new color picker dialog
- **Multiple Dialogs**: Create and manage multiple color picker instances simultaneously
- **Interactive Color Selection**: Visual color picker interface for easy color selection
- **Draggable Dialogs**: Move color picker dialogs around the screen
- **Lightweight**: No external dependencies for the frontend
- **Simple Server**: Built-in Node.js HTTP server for easy local development

## 🚀 Getting Started

### Prerequisites

- **Method 1**: A local web server (e.g., MAMP, XAMPP, or Live Server)
- **Method 2**: [Node.js](https://nodejs.org/) installed on your system

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shayquinn/color_picker_box.git
cd color_picker_box
```

## 🏃 Running the Application

### Method 1: Using a Local Web Server

If you're using a local server like MAMP or XAMPP:

1. Place the project folder in your server's document root
2. Start your local server
3. Navigate to `http://localhost/color_picker_box` in your browser

### Method 2: Using Node.js (Recommended)

1. Open a terminal/command prompt
2. Navigate to the project directory (where `app.js` is located)
3. Run the following command:

```bash
node app.js
```

4. You should see the message: `Server running at http://localhost:3000/`
5. Open your browser and navigate to: `http://localhost:3000/`

**To stop the server:**
- Press `Ctrl + C` in the terminal
- Or simply close the terminal/command prompt window

## 🎯 Usage

1. Once the application is running, you'll see a blank canvas
2. **Right-click** anywhere on the page to open the context menu
3. Select **"Create Color Picker Dialog"** from the menu
4. A color picker dialog will appear at the clicked location
5. Interact with the color picker to select your desired color
6. Create multiple dialogs by right-clicking in different locations

## 📁 Project Structure

```
color_picker_box/
├── app.js                  # Node.js server
├── index.html              # Main HTML file
├── css/
│   ├── Reset.css          # CSS reset
│   ├── styles.css         # Main styles
│   ├── context.css        # Context menu styles
│   ├── dialog.css         # Dialog box styles
│   └── pick.css           # Color picker styles
├── js/
│   ├── Color_Picker.js    # Color picker functionality
│   └── ContextMenu.js     # Context menu implementation
└── images/
    └── favicon_io/        # Favicon files
```

## 🛠️ Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6 Modules)**
- **Node.js** (HTTP server)

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## 📝 License

This project is open source and available for anyone to use and modify.

## 👤 Author

**Shay Quinn** - [@shayquinn](https://github.com/shayquinn)

## 🎉 Have Fun & Explore!

Experiment with creating multiple color pickers, drag them around, and enjoy the interactive color selection experience!
