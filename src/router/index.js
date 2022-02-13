import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home.vue')
	},
	{
		path: '/menu',
		name: 'Menu',
		component: () => import('@/views/Menu.vue')
	},
	{
		path: '/play',
		name: 'Play',
		component: () => import('@/views/Play.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
