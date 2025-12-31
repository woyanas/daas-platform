import { createApp } from 'vue'
import Testimonials from './Testimonials.vue'

// Custom element wrapper for React integration
class TestimonialsElement extends HTMLElement {
    connectedCallback() {
        const app = createApp(Testimonials)
        app.mount(this)
    }

    disconnectedCallback() {
        // Cleanup if needed
    }
}

// Register as custom element for use in React
if (!customElements.get('vue-testimonials')) {
    customElements.define('vue-testimonials', TestimonialsElement)
}

// Also export for direct Vue usage
export { Testimonials }
export default Testimonials
