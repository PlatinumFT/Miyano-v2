PGDMP                         w            root    9.6.8    9.6.8     W           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            X           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            Y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            Z           1262    16385    root    DATABASE     n   CREATE DATABASE root WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';
    DROP DATABASE root;
             root    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            [           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12393    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            \           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    18526    guilds    TABLE     O  CREATE TABLE public.guilds (
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
    DROP TABLE public.guilds;
       public         root    false    3            �            1259    18795    ignored    TABLE     j   CREATE TABLE public.ignored (
    guild_id character varying(30),
    channel_id character varying(30)
);
    DROP TABLE public.ignored;
       public         root    false    3            �            1259    18520    settings    TABLE     p   CREATE TABLE public.settings (
    token character varying,
    prefix text,
    colour character varying(6)
);
    DROP TABLE public.settings;
       public         root    false    3            �            1259    19093 
   user_roles    TABLE     �   CREATE TABLE public.user_roles (
    guild_id character varying(30),
    user_id character varying(30),
    role_id character varying(30)
);
    DROP TABLE public.user_roles;
       public         root    false    3           