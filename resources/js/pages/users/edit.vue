<template>
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <h1 class="title is-4">Edit data pengguna</h1>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <router-link :to="{name: 'users.show', params: {id: this.id}}" class="button is-light">Lihat</router-link>
            </div>
            <div class="level-item">
                <router-link :to="{name: 'users.index'}" class="button is-light">Kembali</router-link>
            </div>
        </div>
    </div>

    <hr>

    <form @submit.prevent="submit" method="post">
        <div class="field">
            <label for="name" class="label">Nama Lengkap</label>
            <div class="control">
                <input v-model="form.name" type="text" name="name" id="name" class="input" required>
            </div>
        </div>
        
        <div class="field">
            <label for="email" class="label">Alamat E-Mail</label>
            <div class="control">
                <input v-model="form.email" type="email" name="email" id="email" class="input" required>
            </div>
        </div>
        <div class="field">
            <label class="checkbox">
                <input v-model="changePassword" type="checkbox"> Ganti kata sandi lama
            </label>
        </div>
        <div v-if="changePassword" class="field">
            <label for="password" class="label">Kata Sandi</label>
            <div class="control">
                <input v-model="form.password" type="password" name="password" id="password" class="input" required>
            </div>
        </div>
        <div v-if="changePassword" class="field">
            <label for="password_confirmation" class="label">Konfigurasi Kata Sandi</label>
            <div class="control">
                <input v-model="form.password_confirmation" type="password" name="password_confirmation" id="password_confirmation" class="input" required>
            </div>
        </div>

        <div class="field">
            <button class="button is-fullwidth is-primary">Perbarui</button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            changePassword: false,
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        }
    },

    methods: {
        submit() {
            axios.put(`/api/users/${this.id}`, this.form).then(({ data }) => {
                this.$router.push({
                    name: 'users.show',
                    params: {
                        id: data.id
                    }
                })
            })
        }
    },

    mounted() {
        axios.get(`/api/users/${this.id}`).then(({ data }) => {
            this.form = data
        })
    }
}
</script>