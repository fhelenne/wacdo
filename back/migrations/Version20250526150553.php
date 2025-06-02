<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250526150553 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE assignment ADD job_title_id INT NOT NULL, ADD restaurant_id INT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE assignment ADD CONSTRAINT FK_30C544BA6DD822C6 FOREIGN KEY (job_title_id) REFERENCES job_title (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE assignment ADD CONSTRAINT FK_30C544BAB1E7706E FOREIGN KEY (restaurant_id) REFERENCES restaurant (id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_30C544BA6DD822C6 ON assignment (job_title_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_30C544BAB1E7706E ON assignment (restaurant_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE assignment DROP FOREIGN KEY FK_30C544BA6DD822C6
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE assignment DROP FOREIGN KEY FK_30C544BAB1E7706E
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_30C544BA6DD822C6 ON assignment
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_30C544BAB1E7706E ON assignment
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE assignment DROP job_title_id, DROP restaurant_id
        SQL);
    }
}
