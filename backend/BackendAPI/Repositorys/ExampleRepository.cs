namespace BackendAPI.Repositorys;

public class ExampleRepository : IExampleRepository
{
    private IDBHelper _dbHelper;

    public ExampleRepository(IDBHelper dbHelper)
    {
        this._dbHelper = dbHelper;
    }

    public ExampleEntity QueryById(int userId)
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = "SELECT * FROM example WHERE user_id=:userId";
        var bASExampleEntity = dbConn.QuerySingleOrDefault<ExampleEntity>(sql, new { userId });
        return bASExampleEntity;
    }

    public int AddExample(ExampleEntity exampleEntity)
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = "INSERT INTO example(name, age, createby, create_date, modifyby, modify_date) "
            + "VALUES (:name, :age, :createby, current_timestamp, null, null)";
        return dbConn.Execute(sql, new { exampleEntity.Name, exampleEntity.Age, exampleEntity.Createby });
    }

    public int UpdateExample(ExampleEntity exampleEntity)
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = "UPDATE example SET name=:name, age=:age, modifyby=:modifyby, modify_date=current_timestamp WHERE user_id=:USER_ID";
        return dbConn.Execute(sql, new { exampleEntity.Name, exampleEntity.Age, exampleEntity.Modifyby, exampleEntity.User_ID });
    }

    public int DeleteExample(int userId)
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = "DELETE from example WHERE user_id=:userId";
        return dbConn.Execute(sql, new { userId });
    }

    public IList<decimal> QueryAll()
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = "select cool_input from water_temp";
        var bASExampleEntity = dbConn.Query<decimal>(sql).ToList();
        return bASExampleEntity;
    }

    public PageModel<ExampleEntity> GetPageList(string? sortProperty, IMSConstants.SortDirection? sortDirection, int page, int pageSize, string? name, int? age)
    {
        string where = string.Empty;
        var queryParams = new DynamicParameters();

        _dbHelper.AssembleWhere4GetPageList(ref where, queryParams, "name", DbType.String, name, IDBHelper.ConditionOperator.Like);
        _dbHelper.AssembleWhere4GetPageList(ref where, queryParams, "age", DbType.Int32, age, IDBHelper.ConditionOperator.Equal);

        return _dbHelper.GetPageList<ExampleEntity>("example", where, page, pageSize, sortProperty, sortDirection, queryParams);
    }
}