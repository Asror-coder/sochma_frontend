import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Dashboard/Home/HomeView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import SignupView from '@/views/Auth/SignupView.vue'
import UpcomingTripsView from '@/views/Dashboard/UpcomingTrips/UpcomingTripsView.vue'
import PastTripsView from '@/views/Dashboard/PastTrip/PastTripsView.vue'
import NewTripView from '@/views/Dashboard/NewTrips/NewTripView.vue'

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
    path: '/upcoming-trips',
    name: 'upcomingTrips',
    component: UpcomingTripsView
  },
  {
    path: '/past-trips',
    name: 'pastTrips',
    component: PastTripsView
  },
  {
    path: '/new-trip',
    name: 'newTrip',
    component: NewTripView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
