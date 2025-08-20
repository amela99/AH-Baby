import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <video
          src="/hero.mp4"
          alt="Hero"
          className="hero-video"
          autoPlay
          loop
          muted
        />
        <div className="hero-content">
          <h1>Ge ditt barn de bästa startmöjligheterna med våra produkter</h1>
          <p>Upptäck våra noggrant utvalda produkter för barn i alla åldrar</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
