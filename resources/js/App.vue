<template>
    <nav class="navbar has-shadow">
        <div class="container">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">Home</router-link>
                <a
                    @click="isNavbarActive = !isNavbarActive"
                    role="button"
                    :class="['navbar-burger', {
                        'is-active': isNavbarActive
                    }]"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div
                :class="['navbar-menu', {
                    'is-active': isNavbarActive
                }]"
            >
                <div class="navbar-end">
                <router-link to="/users" class="navbar-item is-tab">Users</router-link>
                </div>
            </div>
        </div>
    </nav>
    <section class="section">
        <div class="container">
            <router-view />
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isNavbarActive: false
        }
    }
}
</script>