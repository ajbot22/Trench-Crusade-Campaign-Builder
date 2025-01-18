import { useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <section className="upper-half">
          <p>Placeholder for upper half content</p>
        </section>
        <section className="lower-half">
          <p>Placeholder for lower half content</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};


export default App
