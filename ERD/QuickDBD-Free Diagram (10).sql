-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Bp4fLE
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "park" (
    "park_id" VARCHAR   NOT NULL,
    "park_name" VARCHAR   NOT NULL,
    "park_url" VARCHAR   NOT NULL,
    "park_code" VARCHAR   NOT NULL,
    "description" VARCHAR   NOT NULL,
    "latitude" DEC   NOT NULL,
    "longitude" DEC   NOT NULL,
    "states" VARCHAR   NOT NULL,
    "directions_info" VARCHAR   NOT NULL,
    "directions_url" VARCHAR   NOT NULL,
    "weather_info" VARCHAR   NOT NULL,
    "designation" VARCHAR   NOT NULL,
    CONSTRAINT "pk_park" PRIMARY KEY (
        "park_id"
     )
);

CREATE TABLE "activity" (
    "activity_id" VARCHAR   NOT NULL,
    "activity_name" VARCHAR   NOT NULL,
    CONSTRAINT "pk_activity" PRIMARY KEY (
        "activity_id"
     )
);

CREATE TABLE "fees" (
    "fee_id" int   NOT NULL,
    "fee" BOOLEAN   NOT NULL,
    CONSTRAINT "pk_fees" PRIMARY KEY (
        "fee_id"
     )
);

CREATE TABLE "webcam_url" (
    "webcam_id" int   NOT NULL,
    "park_id" VARCHAR   NOT NULL,
    "park_webcam_url" VARCHAR   NOT NULL,
    "webcam_title" VARCHAR   NOT NULL,
    "webcam_description" VARCHAR   NOT NULL,
    CONSTRAINT "pk_webcam_url" PRIMARY KEY (
        "webcam_id"
     )
);

CREATE TABLE "images" (
    "image_id" int   NOT NULL,
    "park_id" VARCHAR   NOT NULL,
    "image_credit" VARCHAR   NOT NULL,
    "image_url" VARCHAR   NOT NULL,
    "image_caption" VARCHAR   NOT NULL,
    CONSTRAINT "pk_images" PRIMARY KEY (
        "image_id"
     )
);

CREATE TABLE "fire" (
    "fire_id" int   NOT NULL,
    "park_id" VARCHAR   NOT NULL,
    "fire_name" VARCHAR   NOT NULL,
    "park_agency" VARCHAR   NOT NULL,
    "park_name" VARCHAR   NOT NULL,
    "fire_year" int   NOT NULL,
    "cause_description" VARCHAR   NOT NULL,
    "fire_size" DEC   NOT NULL,
    "fire_size_class" VARCHAR   NOT NULL,
    "latitude" DEC   NOT NULL,
    "longitude" DEC   NOT NULL,
    "state" VARCHAR   NOT NULL,
    CONSTRAINT "pk_fire" PRIMARY KEY (
        "fire_id"
     )
);

CREATE TABLE "sci_name" (
    "scientific_name_id" int   NOT NULL,
    "scientific_name" VARCHAR   NOT NULL,
    CONSTRAINT "pk_sci_name" PRIMARY KEY (
        "scientific_name_id"
     )
);

CREATE TABLE "park_species" (
    "scientific_name_id" int   NOT NULL,
    "park_id" VARCHAR   NOT NULL,
    "category_name" VARCHAR   NOT NULL,
    "family" VARCHAR   NOT NULL,
    "order" VARCHAR   NOT NULL,
    "common_names" VARCHAR   NOT NULL,
    CONSTRAINT "pk_park_species" PRIMARY KEY (
        "scientific_name_id","park_id"
     )
);

CREATE TABLE "park_activities" (
    "park_id" VARCHAR   NOT NULL,
    "activity_id" VARCHAR   NOT NULL,
    CONSTRAINT "pk_park_activities" PRIMARY KEY (
        "park_id","activity_id"
     )
);

CREATE TABLE "park_fee" (
    "park_id" VARCHAR   NOT NULL,
    "fee_id" int   NOT NULL,
    CONSTRAINT "pk_park_fee" PRIMARY KEY (
        "park_id","fee_id"
     )
);

ALTER TABLE "webcam_url" ADD CONSTRAINT "fk_webcam_url_park_id" FOREIGN KEY("park_id")
REFERENCES "park" ("park_id");

ALTER TABLE "images" ADD CONSTRAINT "fk_images_park_id" FOREIGN KEY("park_id")
REFERENCES "park" ("park_id");

ALTER TABLE "fire" ADD CONSTRAINT "fk_fire_park_id" FOREIGN KEY("park_id")
REFERENCES "park" ("park_id");

ALTER TABLE "park_species" ADD CONSTRAINT "fk_park_species_scientific_name_id" FOREIGN KEY("scientific_name_id")
REFERENCES "sci_name" ("scientific_name_id");

ALTER TABLE "park_species" ADD CONSTRAINT "fk_park_species_park_id" FOREIGN KEY("park_id")
REFERENCES "park" ("park_id");

ALTER TABLE "park_activities" ADD CONSTRAINT "fk_park_activities_park_id" FOREIGN KEY("park_id")
REFERENCES "park" ("park_id");

ALTER TABLE "park_activities" ADD CONSTRAINT "fk_park_activities_activity_id" FOREIGN KEY("activity_id")
REFERENCES "activity" ("activity_id");

ALTER TABLE "park_fee" ADD CONSTRAINT "fk_park_fee_park_id" FOREIGN KEY("park_id")
REFERENCES "park" ("park_id");

ALTER TABLE "park_fee" ADD CONSTRAINT "fk_park_fee_fee_id" FOREIGN KEY("fee_id")
REFERENCES "fees" ("fee_id");

