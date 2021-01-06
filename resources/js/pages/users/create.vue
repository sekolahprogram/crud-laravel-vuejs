<template>
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <h1 class="title is-4">Tambah data pengguna</h1>
            </div>
        </div>
        <div class="level-right">
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
                <input v-model="form.name" type="text" name="name" id="name"
                    :class="['input', {
                        'is-danger': errors.name
                    }]"
                >
            </div>
            <p v-if="errors.name" class="help is-danger">{{errors.name[0]}}</p>
        </div>
        
        <div class="field">
            <label for="email" class="label">Alamat E-Mail</label>
            <div class="control">
                <input v-model="form.email" type="email" name="email" id="email"
                    :class="['input', {
                        'is-danger': errors.email
                    }]"
                >
            </div>
            <p v-if="errors.email" class="help is-danger">{{errors.email[0]}}</p>
        </div>
        <div class="field">
            <label for="password" class="label">Kata Sandi</label>
            <div class="control">
                <input v-model="form.password" type="password" name="password" id="password"
                    :class="['input', {
                        'is-danger': errors.password
                    }]"
                >
            </div>
            <p v-if="errors.password" class="help is-danger">{{errors.password[0]}}</p>
        </div>
        <div class="field">
            <label for="password_confirmation" class="label">Konfigurasi Kata Sandi</label>
            <div class="control">
                <input v-model="form.password_confirmation" type="password" name="password_confirmation" id="password_confirmation"
                    :class="['input', {
                        'is-danger': errors.password_confirmation
                    }]"
                >
            </div>
            <p v-if="errors.password_confirmation" class="help is-danger">{{errors.password_confirmation[0]}}</p>
        </div>

        <div class="field">
            <button class="button is-fullwidth is-primary">Simpan</button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            errors: {}
        }
    },

    methods: {
        submit() {
            this.errors = {}
            
            axios.post('/api/users', this.form)
            .then(({ data }) => {
                this.$router.push({
                    name: 'users.show',
                    params: {
                        id: data.id
                    }
                })
            })
            .catch(({ response }) => {
                this.errors = response.data.errors
            })
        }
    }
}
</script>