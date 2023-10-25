import {createRouter, createWebHistory} from 'vue-router';
import SpaceGame from "@/Pages/SpaceGame.vue";

const routes = [
    {
        path: '/',
        name: 'space_game',
        component: SpaceGame,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
