<template>
    <main class="flex justify-center mt-24">
        <div class="flex flex-col">
            <h1 class="text-3xl pb-5 text-gray-500">{{ $t('DealsPage.DealDetails') }}</h1>

            <div v-if="loading" class="text-gray-400 animate-pulse">
                {{ $t('Common.Loading') }}
            </div>
            <div v-else-if="!deal" class="text-gray-400 italic">
                {{ $t('DealsPage.DealNotFound') }}
            </div>
            <div v-else-if="deal">
                <h1>{{ deal.brand }} {{ deal.model }} ({{ deal.year }})</h1>
                <p>{{ deal.description }}</p>
                <p>Serial Number: {{ deal.serialNumber }}</p>
                <p>Price: ${{ deal.price }}</p>  
                <p>Downpayment: ${{ deal.downpayment }}</p>
                <p>Period: {{ deal.periodMonth }} months</p>
                <p>Total Profit: ${{ deal.totalProfit }}</p>
                <p>Broker Profit: ${{ deal.brokerProfit }}</p>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DealView',
    data() {
        return {
            deal: null,
            loading: true
        }
    },
    async mounted() {
        const { id } = this.$route.params;
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`/api/Deal/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            this.deal = response.data;
        } catch (error) {
            this.deal = null;
        } finally {
            this.loading = false;
        }
    }
}
</script>