<template>
    <div class="goods">
    <h1>goods</h1>

     this.list.map(item=>{
                            item.children.map(item2=>{
                                item2.children.map(item3=>{
                                    this.defaultArr.push(item3.id)
                                })
                            })

                   })

    </div>
</template>
<script>
export default {
    name:'goods',

}
</script>
<style scoped>

</style>