export default (sequelize, DataTypes) => {
  return sequelize.define(
    'Fair',
    {
      long: DataTypes.STRING,
      lat: DataTypes.STRING,
      setcens: DataTypes.STRING,
      areap: DataTypes.STRING,
      coddist: DataTypes.STRING,
      distrito: DataTypes.STRING,
      codsubpref: DataTypes.STRING,
      subprefe: DataTypes.STRING,
      regiao5: DataTypes.STRING,
      regiao8: DataTypes.STRING,
      nomeFeira: {
        field: 'nome_feira',
        type: DataTypes.STRING,
      },
      registro: DataTypes.STRING,
      logradouro: DataTypes.STRING,
      numero: DataTypes.STRING,
      bairro: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      tableName: 'fairs',
      underscored: true,
      schema: process.env.DATABASE_SCHEMA || 'public',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
};
