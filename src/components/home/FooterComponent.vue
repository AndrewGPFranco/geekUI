<template>
  <footer class="footer">
    <div class="footer-separator"></div>

    <div class="footer-content">
      <div class="footer-brand">
        <img src="/logo.png" width="56" height="56" alt="Logo do site" class="footer-logo" />
        <span class="footer-title">Geek | Community</span>
      </div>

      <div class="footer-links">
        <router-link to="#">Sobre</router-link>
        <a href="https://www.linkedin.com/in/andrewgpsilva/" target="_blank"
           rel="noopener noreferrer">Contato</a>
        <router-link to="#">Blog</router-link>
        <a href="https://github.com/AndrewGPFranco/geek-community" target="_blank"
           rel="noopener noreferrer">GitHub</a>
      </div>
    </div>

    <div class="footer-copy">
      © {{ new Date().getFullYear() }} Geek | Community. Todos os direitos reservados.
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  padding: 24px 0;
  background-color: #1e2a46;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0;
  position: fixed;
}

.footer-separator {
  width: 100%;
  max-width: 1120px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-bottom: 24px;
}

.footer-content {
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-logo {
  display: block;
}

.footer-title {
  font-size: 18px;
  font-weight: 600;
}

.footer-links {
  display: flex;
  gap: 24px;
  font-size: 14px;
}

.footer-links a,
.footer-links router-link {
  color: white;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover,
.footer-links router-link:hover {
  color: #cccccc;
}

.footer-copy {
  margin-top: 24px;
  font-size: 12px;
  color: #cccccc;
  text-align: center;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
}
</style>
