--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY user_data.disease DROP CONSTRAINT sessions_user_id_users_fk;
ALTER TABLE ONLY user_data.diary DROP CONSTRAINT sessions_user_id_users_fk;
ALTER TABLE ONLY user_data.sessions DROP CONSTRAINT sessions_user_id_users_fk;
ALTER TABLE ONLY user_data.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY user_data.users DROP CONSTRAINT users_login_key;
ALTER TABLE ONLY user_data.sessions DROP CONSTRAINT sessions_pkey;
ALTER TABLE ONLY user_data.disease DROP CONSTRAINT disease_pkey;
ALTER TABLE ONLY user_data.diary DROP CONSTRAINT diary_pkey;
ALTER TABLE user_data.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE user_data.sessions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE user_data.disease ALTER COLUMN id DROP DEFAULT;
ALTER TABLE user_data.diary ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE user_data.users_id_seq;
DROP TABLE user_data.users;
DROP SEQUENCE user_data.sessions_id_seq;
DROP TABLE user_data.sessions;
DROP SEQUENCE user_data.disease_id_seq;
DROP TABLE user_data.disease;
DROP SEQUENCE user_data.diary_id_seq;
DROP TABLE user_data.diary;
DROP TYPE user_data.times_of_day;
DROP TYPE user_data.gender;
DROP TYPE user_data.disease_status;
DROP EXTENSION pgcrypto;
DROP SCHEMA user_data;
--
-- Name: user_data; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA user_data;


ALTER SCHEMA user_data OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: disease_status; Type: TYPE; Schema: user_data; Owner: postgres
--

CREATE TYPE user_data.disease_status AS ENUM (
    'Болен',
    'Вылечился',
    'Хроническая'
);


ALTER TYPE user_data.disease_status OWNER TO postgres;

--
-- Name: gender; Type: TYPE; Schema: user_data; Owner: postgres
--

CREATE TYPE user_data.gender AS ENUM (
    'Мужской',
    'Женский'
);


ALTER TYPE user_data.gender OWNER TO postgres;

--
-- Name: times_of_day; Type: TYPE; Schema: user_data; Owner: postgres
--

CREATE TYPE user_data.times_of_day AS ENUM (
    'Утро',
    'День',
    'Вечер'
);


ALTER TYPE user_data.times_of_day OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: diary; Type: TABLE; Schema: user_data; Owner: postgres
--

