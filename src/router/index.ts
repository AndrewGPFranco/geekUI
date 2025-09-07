import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      path: '/',
      meta: { title: 'Home' }
    },
    {
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue'),
      path: '/auth/forgot-password',
      meta: { title: 'Esquecimento de Senha' }
    },
    {
      name: 'forgot-password-uuid',
      component: () => import('../views/ChangePasswordView.vue'),
      path: '/auth/forgot-password/:uuid',
      meta: { title: 'Troca de senha' }
    },
    {
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      path: '/auth/login',
      meta: { title: 'Login' }
    },
    {
      name: 'register-user',
      component: () => import('../views/UserRegisterView.vue'),
      path: '/auth/register',
      meta: { title: 'Registro' }
    },
    {
      name: 'all-topics',
      component: () => import('../views/AllTopicsView.vue'),
      path: '/topics/all',
      meta: { title: 'Tópicos' }
    },
    {
      name: 'topic-byId',
      component: () => import('../views/TopicByIDView.vue'),
      path: '/topics/:uuid',
      meta: { title: 'Tópico' }
    },
    {
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      path: '/profile',
      meta: { title: 'Perfil' }
    }
  ]
})

export default router
