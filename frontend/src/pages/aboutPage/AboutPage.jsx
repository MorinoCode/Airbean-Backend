import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <main className="about-container">
        <h2>Om Oss</h2>
        <section className="about-section">
          <p>
            Välkommen till Airbean – din digitala kaffebar där kvalitet och hållbarhet möts!
            Vi brinner för kaffe och människor. Vårt kaffe kommer från noggrant utvalda odlare
            runt om i världen som delar vår passion för hållbarhet och rättvisa villkor.
          </p>

          <p>
            Alla våra bönor är ekologiskt odlade och handplockade för att ge dig en smakupplevelse
            utöver det vanliga. Vi rostar kaffet småskaligt i Sverige, vilket säkerställer att varje
            kopp du dricker är färsk, smakrik och bryggd med kärlek.
          </p>

          <p>
            Genom att handla hos oss stödjer du inte bara hållbart jordbruk – du väljer också ett företag
            som bryr sig om både människor och miljö. Vi tackar för ditt förtroende och ser fram emot att
            servera dig din nästa favoritkopp!
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
