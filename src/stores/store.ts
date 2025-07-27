import { defineStore } from "pinia";
// ref - реактивные данные,
import { ref, watch } from "vue";

export const useStore = defineStore("accounts", () => {
  // Типы
  interface Tag {
    text: string;
  }

  interface Account {
    tagsRaw?: string;
    tags: Tag[];
    type: "Локальная" | "LDAP";
    login: string;
    password: string;
    // Record - дженерик, который принимает два параметра: первый - ключ (строка), второй - значение (boolean)
    errors: Record<string, boolean>;
  }

  // Реактивный массив учётных записей
  const accounts = ref<Account[]>([]);

  function loadFromSessionStorage() {
    const saved = sessionStorage.getItem("accounts");

    // Если есть учётные записи в сессии, то загружаем их (в массив объектов)
    if (saved) {
      const raw = JSON.parse(saved);
      accounts.value = raw.map((acc: any) => ({
        ...acc,
        tagsRaw: acc.tags.map((t: any) => t.text).join("; "),
        errors: {},
      }));
    }
  }

  // Сохраняем учётные записи в сессию
  function saveToSessionStorage() {
    const toSave = accounts.value.map((acc) => ({
      tags: acc.tags,
      type: acc.type,
      login: acc.login,
      password: acc.password,
    }));
    sessionStorage.setItem("accounts", JSON.stringify(toSave));
  }

  // Добавление новой учётной записи в массив
  function add() {
    accounts.value.push({
      tagsRaw: "",
      tags: [],
      type: "Локальная",
      login: "",
      password: "",
      errors: {},
    });
  }

  // Удаление учётной записи по индексу и сохранение получившегося массива
  function remove(index: number) {
    accounts.value.splice(index, 1);
    saveToSessionStorage();
  }

  // Валидация и сохранение учётной записи
  function validateAndSave(index: number) {
    const acc = accounts.value[index];
    const errors: Record<string, boolean> = {};

    // Проверка полей
    if (!acc.login.trim() || acc.login.length > 100) {
      errors.login = true;
    }

    if (acc.type === "Локальная") {
      if (!acc.password.trim() || acc.password.length > 100) {
        errors.password = true;
      }
    } else {
      acc.password = "";
    }

    if (acc.tagsRaw && acc.tagsRaw.length > 50) {
      errors.tagsRaw = true;
    }

    // Обновление ошибок
    acc.errors = errors;

    // Если нет ошибок, то сохраняем
    if (Object.keys(errors).length === 0) {
    // Переводим строку с тегами в массив
      acc.tags =
        acc.tagsRaw
          ?.split(";")
          .map((t) => t.trim())
          .filter((t) => t.length > 0)
          .map((t) => ({ text: t })) || [];

      saveToSessionStorage();
      return true;
    }

    return false;

  }

  // Обновление поля учётной записи по индексу
  function updateField(index: number, field: keyof Account, value: any) {
    accounts.value[index][field] = value;
  }

  loadFromSessionStorage();

  return { accounts, add, remove, validateAndSave, updateField };
});
