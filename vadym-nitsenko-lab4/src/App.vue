<script setup lang="ts">
import { useBreakpoints } from '@/composables/useBreakpoints'

const {
  width,
  isMobile,
  isTablet,
  isDesktop,
  greater,
  smaller,
  between
} = useBreakpoints({
  mobile: 640,
  tablet: 960,
  desktop: 1280
})
</script>

<template>
  <div class="container">
    <div class="width-display">
      Ширина вікна: {{ width }}px
    </div>

    <div class="info-section">
      <h3>Тип пристрою</h3>
      <div class="device-status">
        <div class="device-card" :class="{ active: isMobile }">
          <div class="device-icon">📱</div>
          <div class="device-name">Мобільний</div>
          <div class="device-range">&lt; 640px</div>
        </div>
        <div class="device-card" :class="{ active: isTablet }">
          <div class="device-icon">📟</div>
          <div class="device-name">Планшет</div>
          <div class="device-range">640px - 960px</div>
        </div>
        <div class="device-card" :class="{ active: isDesktop }">
          <div class="device-icon">🖥</div>
          <div class="device-name">Десктоп</div>
          <div class="device-range">&gt;= 1280px</div>
        </div>
      </div>
    </div>

    <div class="info-section">
      <h3>Перевірка брейкпоінтів</h3>
      <div class="methods-grid">
        <div class="method-card">
          <div class="method-name">greater("tablet")</div>
          <div class="method-desc">Ширина &gt;= 960px</div>
          <div class="method-result" :class="{ true: greater('tablet').value }">
            {{ greater('tablet').value ? 'true' : 'false' }}
          </div>
        </div>

        <div class="method-card">
          <div class="method-name">smaller("desktop")</div>
          <div class="method-desc">Ширина &lt; 1280px</div>
          <div class="method-result" :class="{ true: smaller('desktop').value }">
            {{ smaller('desktop').value ? 'true' : 'false' }}
          </div>
        </div>

        <div class="method-card">
          <div class="method-name">between("mobile", "desktop")</div>
          <div class="method-desc">640px &lt;= Ширина &lt; 1280px</div>
          <div class="method-result" :class="{ true: between('mobile', 'desktop').value }">
            {{ between('mobile', 'desktop').value ? 'true' : 'false' }}
          </div>
        </div>

        <div class="method-card">
          <div class="method-name">greater("mobile")</div>
          <div class="method-desc">Ширина &gt;= 640px</div>
          <div class="method-result" :class="{ true: greater('mobile').value }">
            {{ greater('mobile').value ? 'true' : 'false' }}
          </div>
        </div>

        <div class="method-card">
          <div class="method-name">smaller("tablet")</div>
          <div class="method-desc">Ширина &lt; 960px</div>
          <div class="method-result" :class="{ true: smaller('tablet').value }">
            {{ smaller('tablet').value ? 'true' : 'false' }}
          </div>
        </div>

        <div class="method-card">
          <div class="method-name">between("tablet", "desktop")</div>
          <div class="method-desc">960px &lt;= Ширина &lt; 1280px</div>
          <div class="method-result" :class="{ true: between('tablet', 'desktop').value }">
            {{ between('tablet', 'desktop').value ? 'true' : 'false' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.width-display {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.info-section {
  margin-bottom: 2rem;
}

.info-section h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.device-status {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.device-card {
  padding: 1.5rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.device-card.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.device-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.device-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.device-range {
  font-size: 0.9rem;
  opacity: 0.8;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.method-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.method-name {
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.method-desc {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.8rem;
}

.method-result {
  font-size: 1.1rem;
  font-weight: bold;
  color: #dc3545;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  text-align: center;
}

.method-result.true {
  color: #28a745;
}

@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }

  .width-display {
    font-size: 1.5rem;
  }

  .methods-grid,
  .device-status {
    grid-template-columns: 1fr;
  }
}
</style>
