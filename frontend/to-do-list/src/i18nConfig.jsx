import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "signup.header": "Registration",
      "signin.header": "Login",
      "signup.info": "Enter your user details below.",
      "signin.info": "You can login with your registered account.",
      "label.name": "Name",
      "label.email": "Email",
      "label.password": "Password",
      "registration.conditions": "Agree with terms and conditions",
      "register.button": "Register",
      "register.question": "Already have an account?",
      "login.question": "Don’t have an account?",
      "create.one": "Create one!",
      "login.button": "Login!",
      "frame.text": "Manage multiple tasks in one place!",
      "remember.me": "Remember me",
      "signin.button": "Login",
      "tasks.tab": "Tasks",
      "calendar.tab": "Calendar",
      "search.input": "Search tasks",
      "sort.priority": "Sort by Priority",
      "sort.creation": "Sort by Creation",
      "no.tasks": "No tasks available",
      "updated.at": "Updated at:",
      "form.header": "Task",
      "label.title": "Enter title",
      "label.description": "Enter description",
      "select.priority": "Select priority",
      "add.button": "Add",
      "toggle.language": "Toggle Language",
    },
  },
  ru: {
    translation: {
      "signup.header": "Регистрация",
      "signin.header": "Авторизация",
      "signup.info": "Введите свои данные пользователя ниже.",
      "signin.info":
        "Вы можете войти в свою зарегистрированную учетную запись.",
      "label.name": "Имя",
      "label.email": "Email",
      "label.password": "Пароль",
      "registration.conditions": "Согласен с условиями",
      "register.button": "Зарегистрироваться",
      "register.question": "У вас уже есть аккаунт?",
      "login.question": "У вас нет аккаунта?",
      "create.one": "Создайте!",
      "login.button": "Войти!",
      "frame.text": "Управляйте несколькими задачами в одном месте!",
      "remember.me": "Запомнить меня",
      "signin.button": "Войти",
      "tasks.tab": "Задачи",
      "calendar.tab": "Календарь",
      "search.input": "Поиск задач",
      "sort.priority": "Сортировать по приоритету",
      "sort.creation": "Сортировать по созданию",
      "no.tasks": "Нет доступных задач",
      "updated.at": "Обновлено в:",
      "form.header": "Задача",
      "label.title": "Введите название",
      "label.description": "Введите описание",
      "select.priority": "Выберите приоритет",
      "add.button": "Добавить",
      "toggle.language": "Переключить язык",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
