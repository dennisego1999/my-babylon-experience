import {createRouter, createWebHistory} from 'vue-router';
import BoatGame from "@/Pages/BoatGame.vue";

const routes = [
    {
        path: '/',
        name: 'boat_game',
        component: BoatGame,
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
