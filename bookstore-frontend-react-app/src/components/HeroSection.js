import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <Container fluid className="h-100">
          <Row className="h-100 align-items-center justify-content-center text-center">
            <Col lg={8}>
              <h1 className="hero-title">
                Welcome to <span className="brand-highlight">ClothingStore</span>
              </h1>
              <p className="hero-subtitle">
                Discover Your Style, Define Your Fashion
              </p>
              <p className="hero-description">
                From trendy T-shirts to elegant dresses, premium shoes to stylish accessories - 
                find everything you need to express your unique style
              </p>
              <div className="hero-buttons">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="hero-btn primary-btn me-3"
                  onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                >
                  Shop Now
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="hero-btn secondary-btn"
                  onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                >
                  View Collection
                </Button>
              </div>
              
              {/* Category highlights */}
              <div className="hero-categories">
                <div className="category-item">👕 T-Shirts</div>
                <div className="category-item">👖 Jeans</div>
                <div className="category-item">👗 Dresses</div>
                <div className="category-item">🧥 Jackets</div>
                <div className="category-item">👟 Shoes</div>
                <div className="category-item">🏃‍♂️ Activewear</div>
                <div className="category-item">👔 Formal</div>
                <div className="category-item">👜 Accessories</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;