CREATE TABLE user_data.diary (
    id integer NOT NULL,
    user_id integer DEFAULT 0 NOT NULL,
    pressure bigint DEFAULT 0 NOT NULL,
    pulse bigint DEFAULT 0 NOT NULL,
    body_temperature numeric(3,1) DEFAULT 0 NOT NULL,
    weight numeric(5,2) DEFAULT 0 NOT NULL,
    sugar numeric(3,1) DEFAULT 0 NOT NULL,
    info text DEFAULT ''::text NOT NULL,
    type_day user_data.times_of_day DEFAULT 'Утро'::user_data.times_of_day NOT NULL,
    date_created timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE user_data.diary OWNER TO postgres;

--
-- Name: diary_id_seq; Type: SEQUENCE; Schema: user_data; Owner: postgres
--

CREATE SEQUENCE user_data.diary_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_data.diary_id_seq OWNER TO postgres;

--
-- Name: diary_id_seq; Type: SEQUENCE OWNED BY; Schema: user_data; Owner: postgres
--

ALTER SEQUENCE user_data.diary_id_seq OWNED BY user_data.diary.id;


--
-- Name: disease; Type: TABLE; Schema: user_data; Owner: postgres
--

CREATE TABLE user_data.disease (
    id integer NOT NULL,
    user_id integer DEFAULT 0 NOT NULL,
    name text DEFAULT ''::text NOT NULL,
    status user_data.disease_status NOT NULL,
    date_start timestamp without time zone DEFAULT now() NOT NULL,
    date_end timestamp without time zone DEFAULT now() NOT NULL,
    info text DEFAULT ''::text NOT NULL
);


ALTER TABLE user_data.disease OWNER TO postgres;

--
-- Name: disease_id_seq; Type: SEQUENCE; Schema: user_data; Owner: postgres
--

CREATE SEQUENCE user_data.disease_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_data.disease_id_seq OWNER TO postgres;

--
-- Name: disease_id_seq; Type: SEQUENCE OWNED BY; Schema: user_data; Owner: postgres
--

ALTER SEQUENCE user_data.disease_id_seq OWNED BY user_data.disease.id;


--
-- Name: sessions; Type: TABLE; Schema: user_data; Owner: postgres
--

CREATE TABLE user_data.sessions (
    id integer NOT NULL,
    user_id integer DEFAULT 0 NOT NULL,
    refresh_token text NOT NULL
);


ALTER TABLE user_data.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: user_data; Owner: postgres
--

CREATE SEQUENCE user_data.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_data.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: user_data; Owner: postgres
--

ALTER SEQUENCE user_data.sessions_id_seq OWNED BY user_data.sessions.id;


--
-- Name: users; Type: TABLE; Schema: user_data; Owner: postgres
--

CREATE TABLE user_data.users (
    id integer NOT NULL,
    login text NOT NULL,
    hash_pass text DEFAULT ''::text NOT NULL,
    fio character varying(64) NOT NULL,
    birthday timestamp without time zone DEFAULT '1970-01-01 00:00:00'::timestamp without time zone NOT NULL,
    height bigint NOT NULL,
    gender user_data.gender NOT NULL,
    date_created timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE user_data.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: user_data; Owner: postgres
--

CREATE SEQUENCE user_data.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_data.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: user_data; Owner: postgres
--

ALTER SEQUENCE user_data.users_id_seq OWNED BY user_data.users.id;


--
-- Name: diary id; Type: DEFAULT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.diary ALTER COLUMN id SET DEFAULT nextval('user_data.diary_id_seq'::regclass);


--
-- Name: disease id; Type: DEFAULT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.disease ALTER COLUMN id SET DEFAULT nextval('user_data.disease_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.sessions ALTER COLUMN id SET DEFAULT nextval('user_data.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.users ALTER COLUMN id SET DEFAULT nextval('user_data.users_id_seq'::regclass);


--
-- Data for Name: diary; Type: TABLE DATA; Schema: user_data; Owner: postgres
--

COPY user_data.diary (id, user_id, pressure, pulse, body_temperature, weight, sugar, info, type_day, date_created) FROM stdin;
\.


--
-- Data for Name: disease; Type: TABLE DATA; Schema: user_data; Owner: postgres
--

COPY user_data.disease (id, user_id, name, status, date_start, date_end, info) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: user_data; Owner: postgres
--

COPY user_data.sessions (id, user_id, refresh_token) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: user_data; Owner: postgres
--

COPY user_data.users (id, login, hash_pass, fio, birthday, height, gender, date_created) FROM stdin;
\.


--
-- Name: diary_id_seq; Type: SEQUENCE SET; Schema: user_data; Owner: postgres
--

SELECT pg_catalog.setval('user_data.diary_id_seq', 1, false);


--
-- Name: disease_id_seq; Type: SEQUENCE SET; Schema: user_data; Owner: postgres
--

SELECT pg_catalog.setval('user_data.disease_id_seq', 1, false);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: user_data; Owner: postgres
--

SELECT pg_catalog.setval('user_data.sessions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: user_data; Owner: postgres
--

SELECT pg_catalog.setval('user_data.users_id_seq', 1, false);


--
-- Name: diary diary_pkey; Type: CONSTRAINT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.diary
    ADD CONSTRAINT diary_pkey PRIMARY KEY (id);


--
-- Name: disease disease_pkey; Type: CONSTRAINT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.disease
    ADD CONSTRAINT disease_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_login_key; Type: CONSTRAINT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.users
    ADD CONSTRAINT users_login_key UNIQUE (login);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_users_fk; Type: FK CONSTRAINT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.sessions
    ADD CONSTRAINT sessions_user_id_users_fk FOREIGN KEY (user_id) REFERENCES user_data.users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT;


--
-- Name: diary sessions_user_id_users_fk; Type: FK CONSTRAINT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.diary
    ADD CONSTRAINT sessions_user_id_users_fk FOREIGN KEY (user_id) REFERENCES user_data.users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT;


--
-- Name: disease sessions_user_id_users_fk; Type: FK CONSTRAINT; Schema: user_data; Owner: postgres
--

ALTER TABLE ONLY user_data.disease
    ADD CONSTRAINT sessions_user_id_users_fk FOREIGN KEY (user_id) REFERENCES user_data.users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT;


--
-- PostgreSQL database dump complete
--

