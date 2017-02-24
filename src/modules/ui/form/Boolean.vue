<template lang="html">
<div>
  <input type="checkbox" class="checkbox" :checked="value" @change="$emit('input', $event.target.checked)">
</div>
</template>

<script>
  export default {
    name: 'dmFormBoolean',
    props: [
      'value'
    ]
  }
</script>

<style lang="css" scoped>
</style>
