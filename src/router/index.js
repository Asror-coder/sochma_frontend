import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/Home/HomeView.vue'
import LoginView from '@/components/Auth/LoginView.vue'
import SignupView from '@/components/Auth/SignupView.vue'
import CalculatorView from '@/components/Calculator/CalculatorView.vue'
import NewDealView from '@/components/Deals/NewDealView.vue'
import CurrentDealsView from '@/components/Deals/CurrentDealsView.vue'
import PastDealsView from '@/components/Deals/PastDealsView.vue'
import DealView from '@/components/Deals/DealView.vue'


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
    path: '/deal/new',
    name: 'newDeal',
    component: NewDealView
  },
  {
    path: '/deal/current',
    name: 'currentDeals',
    component: CurrentDealsView
  },
  {
    path: '/deal/old',
    name: 'oldDeals',
    component: PastDealsView
  },
  {
    path: '/deal/:id',
    name: 'dealDetail',
    component: DealView
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
