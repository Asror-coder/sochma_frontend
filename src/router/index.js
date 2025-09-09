import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/Home/HomeView.vue'
import PaymentsView from '@/components/Payments/PaymentsView.vue'
import LoginView from '@/components/Auth/LoginView.vue'
import SignupView from '@/components/Auth/SignupView.vue'
import DealsView from '@/components/Deals/DealsView.vue'
import CalculatorView from '@/components/Calculator/CalculatorView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/deals',
    name: 'deals',
    component: DealsView
  },
  {
    path: '/payments',
    name: 'payments',
    component: PaymentsView
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: CalculatorView
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const publicPages = ['login', 'signup'];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = !!localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next({ name: 'login' });
  }
  next();
});

export default router
