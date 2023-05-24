BEGIN;

-- Удаляем схему, если она есть
DROP SCHEMA IF EXISTS user_data CASCADE;

-- Основная схема для хранения всех данных пользователя
CREATE SCHEMA IF NOT EXISTS user_data;

-- Включаем криптографические функции
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Создаём перечисление "пол"
DO
$$
    BEGIN
        IF NOT EXISTS(SELECT 1 FROM pg_type WHERE typname = 'gender') THEN
            CREATE TYPE user_data.gender AS ENUM ('Мужской', 'Женский');
        END IF;
    END
$$;

-- Создаём перечисление "время суток"
DO
$$
    BEGIN
        IF NOT EXISTS(SELECT 1 FROM pg_type WHERE typname = 'times_of_day') THEN
            CREATE TYPE user_data.times_of_day AS ENUM ('Утро', 'День', 'Вечер');
        END IF;
    END
$$;

-- Создаём перечисление "статус болезни"
DO
$$
    BEGIN
        IF NOT EXISTS(SELECT 1 FROM pg_type WHERE typname = 'disease_status') THEN
            CREATE TYPE user_data.disease_status AS ENUM ('Болен', 'Вылечился', 'Хроническая');
        END IF;
    END
$$;

-- Создаём таблицу пользователей
CREATE TABLE IF NOT EXISTS user_data.users
(
    id           SERIAL PRIMARY KEY,
    "login"      text             NOT NULL UNIQUE,
    hash_pass    text             NOT NULL DEFAULT '',
    fio          varchar(64)      NOT NULL,
    birthday     timestamp        NOT NULL DEFAULT 'epoch',
    height       int8             NOT NULL,
    "gender"     user_data.gender NOT NULL,
    date_created timestamp        NOT NULL DEFAULT now()
);

-- Создаём таблицу хранения сессий
CREATE TABLE IF NOT EXISTS user_data.sessions
(
    id            SERIAL PRIMARY KEY,
    user_id       integer NOT NULL DEFAULT 0,
    refresh_token text    NOT NULL,
    CONSTRAINT sessions_user_id_users_fk FOREIGN KEY (user_id)
        REFERENCES user_data.users (id) ON DELETE SET DEFAULT ON UPDATE CASCADE
);

-- Создаём таблицу записей
CREATE TABLE IF NOT EXISTS user_data.diary
(
    id               SERIAL PRIMARY KEY,
    user_id          integer                NOT NULL DEFAULT 0,
    pressure         int8                   NOT NULL DEFAULT 0,
    pulse            int8                   NOT NULL DEFAULT 0,
    body_temperature numeric(3, 1)          NOT NULL DEFAULT 0,
    weight           numeric(5, 2)          NOT NULL DEFAULT 0,
    sugar            numeric(3, 1)          NOT NULL DEFAULT 0,
    "info"           text                   NOT NULL DEFAULT '',
    type_day         user_data.times_of_day NOT NULL DEFAULT 'Утро',
    date_created     timestamp              NOT NULL DEFAULT now(),
    CONSTRAINT sessions_user_id_users_fk FOREIGN KEY (user_id)
        REFERENCES user_data.users (id) ON DELETE SET DEFAULT ON UPDATE CASCADE
);

-- Создаём таблицу "список болезней"
CREATE TABLE IF NOT EXISTS user_data.disease
(
    id         SERIAL PRIMARY KEY,
    user_id    integer                  NOT NULL DEFAULT 0,
    "name"     text                     NOT NULL DEFAULT '',
    status     user_data.disease_status NOT NULL,
    date_start timestamp                NOT NULL DEFAULT now(),
    date_end   timestamp                NOT NULL DEFAULT now(),
    "info"     text                     NOT NULL DEFAULT '',
    CONSTRAINT sessions_user_id_users_fk FOREIGN KEY (user_id)
        REFERENCES user_data.users (id) ON DELETE SET DEFAULT ON UPDATE CASCADE
);

COMMIT;