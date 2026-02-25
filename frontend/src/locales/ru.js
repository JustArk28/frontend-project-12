import RenameChannelModal from "../components/Modals/RenameChannelModal";
import SignUpPage from "../components/SignUpPage";
import { addChannel, removeChannel } from "../slices/channelsSlice";

const resources = {
  ru: {
    translation: {
      mainPage: {
        title: "Hexlet Chat",
        exitBtn: "Выйти",
      },
      logInPage: {
        title: "Войти",
        username: "Ваш ник",
        password: "Пароль",
        enterBtn: "Войти",
        feedback: "Неверные имя пользователя или пароль",
        question: "Нет аккаунта? ",
        registration: "Регистрация",
      },
      signUpPage: {
        title: "Регистрация",
        username: "Имя пользователя",
        password: "Пароль",
        confirmPassword: "Подтвердите пароль",
        registrationBtn: "Зарегистрироваться",
        errors: {
          usernameRange: "От 3 до 20 символов",
          usernameExist: "Такой пользователь уже существует",
          passwordRange: "Не менее 6 символов",
          passwordConfirm: "Пароли должны совпадать",
          required: "Обязательное поле",
        },
      },
      errorPage: {
        title: "Страница не найдена",
        subtitle: "Но вы можете перейти ",
        link: "на главную страницу",
      },
      image: {
        login: "Приветственное изображение при входе в чат",
        signup: "Изображение при регистрации",
        NotFound: "404 Данной страницы не существует",
      }, //
      messagesForm: {
        label: "Новое сообщение",
        placeholder: "Введите сообщение...",
        submitBtn: "Отправить",
      },
      messagesContainer: {
        messages_one: "{{count}} сообщение",
        messages_few: "{{count}} сообщения",
        messages_many: "{{count}} сообщений",
      },
      channelTitle: {
        title: "Каналы",
        addBtn: "+",
      },
      dropdownBtn: {
        description: 'Управление каналом',
        removeBtn: "Удалить",
        renameBtn: "Переименовать",
      },
      modal: {
        label: "Имя канала",
        addChannel: {
          title: "Добавить канал",
          closeBtn: "Отменить",
          submitBtn: "Отправить",
        },
        removeChannel: {
          title: "Удалить канал",
          question: "Уверены?",
          closeBtn: "Отменить",
          removeBtn: "Удалить",
        },
        renameChannel: {
          title: "Переименовать канал",
          closeBtn: "Отменить",
          submitBtn: "Отправить",
        },
      },
      validation: {
        notOneOf: "Должно быть уникальным",
        range: "От 3 до 20 символов",
        required: "Обязательное поле",
      },
      toastify: {
        success: {
          add: "Канал создан",
          rename: "Канал переименован",
          remove: "Канал удалён",
        },
        error: {
          error: "Ошибка",
          connectionError: "Ошибка соединения",
          authError: "Ошибка авторизации",
        },
      },
    },
  },
};

export default resources;
