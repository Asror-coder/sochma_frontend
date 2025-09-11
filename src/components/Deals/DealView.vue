<template>
    <div>
        Deal Details Page
        <div v-if="loading">Loading...</div>
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
</template>

<script>
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
        try {
            const response = await axios.get(`/api/Deal/${id}`);
            this.deal = response.data;
        } catch (error) {
            this.deal = null;
        } finally {
            this.loading = false;
        }
    }
}
</script>