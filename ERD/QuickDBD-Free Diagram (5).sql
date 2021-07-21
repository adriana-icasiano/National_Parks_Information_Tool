-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Bp4fLE
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "park" (
    "park_id" VARCHAR   NOT NULL,
    "full_name" VARCHAR   NOT NULL,
    "park_url" VARCHAR   NOT NULL,
    "webcam_url" VARCHAR   NOT NULL,
    "park_code" VARCHAR   NOT NULL,
    "description" VARCHAR   NOT NULL,
    "latitude" DEC   NOT NULL,
    "longitude" DEC   NOT NULL,
    "states" VARCHAR   NOT NULL,
    "directions_info" VARCHAR   NOT NULL,
    "directions_url" VARCHAR   NOT NULL,
    "weather_info" VARCHAR   NOT NULL,
    CONSTRAINT "pk_park" PRIMARY KEY (
        "park_id"
     )
);

CREATE TABLE "activities" (
    "activities_id" VARCHAR   NOT NULL,
    "activities_name" VARCHAR   NOT NULL,
    CONSTRAINT "pk_activities" PRIMARY KEY (
        "activities_id"
     )
);

CREATE TABLE "fees" (
    "fee_id" int   NOT NULL,
    "fee_type" VARCHAR   NOT NULL,
    "cost" VARCHAR   NOT NULL,
    "fee_description" VARCHAR   NOT NULL,
    CONSTRAINT "pk_fees" PRIMARY KEY (
        "fee_id"
     )
);

CREATE TABLE "images" (
    "image_id" int   NOT NULL,
    "credit" VARCHAR   NOT NULL,
    "image_url" VARCHAR   NOT NULL,
    "image_caption" VARCHAR   NOT NULL,
    CONSTRAINT "pk_images" PRIMARY KEY (
        "image_id"
     )
);

CREATE TABLE "fire" (
    "fire_id" VARCHAR   NOT NULL,
    "fire_name" VARCHAR   NOT NULL,
    "reporting_agency" VARCHAR   NOT NULL,
    "fire_year" VARCHAR   NOT NULL,
    "fire_cause" VARCHAR   NOT NULL,
    "fire_size" DEC   NOT NULL,
    "fire_size_class" VARCHAR   NOT NULL,
    "fire_latitude" DEC   NOT NULL,
    "fire_longitude" DEC   NOT NULL,
    "state" VARCHAR   NOT NULL,
    CONSTRAINT "pk_fire" PRIMARY KEY (
        "fire_id"
     )
);

CREATE TABLE "species" (
    "category_id" VARCHAR   NOT NULL,
    "family" VARCHAR   NOT NULL,
    "order" VARCHAR   NOT NULL,
    "scientific" VARCHAR   NOT NULL,
    "common_names" VARCHAR   NOT NULL,
    CONSTRAINT "pk_species" PRIMARY KEY (
        "category_id"
     )
);

CREATE TABLE "park_activities" (
    "park_id" VARCHAR   NOT NULL,
    "activities_id" VARCHAR   NOT NULL,
    CONSTRAINT "pk_park_activities" PRIMARY KEY (
        "park_id","activities_id"
     )
);

CREATE TABLE "park_fee" (
    "park_id" VARCHAR   NOT NULL,
    "fee_id" int   NOT NULL,
    CONSTRAINT "pk_park_fee" PRIMARY KEY (
        "park_id","fee_id"
     )
);

CREATE TABLE "park_image" (
    "park_id" VARCHAR   NOT NULL,
    "image_id" int   NOT NULL,
    CONSTRAINT "pk_park_image" PRIMARY KEY (
        "park_id","image_id"
     )
);

CREATE TABLE "park_fire" (
    "park_id" VARCHAR   NOT NULL,
    "fire_id" VARCHAR   NOT NULL,
    CONSTRAINT "pk_park_fire" PRIMARY KEY (
        "park_id","fire_id"
     )
);

CREATE TABLE "park_species" (
    "park_id" VARCHAR   NOT NULL,
    "category_id" VARCHAR   NOT NULL,
    CONSTRAINT "pk_park_species" PRIMARY KEY (
        "park_id","category_id"
     )
);

ALTER TABLE "park_activities" ADD CONSTRAINT "fk_park_activities_park_id" FOREIGN KEY("park_id")
REFERENCES "park" ("full_name");

ALTER TABLE "park_activities" ADD CONSTRAINT "fk_park_activities_activities_id" FOREIGN KEY("activities_id")
REFERENCES "activities" ("activities_name");

ALTER TABLE "park_fee" ADD CONSTRAINT "fk_park_fee_park_id" FOREIGN KEY("park_id")
REFERENCES "park" ("full_name");

ALTER TABLE "park_fee" ADD CONSTRAINT "fk_park_fee_fee_id" FOREIGN KEY("fee_id")
REFERENCES "fees" ("fee_id");

ALTER TABLE "park_image" ADD CONSTRAINT "fk_park_image_park_id" FOREIGN KEY("park_id")
REFERENCES "park" ("full_name");

ALTER TABLE "park_image" ADD CONSTRAINT "fk_park_image_image_id" FOREIGN KEY("image_id")
REFERENCES "images" ("image_id");

ALTER TABLE "park_fire" ADD CONSTRAINT "fk_park_fire_park_id" FOREIGN KEY("park_id")
REFERENCES "park" ("full_name");

ALTER TABLE "park_fire" ADD CONSTRAINT "fk_park_fire_fire_id" FOREIGN KEY("fire_id")
REFERENCES "fire" ("fire_name");

ALTER TABLE "park_species" ADD CONSTRAINT "fk_park_species_park_id" FOREIGN KEY("park_id")
REFERENCES "park" ("full_name");

ALTER TABLE "park_species" ADD CONSTRAINT "fk_park_species_category_id" FOREIGN KEY("category_id")
REFERENCES "species" ("category_id");

