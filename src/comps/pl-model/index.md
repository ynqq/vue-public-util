<script setup>
    import Temp from '@/public/temp.vue'
    const beforeInit = async (store) => {
        await store.setFiles({
            'App.vue': `__REPLACE__./demo.replace.vue`,
            'Model.vue': `__REPLACE__./mode.replace.vue`,
            'util.ts': `__REPLACE__./util.ts`,
            'type.ts': `__REPLACE__./type.ts`
        })
    }
</script>
<Temp :beforeInit="beforeInit" />
