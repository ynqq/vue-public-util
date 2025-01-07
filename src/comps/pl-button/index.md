<script setup>
    import Temp from '@/public/temp.vue'
    const beforeInit = async (store) => {
        store.setFiles({
            'App.vue': `__REPLACE__./demo.replace.vue`
        })
    }
</script>
<Temp :beforeInit="beforeInit" />
