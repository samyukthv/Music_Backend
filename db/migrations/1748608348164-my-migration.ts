import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1748608348164 implements MigrationInterface {
    name = 'MyMigration1748608348164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "playlists" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_a4597f4189a75d20507f3f7ef0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "twoFASecret" text, "enable2FA" boolean NOT NULL DEFAULT false, "apiKey" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "REL_3c2c776c0a094c15d6c165494c" UNIQUE ("userId"), CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "releaseDate" date NOT NULL, "duration" TIME NOT NULL, "lyrics" text NOT NULL, "playListId" integer, CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songs_artists" ("songsId" integer NOT NULL, "artistId" integer NOT NULL, CONSTRAINT "PK_ecdf6d49b2a0ad917ee235cb058" PRIMARY KEY ("songsId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_971d95bf6df45f2b07c317b6b3" ON "songs_artists" ("songsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_96b0b944763714051934dfa3ae" ON "songs_artists" ("artistId") `);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "FK_3c2c776c0a094c15d6c165494c0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_54cf41bc33d524b206b93581950" FOREIGN KEY ("playListId") REFERENCES "playlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs_artists" ADD CONSTRAINT "FK_971d95bf6df45f2b07c317b6b34" FOREIGN KEY ("songsId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "songs_artists" ADD CONSTRAINT "FK_96b0b944763714051934dfa3aea" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs_artists" DROP CONSTRAINT "FK_96b0b944763714051934dfa3aea"`);
        await queryRunner.query(`ALTER TABLE "songs_artists" DROP CONSTRAINT "FK_971d95bf6df45f2b07c317b6b34"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_54cf41bc33d524b206b93581950"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "FK_3c2c776c0a094c15d6c165494c0"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96b0b944763714051934dfa3ae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_971d95bf6df45f2b07c317b6b3"`);
        await queryRunner.query(`DROP TABLE "songs_artists"`);
        await queryRunner.query(`DROP TABLE "songs"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "playlists"`);
    }

}
