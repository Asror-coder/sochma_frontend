import axios from 'axios';

export default {
  namespaced: true,

  state: () => ({
    deals: [],
    deal: null,
    payments: [],
    loading: false,
    error: null,
    pagination: {
      pageNumber: 1,
      pageSize: 10,
      totalCount: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false
    }
  }),

  mutations: {
    SET_DEALS(state, deals) {
      state.deals = deals;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
    SET_DEAL(state, deal) {
      state.deal = deal;
    },
    SET_PAYMENTS(state, payments) {
      state.payments = payments;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },

  actions: {
    // Delete a payment by ID
    async delete_payment({ dispatch }, paymentId) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/Payment/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        await dispatch('fetch_payments');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    },
    // Fetch paginated deals for the broker
    async fetchDeals({ commit }, { pageNumber = 1, pageSize = 10 } = {}) {
      commit('SET_LOADING', true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/Deal/broker/', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            pageNumber,
            pageSize
          }
        });
        const data = response.data;
        commit('SET_DEALS', data.items || []);
        commit('SET_PAGINATION', {
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalCount: data.totalCount,
          totalPages: data.totalPages,
          hasNextPage: data.hasNextPage,
          hasPreviousPage: data.hasPreviousPage
        });
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_DEALS', []);
        commit('SET_PAGINATION', {
          pageNumber: 1,
          pageSize: 10,
          totalCount: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        });
        commit('SET_ERROR', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      } finally {
        commit('SET_LOADING', false);
      }
    },

    // Fetch details of a specific deal by ID
    async fetchDeal({ commit, dispatch }, dealId) {
      commit('SET_LOADING', true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/Deal/${dealId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        commit('SET_DEAL', response.data);
        commit('SET_ERROR', null);
        // Fetch payments after deal is fetched
        await dispatch('fetch_payments');
      } catch (error) {
        commit('SET_DEAL', null);
        commit('SET_ERROR', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      } finally {
        commit('SET_LOADING', false);
      }
    },

    // Fetch payments related to a specific deal
    async fetch_payments({ commit, state }) {
      commit('SET_LOADING', true);
      try {
        const token = localStorage.getItem('token');
        const dealId = state.deal && state.deal.dealId;

        if (!dealId) {
          commit('SET_PAYMENTS', []);
          commit('SET_LOADING', false);
          return;
        }
        
        const response = await axios.get(`/api/Payment/stats/deal/${dealId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        commit('SET_PAYMENTS', response.data.items || []);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_PAYMENTS', []);
        commit('SET_ERROR', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      } finally {
        commit('SET_LOADING', false);
      }
    },

    // Create a new payment for a specific deal
    async create_payment({ dispatch }, { dealId, amount }) {
      try {
        const token = localStorage.getItem('token');
        await axios.post('/api/Payment/', {
          dealId,
          amount
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        await dispatch('fetch_payments');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }
  },

  getters: {
    deals: state => state.deals,
    deal: state => state.deal,
    payments: state => state.payments,
    loading: state => state.loading,
    error: state => state.error,
    pagination: state => state.pagination
  }
}