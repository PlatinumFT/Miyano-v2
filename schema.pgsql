--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.8
-- Dumped by pg_dump version 9.6.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: guilds; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.guilds (
    guild_id character varying(30),
    channel_id character varying(30),
    channelcreate boolean,
    channeldelete boolean,
    channelupdate boolean,
    emojicreate boolean,
    emojidelete boolean,
    emojiupdate boolean,
    guildbanadd boolean,
    guildbanremove boolean,
    guildmemberadd boolean,
    guildmemberremove boolean,
    guildmemberupdate boolean,
    messagedelete boolean,
    messagedeletebulk boolean,
    messageupdate boolean,
    rolecreate boolean,
    roledelete boolean,
    roleupdate boolean,
    voicestateupdate boolean
);


ALTER TABLE public.guilds OWNER TO root;

--
-- Name: ignored; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.ignored (
    guild_id character varying(30),
    channel_id character varying(30)
);


ALTER TABLE public.ignored OWNER TO root;

--
-- Name: settings; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.settings (
    token character varying,
    prefix text,
    colour character varying(6)
);


ALTER TABLE public.settings OWNER TO root;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.user_roles (
    guild_id character varying(30),
    user_id character varying(30),
    role_id character varying(30)
);


ALTER TABLE public.user_roles OWNER TO root;

--
-- PostgreSQL database dump complete
--

