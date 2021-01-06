<template>
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <h1 class="title is-4">Semua data pengguna</h1>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <router-link :to="{name: 'users.create'}" class="button is-light">Tambah</router-link>
            </div>
        </div>
    </div>
    
    <hr>

    <div class="field is-grouped-multiline is-grouped">
        <div class="control">
            <input v-model="search" type="search" class="input" placeholder="Cari nama pengguna">
        </div>
    </div>

    <div class="table-container">
        <table class="table is-fullwidth is-hoverable">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nama Lengkap</th>
                    <th>Alamat E-Mail</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="index">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ new Date(user.created_at).toLocaleDateString() }}</td>
                    <td>{{ new Date(user.updated_at).toLocaleDateString() }}</td>
                    <td class="buttons">
                        <router-link :to="{name: 'users.show', params:{id: user.id} }" class="button is-small is-rounded is-primary">Lihat</router-link>
                        <router-link :to="{name: 'users.edit', params:{id: user.id} }" class="button is-small is-rounded is-info">Edit</router-link>
                        <a @click="clickDelete(user.id)" class="button is-small is-rounded is-danger">Hapus</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import debounce from 'lodash/debounce'

export default {

    data() {
        return {
            users: [],
            search: ''
        }
    },

    mounted() {
        this.fetchData()
    },

    methods: {
        fetchData() {
            axios.get('/api/users', {
                params: {
                    search: this.search
                }
            }).then(({ data }) => {
                this.users = data
            })
        },

        clickDelete(id) {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Apakah Anda yakin ingin menghapus data tersebur?',
                showCancelButton: true,
                confirmButtonText: 'Saya yakin!',
                cancelButtonText: 'Tidak'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/users/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Pemberitahuan!',
                            'Anda telah berhasil menghapus data yang dipilih!',
                            'success'
                        )
                    })
                    .finally(() => {
                        this.fetchData()
                    })
                }
            })
        }
    },

    watch: {
        search: debounce( function() {
            this.fetchData()
        }, 500)
    }
}
</script>