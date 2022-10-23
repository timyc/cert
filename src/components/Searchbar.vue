<script lang="ts">
import { defineComponent } from 'vue';
import HTTP from '@/helpers/HTTP';
let delay = (() => {
    let timer = 0;
    return (callback: any, ms: any, that: any) => {
        clearTimeout(timer);
        timer = window.setTimeout(callback.bind(that), ms);
    };
})();
export default defineComponent({
    data() {
        return {
            query: '',
            canSearch: true,
            results: [] as any[],
            showResults: [] as any[],
        };
    },
    methods: {
        search(q: string, lim: number) {
            if (q.length < 1 || !this.canSearch) { // Don't want to request empty queries
                return;
            }
            HTTP.search(q, lim)
                .then((response) => {
                    this.results = response.data.msg;
                })
                .catch((error) => {
                    console.log("sorry there was an error", error);
                })
                .finally(() => { this.canSearch = false });
        }
    },
    updated() {
        delay(() => { // this delays search requests by 1 second every time input is detected
            if (this.query.length < 1) {
                this.results = []; // clear the results if the query is empty
            }
            this.search(this.query, 5);
            this.canSearch = true;
        }, 1000, null);
    }
});
</script>
<template>
    <el-input v-model="query" class="w-50 m-2 sbar" placeholder="Search by student, credential, or university..."
        suffix-icon="Search" />
    <el-table :data="results" class="table-results" style="width: 100%" v-if="results.length > 0">
        <el-table-column prop="name" label="Universities"></el-table-column>
    </el-table>
</template>

<style scoped>
.table-results {
    position: absolute;
    margin-top: 40px;
    z-index: 69;
}
.sbar:before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(-45deg, #fff95b 0%, #ff930f 100%);
    transform: translate3d(0px, 20px, 0) scale(0.95);
    filter: blur(20px);
    opacity: var(0.7);
    transition: opacity 0.3s;
    border-radius: inherit;
}

.sbar::after {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    border-radius: inherit;
}
</style>