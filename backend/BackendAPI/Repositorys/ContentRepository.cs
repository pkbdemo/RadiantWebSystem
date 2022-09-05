namespace BackendAPI.Repositorys;

public class ContentRepository : IContentRepository
{
    private IDBHelper _dbHelper;

    public ContentRepository(IDBHelper dbHelper)
    {
        this._dbHelper = dbHelper;
    }

    public IList<decimal> QueryAll()
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = "select cool_input from water_temp";
        var bASExampleEntity = dbConn.Query<decimal>(sql).ToList();
        return bASExampleEntity;
    }
}