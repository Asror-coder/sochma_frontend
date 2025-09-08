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
    component: DealsView,
    // meta: {
    //   requiresAuth: true // Add meta field to indicate protected route
    // }
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

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // User is authenticated, proceed to the route
//       next();
//     } else {
//       // User is not authenticated, redirect to login
//       next('/login');
//     }
//   } else {
//     // Non-protected route, allow access
//     next();
//   }
// });

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
