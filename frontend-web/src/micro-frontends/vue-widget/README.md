# Vue Testimonials Widget

Vue 3 micro-frontend for testimonials carousel.

## Build
```bash
npm install
npm run build
```

## Integration with React

The widget is exposed as a Web Component for easy React integration:

```tsx
// In React component
import '../micro-frontends/vue-widget/dist/vue-testimonials.js'

function Home() {
  return (
    <section>
      <vue-testimonials />
    </section>
  )
}
```

## Standalone Vue Usage

```vue
<script setup>
import { Testimonials } from './vue-widget'
</script>

<template>
  <Testimonials />
</template>
```
