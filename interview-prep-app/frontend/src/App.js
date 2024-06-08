// frontend/src/App.js
import React from 'react';
import './App.css'
import UploadForm from './components/UploadForm';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Interview Preparation App</h1>
                <p>Get personalized interview questions based on your resume!</p>
            </header>
            <main>
                <UploadForm />
            </main>
            <footer>
                <p>&copy; 2024 Interview Preparation App</p>
            </footer>
        </div>
    );
}

export default App;
