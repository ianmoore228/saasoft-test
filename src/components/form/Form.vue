<script setup lang="ts">
import { useStore } from '../../stores/store'
// onMounted - метод, который вызывается после монтирования компонента
import { onMounted, ref } from 'vue' 
import "./form.css"

const store = useStore()

// const auth = ref('Локальная')

// Если учётных записей нет, то добавляем одну
onMounted(() => {
  if (store.accounts.length === 0) {
    store.add()
  }
})

</script>

<template>
  <section class="form">
    <div class="form__wrapper">
      <div class="form__title-wrapper">
        <h1>Учётные записи</h1>
        <v-btn class="form__button" icon="mdi-plus" variant="outlined" @click="store.add()" /> <!-- Добавление учётной записи -->  
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

          <!-- v-for - цикл, который проходит по всем учётным записям. :error - проп vuetify, который подсвечивает поле, если оно не прошло валидацию -->
          <tr class="form__table-row" v-for="(acc, index) in store.accounts" :key="index">
            <td class="form__table-cell">
              <v-text-field
                :model-value="acc.tagsRaw" 
                @update:model-value="val => store.updateField(index, 'tagsRaw', val)" 
                :error="acc.errors.tagsRaw === true" 
                @blur="() => store.validateAndSave(index)"
                hide-details="auto"
              />
            </td>

            <td class="form__table-cell">
              <v-select
                :model-value="acc.type"
                :items="['Локальная', 'LDAP']"
                @update:model-value="val => { store.updateField(index, 'type', val); store.validateAndSave(index) }"
                hide-details="auto"
              />
            </td>

            <td class="form__table-cell" :colspan="acc.type === 'LDAP' ? 2 : 1">
              <v-text-field
                :model-value="acc.login"
                @update:model-value="val => store.updateField(index, 'login', val)"
                :error="acc.errors.login === true"
                @blur="() => store.validateAndSave(index)"
                hide-details="auto"
              />
            </td>

            <td class="form__table-cell" v-show="acc.type === 'Локальная'">
              <v-text-field
                :model-value="acc.password"
                @update:model-value="val => store.updateField(index, 'password', val)"
                :error="acc.errors.password === true"
                @blur="() => store.validateAndSave(index)"
                hide-details="auto"
              />
            </td>

            <td class="form__table-cell">
              <v-btn class="form__button" icon="mdi-trash-can-outline" @click="store.remove(index)" />
            </td>
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
