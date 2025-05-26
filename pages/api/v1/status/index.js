import database from "infra/database";

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const postgresVersionRaw = await database.query("SELECT version();");
  const postgresVersionString = postgresVersionRaw.rows[0].version;
  const postgresVersion = postgresVersionString.match(/\d+.\d+/)[0];

  const connectionsList = await database.query("SHOW max_connections");
  const connectionObj = connectionsList.rows[0];

  const databaseName = process.env.POSTGRES_DB;
  const usedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });

  res.status(200).json({
    updated_at: updatedAt,
    max_connections: connectionObj.max_connections,
    postgres_version: postgresVersion,
    used_connections: usedConnections.rowCount,
  });
}

export default status;
