<template>
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <h1 class="title is-4">Tampil data pengguna</h1>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <router-link :to="{name: 'users.edit', params: {id: this.id}}" class="button is-light">Edit</router-link>
            </div>
            <div class="level-item">
                <router-link :to="{name: 'users.index'}" class="button is-light">Kembali</router-link>
            </div>
        </div>
    </div>
    
    <hr>

    <div class="field">
        <label class="label">Nama Lengkap</label>
        <div class="control">
            <pre>{{ user.name }}</pre>
        </div>
    </div>
    <div class="field">
        <label class="label">Alamat E-Mail</label>
        <div class="control">
            <pre>{{ user.email }}</pre>
        </div>
    </div>
    <div class="field">
        <label class="label">CreatedAt</label>
        <div class="control">
            <pre>{{ new Date(user.created_at).toLocaleDateString() }}</pre>
        </div>
    </div>
    <div class="field">
        <label class="label">UpdatedAt</label>
        <div class="control">
            <pre>{{ new Date(user.updated_at).toLocaleDateString() }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            user: {}
        }
    },

    mounted() {
        axios.get(`/api/users/${this.id}`).then(({ data }) => {
            this.user = data
        })
    }
}
</script>