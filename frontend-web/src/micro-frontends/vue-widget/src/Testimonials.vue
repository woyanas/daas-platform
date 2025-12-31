<script setup lang="ts">
import { ref } from 'vue'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

const testimonials = ref<Testimonial[]>([
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechCorp',
    content: 'DaaS has transformed how we visualize our data. The dashboards are intuitive and our team productivity has increased by 40%.',
    avatar: 'S'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Data Lead',
    company: 'DataFirst',
    content: 'The best dashboard platform we\'ve used. Easy to set up, powerful features, and the support team is incredibly responsive.',
    avatar: 'M'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'CEO',
    company: 'StartupHub',
    content: 'We switched from a legacy BI tool and couldn\'t be happier. DaaS gives us real-time insights that drive our decisions.',
    avatar: 'E'
  }
])

const currentIndex = ref(0)

const nextTestimonial = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
}

const prevTestimonial = () => {
  currentIndex.value = currentIndex.value === 0 
    ? testimonials.value.length - 1 
    : currentIndex.value - 1
}

const current = () => testimonials.value[currentIndex.value]
</script>

<template>
  <div class="testimonials-widget">
    <div class="testimonial-card">
      <div class="quote-icon">"</div>
      <p class="content">{{ current().content }}</p>
      <div class="author">
        <div class="avatar">{{ current().avatar }}</div>
        <div class="info">
          <div class="name">{{ current().name }}</div>
          <div class="role">{{ current().role }} at {{ current().company }}</div>
        </div>
      </div>
      <div class="navigation">
        <button @click="prevTestimonial" class="nav-btn">←</button>
        <div class="dots">
          <span 
            v-for="(_, index) in testimonials" 
            :key="index"
            :class="['dot', { active: index === currentIndex }]"
            @click="currentIndex = index"
          />
        </div>
        <button @click="nextTestimonial" class="nav-btn">→</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.testimonials-widget {
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
}

.testimonial-card {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(15, 23, 42, 0.5));
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.quote-icon {
  font-size: 4rem;
  line-height: 1;
  color: #6366f1;
  opacity: 0.5;
}

.content {
  font-size: 1.125rem;
  color: #cbd5e1;
  line-height: 1.75;
  margin: 1rem 0 1.5rem;
}

.author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
}

.info .name {
  font-weight: 600;
  color: white;
}

.info .role {
  font-size: 0.875rem;
  color: #64748b;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(51, 65, 85, 0.5);
}

.nav-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #334155;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #334155;
  cursor: pointer;
  transition: all 0.2s;
}

.dot.active {
  background: #6366f1;
  transform: scale(1.25);
}
</style>
