import { createWebHistory, createRouter } from 'vue-router'

function page (path) {
  return () => import(`./pages/${path}`).then(m => m.default || m)
}

const history = createWebHistory()

const router = createRouter({
    history,
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-active',
    routes: [
        {
            path: '/',
            component: page('index.vue'),
            name: 'home'
        },
        {
            path: '/users',
            component: page('users/index.vue'),
            name: 'users.index'
        },
        {
            path: '/users/create',
            component: page('users/create.vue'),
            name: 'users.create'
        },
        {
            path: '/users/:id/edit',
            component: page('users/edit.vue'),
            name: 'users.edit'
        },
        {
            path: '/users/:id',
            component: page('users/show.vue'),
            name: 'users.show'
        }
    ]
})

export default router