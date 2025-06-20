<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250620093049 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL84Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL84Platform'."
        );

        $this->addSql(<<<'SQL'
            CREATE TABLE assignment (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, job_title_id INT NOT NULL, restaurant_id INT NOT NULL, start_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', end_at DATETIME DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)', INDEX IDX_30C544BAA76ED395 (user_id), INDEX IDX_30C544BA6DD822C6 (job_title_id), INDEX IDX_30C544BAB1E7706E (restaurant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = '' 
        SQL);
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL84Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL84Platform'."
        );

        $this->addSql(<<<'SQL'
            CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, first_hired_at DATETIME DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)', first_name VARCHAR(180) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, roles JSON NOT NULL, last_name VARCHAR(180) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, email VARCHAR(180) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, UNIQUE INDEX UNIQ_IDENTIFIER_USERNAME (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = '' 
        SQL);
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL84Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL84Platform'."
        );

        $this->addSql(<<<'SQL'
            CREATE TABLE job_title (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = '' 
        SQL);
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL84Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL84Platform'."
        );

        $this->addSql(<<<'SQL'
            CREATE TABLE restaurant (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, address VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, zip_code VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, city VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = '' 
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL84Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL84Platform'."
        );

        $this->addSql(<<<'SQL'
            DROP TABLE assignment
        SQL);
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL84Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL84Platform'."
        );

        $this->addSql(<<<'SQL'
            DROP TABLE user
        SQL);
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL84Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL84Platform'."
        );

        $this->addSql(<<<'SQL'
            DROP TABLE job_title
        SQL);
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL84Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL84Platform'."
        );

        $this->addSql(<<<'SQL'
            DROP TABLE restaurant
        SQL);
    }
}
