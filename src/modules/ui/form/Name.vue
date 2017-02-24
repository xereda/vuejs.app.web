<template lang="html">
<div>
  <p class="control has-icon">
    <input :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)" class="input"></input>
    <span class="icon is-small">
      <i :class="faIcon"></i>
    </span>
  </p>
</div>
</template>

<script>
  export default {
    name: 'dmFormName',
    props: [
      'placeholder',
      'value',
      'fa-icon'
    ]
  }
</script>

<style lang="css" scoped>
</style>
