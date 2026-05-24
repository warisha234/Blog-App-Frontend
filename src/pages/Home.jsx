import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Moon,
  Star,
  Flame,
  PenSquare,
  BookOpen,
  TrendingUp,
  Users,
  BadgeCheck,
  Search,
  MessageCircle,
  Newspaper,
  Crown,
  ChevronUp,
} from "lucide-react";

import "./Home.css";

export default function Home() {
  const [email, setEmail] = useState("");

const handleSubscribe = (e) => {
  e.preventDefault(); // Page refresh hone se rokta hai

  // Email validation check
  if (!email) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter your email address first!',
      background: '#0a0a0a',
      color: '#ffffff',
      confirmButtonColor: '#eaff00',
    });
    return;
  }

  // Regex check for valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
      background: '#0a0a0a',
      color: '#ffffff',
      confirmButtonColor: '#eaff00',
    });
    return;
  }

  // Success Alert
  Swal.fire({
    icon: 'success',
    title: 'Welcome to InkSphere! 🎉',
    text: 'Thank you for subscribing! Check your inbox soon.',
    background: '#0a0a0a',
    color: '#ffffff',
    confirmButtonColor: '#eaff00',
  });

  setEmail(""); // Input box ko khali karne ke liye
};

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showTop, setShowTop] = useState(false);

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/blogs?search=${encodeURIComponent(search)}`);
  };

  useEffect(() => {

    const scrollHandler = () => {
      setShowTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };

  }, []);

  return (
    <div className="home">

      {/* FLOATING GLOW */}
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="nav-container">

          {/* LOGO */}
          <div className="logo">

            <div className="logo-icon">
              <Crown size={20} />
            </div>

            <h1>InkSphere.</h1>

          </div>

          {/* LINKS */}
          <div className="nav-links">

            <a href="#home-section">Home</a>
            <a href="#categories-section">Categories</a>
            <a href="#trending-section">Trending</a>
          
            <a href="#newsletter-section">Newsletter</a>

          </div>

          {/* BUTTONS */}
          <div className="nav-buttons">

            <Link to="/login" className="signin-btn">
              Sign In
            </Link>

            <Link to="/register" className="start-btn">
              Get Started
            </Link>

          </div>

        </div>

      </nav>

      {/* HERO */}
      <section className="hero" id="home-section">

        <div className="hero-content">

          {/* LEFT */}
          <div className="hero-left fade-up">

            <div className="tag">
              <Sparkles size={14} />
              Premium Blogging Platform
            </div>

            <h1>
              Share Your Ideas <br />
              <span>With The World.</span>
            </h1>

            <p>
              Discover trending blogs, write your own stories,
              explore creativity, technology, lifestyle,
              fashion, business, travel and everything you love.
            </p>

            {/* SEARCH */}
            <div className="hero-search">

              <div className="search-box">

                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search articles, categories, writers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />

              </div>

              <button onClick={handleSearch}>
                Explore
              </button>

            </div>

            {/* BUTTONS */}
            <div className="hero-buttons">

              <Link to="/blogs" className="primary-btn">
                Explore Blogs
                <ArrowRight size={20} />
              </Link>

              <Link to="/register" className="secondary-btn">
                Start Writing
              </Link>

            </div>

            {/* STATS */}
            <div className="stats">

              <div>
                <h2>50K+</h2>
                <span>Readers</span>
              </div>

              <div>
                <h2>12K+</h2>
                <span>Articles</span>
              </div>

              <div>
                <h2>5K+</h2>
                <span>Writers</span>
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="hero-right fade-right">

            <div className="main-card">

              {/* FEATURED CARD */}
              <div className="mood-card">

                <div className="mood-top">

                  <div>

                    <p>Featured Story</p>

                    <h2>
                      The Future Of Creative Blogging
                    </h2>

                  </div>

                  <div className="moon-icon">
                    <Flame size={24} />
                  </div>

                </div>

                <div className="quote-box">
                  “Great stories inspire millions of people every day.”
                </div>

              </div>

              {/* MINI CARDS */}
              <div className="mini-cards">

                <div className="mini-card">

                  <div className="mini-icon pink">
                    <PenSquare size={20} />
                  </div>

                  <h3>Write Stories</h3>

                  <p>Create premium blogs easily.</p>

                </div>

                <div className="mini-card">

                  <div className="mini-icon green">
                    <TrendingUp size={20} />
                  </div>

                  <h3>Trending Topics</h3>

                  <p>Explore what people love reading.</p>

                </div>

                <div className="mini-card">

                  <div className="mini-icon blue">
                    <Users size={20} />
                  </div>

                  <h3>Community</h3>

                  <p>Connect with passionate writers.</p>

                </div>

                <div className="mini-card">

                  <div className="mini-icon yellow">
                    <BadgeCheck size={20} />
                  </div>

                  <h3>Verified Authors</h3>

                  <p>Read trusted quality content.</p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="categories" id="categories-section">

        <div className="feature-heading">

          <p>EXPLORE CATEGORIES</p>

          <h2>
            Find Blogs From Every
            <span> Topic</span>
          </h2>

        </div>

        <div className="category-grid">

          <div className="category-card">
            <BookOpen size={26} />
            <h3>Technology</h3>
          </div>

          <div className="category-card">
            <Sparkles size={26} />
            <h3>Lifestyle</h3>
          </div>

          <div className="category-card">
            <Moon size={26} />
            <h3>Productivity</h3>
          </div>

          <div className="category-card">
            <Star size={26} />
            <h3>Travel</h3>
          </div>

          <div className="category-card">
            <ShieldCheck size={26} />
            <h3>Business</h3>
          </div>

          <div className="category-card">
            <MessageCircle size={26} />
            <h3>Community</h3>
          </div>

        </div>

      </section>

     {/* CORE FEATURES SECTION */}
<section className="core-features" id="why-inksphere">
  <div className="feature-heading">
    <p>THE INKSPHERE EXPERIENCE</p>
    <h2>
      Designed For The Next Generation Of <span>Creators</span>
    </h2>
  </div>

  <div className="core-features-grid">
    {/* Feature 1 */}
    <div className="core-feature-card">
      <div className="core-icon-wrapper">
        <Sparkles size={24} />
      </div>
      <h3>AI-Powered Insights</h3>
      <p>Optimize your headlines and content readability with built-in real-time AI assistance.</p>
    </div>

    {/* Feature 2 */}
    <div className="core-feature-card">
      <div className="core-icon-wrapper">
        <ShieldCheck size={24} />
      </div>
      <h3>Clutter-Free Reading</h3>
      <p>No intrusive popups or heavy ads. Just pure typography optimized for long-form reading.</p>
    </div>

    {/* Feature 3 */}
    <div className="core-feature-card">
      <div className="core-icon-wrapper">
        <TrendingUp size={24} />
      </div>
      <h3>Advanced Analytics</h3>
      <p>Track your audience growth, click-through rates, and reading time with custom graphs.</p>
    </div>
  </div>
</section>

     {/* TRENDING */}
<section className="latest-blogs" id="trending-section">
  <div className="feature-heading">
    <p>TRENDING ARTICLES</p>
    <h2>Most Popular <span> Blogs</span></h2>
  </div>

  <div className="blog-grid">
    {/* Card 1 */}
    <div className="blog-card">
      <img 
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200" 
        alt="AI Blogging" 
        className="blog-image" 
      />
      <div className="blog-content">
        <span className="blog-tag">Technology</span>
        <h3>Why AI Is Changing Modern Blogging Forever</h3>
        <p>Discover how AI tools are transforming creativity and digital writing.</p>
        <Link to="/blogs" className="read-more">
          Read Article <ArrowRight size={18} />
        </Link>
      </div>
    </div>

    {/* Card 2 */}
    <div className="blog-card">
      <img 
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200" 
        alt="Minimalism" 
        className="blog-image" 
      />
      <div className="blog-content">
        <span className="blog-tag">Lifestyle</span>
        <h3>Minimalism And Clean Living In 2026</h3>
        <p>Learn how simplifying your lifestyle improves focus and happiness.</p>
        <Link to="/blogs" className="read-more">
          Read Article <ArrowRight size={18} />
        </Link>
      </div>
    </div>

    {/* Card 3 */}
    <div className="blog-card">
      <img 
        src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200" 
        alt="Freelancing" 
        className="blog-image" 
      />
      <div className="blog-content">
        <span className="blog-tag">Business</span>
        <h3>Top Skills Every Freelancer Needs Today</h3>
        <p>Build strong income streams and grow your online career faster.</p>
        <Link to="/blogs" className="read-more">
          Read Article <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </div>
</section>
    {/* news */}
    <section className="newsletter" id="newsletter-section">
    <div className="newsletter-content">
      <Newspaper size={45} />

      <h2>Join Our Creative Newsletter</h2>

      <p>
        Get trending blogs, writing tips and latest stories directly in your inbox.
      </p>

      {/* Inputs ko hamesha form tag mein wrap karna professional practice hai */}
      <form onSubmit={handleSubscribe} className="newsletter-box">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">
          Subscribe
        </button>
      </form>
    </div>
  </section>

      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-content">

          <div className="footer-left">

            <div className="footer-logo">

              <div className="logo-icon">
                <Crown size={18} />
              </div>

              <h2>InkSphere.</h2>

            </div>

            <p>
              A premium modern blogging platform where creators share stories,
              ideas and knowledge with the world.
            </p>

          </div>

          <div className="footer-links">

            <h3>Quick Links</h3>

            <a href="#home-section">Home</a>
            <a href="#categories-section">Categories</a>
            <a href="#trending-section">Trending</a>
            <a href="#features-section">Features</a>

          </div>

          <div className="footer-links">

            <h3>Platform</h3>

            <Link to="/blogs">Explore Blogs</Link>
            <Link to="/register">Become Writer</Link>
            <Link to="/login">Login</Link>

          </div>
<div className="footer-bottom">
          © 2026 InkSphere. Crafted With Creativity ✦
        </div>
        </div>

        

      </footer>

      {/* SCROLL TOP */}
      {showTop && (
        <button
          className="scroll-top"
          onClick={() => window.scrollTo({
            top: 0,
            behavior: "smooth"
          })}
        >
          <ChevronUp size={20} />
        </button>
      )}

    </div>
  );
}