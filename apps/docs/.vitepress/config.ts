import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '组件规范平台',
  description: '基于 Figma 与 Arco Design Vue 的组件规范平台',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Tokens', link: '/tokens' },
      { text: '组件注册表', link: '/components' }
    ],
    sidebar: [
      { text: '平台说明', link: '/' },
      { text: 'Tokens', link: '/tokens' },
      { text: '组件注册表', link: '/components' }
    ]
  },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  }
});
