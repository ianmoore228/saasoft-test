<script setup lang="ts">
import "./form.css"
import { ref } from 'vue'

const auth = ref('Локальная')

console.log(auth.value)
console.log(auth)

</script>

<template>
    <section class="form">
        <div class="form__wrapper" width="800">
            <div class="form__title-wrapper">
                <h1>Учётные записи</h1><v-btn icon="mdi-plus" variant="outlined" class="form__button"></v-btn>
            </div>
            <v-chip color="secondary" prepend-icon="mdi-help-circle" class="form__chip">
                Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
            </v-chip>

                <v-table class="form__table">

                    <tbody>
                        <tr class="form__table-headers-row">
                            <th class="form__table-header-cell form__table-header-cell_tags">Метки</th>
                            <th class="form__table-header-cell form__table-header-cell_type">Тип записи</th>
                            <th class="form__table-header-cell form__table-header-cell_login">Логин</th>
                            <th class="form__table-header-cell form__table-header-cell_password">Пароль</th>
                            <th class="form__table-header-cell form__table-header-cell_delete"></th>
                        </tr>
                        <tr>
                            <td class="form__table-cell form__table-cell_tags"><v-text-field hide-details="auto"></v-text-field></td>
                            <td class="form__table-cell form__table-cell_type"><v-select
                                v-model="auth"
                                class="form__select" hide-details="auto" :items="['Локальная', 'LDAP']"></v-select></td>
                            <td class="form__table-cell form__table-cell_login" :colspan="auth === 'LDAP' ? 1 : 2"><v-text-field hide-details="auto"></v-text-field></td>
                            <td class="form__table-cell form__table-cell_password" v-show="auth === 'LDAP'" ><v-text-field hide-details="auto"></v-text-field></td>
                            <td class="form__table-cell form__table-cell_delete"><v-btn class="form__button" icon="mdi-trash-can-outline"></v-btn></td>
                        </tr>
                    </tbody>
                </v-table>
        
        </div>
 
    </section>
</template>

<style scoped>

.form__button {
    border-radius: 10px;
}

</style>