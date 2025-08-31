<template>
  <footer class="footer">
    <div class="footer-gradient"></div>

    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-brand">
          <div class="logo-container">
            <img src="/logo.png" alt="Logo do site" class="footer-logo" />
            <div class="logo-glow"></div>
          </div>
          <div class="brand-text">
            <span class="footer-title">Geek | Community</span>
            <p class="footer-subtitle">Conectando mentes geeks pelo mundo</p>
          </div>
        </div>

        <div class="footer-links-section">
          <div class="links-group">
            <h4 class="links-title">Navegação</h4>
            <div class="footer-links">
              <router-link to="#" class="footer-link">
                <i class="pi pi-info-circle"></i>
                <span>Sobre</span>
              </router-link>
              <router-link to="#" class="footer-link">
                <i class="pi pi-file-edit"></i>
                <span>Blog</span>
              </router-link>
            </div>
          </div>

          <div class="links-group">
            <h4 class="links-title">Conecte-se</h4>
            <div class="footer-links">
              <a href="https://www.linkedin.com/in/andrewgpsilva/"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="footer-link social-link">
                <i class="pi pi-linkedin"></i>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/AndrewGPFranco/geek-community"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="footer-link social-link">
                <i class="pi pi-github"></i>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-separator"></div>

      <div class="footer-bottom">
        <div class="footer-copy">
          © {{ new Date().getFullYear() }} Geek | Community. Todos os direitos reservados.
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  text-align: center;
  justify-content: center;
  margin-left: 250px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #1e293b;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}

.footer-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: black;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 1.5rem;
  position: relative;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.logo-container {
  position: relative;
  flex-shrink: 0;
}

.footer-logo {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.logo-glow {
  position: absolute;
  inset: -4px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  filter: blur(8px);
}

.footer-brand:hover .logo-glow {
  opacity: 0.6;
}

.footer-brand:hover .footer-logo {
  transform: scale(1.05);
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1e293b, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

.footer-links-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.links-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.links-title {
  font-size: 1rem;
  font-weight: 600;
  color: #334155;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.footer-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background: #95a3cf;
  transition: width 0.3s ease;
  z-index: -1;
}

.footer-link:hover {
  color: white;
  transform: translateX(4px);
}

.footer-link:hover::before {
  width: 100%;
}

.footer-link i {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.footer-link:hover i {
  transform: scale(1.1);
}

.social-link:hover {
  color: white;
}

.footer-separator {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
  margin: 2rem 0 1.5rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copy {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .footer {
    margin-left: 200px;
  }
}

@media (max-width: 768px) {
  .footer {
    margin-left: 0;
  }

  .footer-content {
    padding: 2rem 1rem 1rem;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-links-section {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .footer-brand {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .brand-text {
    align-items: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 1.5rem 0.75rem 1rem;
  }

  .footer-links-section {
    gap: 1rem;
  }

  .footer-logo {
    width: 56px;
    height: 56px;
  }

  .footer-title {
    font-size: 1.25rem;
  }
}
</style>
