CREATE TABLE items (
    id integer NOT NULL,
    title text NOT NULL,
    completed boolean,
    url text,
    "order" smallint
);

CREATE SEQUENCE items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE items_id_seq OWNED BY items.id;

ALTER TABLE ONLY items ALTER COLUMN id SET DEFAULT nextval('items_id_seq'::regclass);

ALTER TABLE ONLY items ADD CONSTRAINT items_pkey PRIMARY KEY (id);