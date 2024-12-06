const fs = require('fs');
const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    console.log('Conectado ao banco de dados...');

    const tablesRes = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    `);

    const tables = tablesRes.rows.map((row) => row.table_name);

    let dump = '';

    for (const table of tables) {
      console.log(`Exportando dados da tabela: ${table}`);

      const rowsRes = await client.query(`SELECT * FROM "${table}";`);
      const rows = rowsRes.rows;

      if (rows.length > 0) {
        const keys = Object.keys(rows[0]);

        dump += `-- Data for ${table}\n`;
        rows.forEach((row) => {
          const values = keys.map((key) => {
            const value = row[key];
            return value === null ? 'NULL' : typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value;
          });

          dump += `INSERT INTO "${table}" (${keys.join(', ')}) VALUES (${values.join(', ')});\n`;
        });
        dump += '\n';
      }
    }

    const outputPath = path.resolve(__dirname, '../database-dump.sql');
    fs.writeFileSync(outputPath, dump);
    console.log(`Dump gerado com sucesso em "${outputPath}".`);
  } catch (err) {
    console.error('Erro ao gerar o dump:', err);
  } finally {
    await client.end();
  }
})();
