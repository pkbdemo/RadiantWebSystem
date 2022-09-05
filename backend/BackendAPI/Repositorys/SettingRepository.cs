namespace BackendAPI.Repositorys;

public class SettingRepository : ISettingRepository
{
    private IDBHelper _dbHelper;

    public SettingRepository(IDBHelper dbHelper)
    {
        this._dbHelper = dbHelper;
    }

    public BasicSettingEntity QueryAll()
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = "select * from basic_Setting";
        var bASExampleEntity = dbConn.QueryFirstOrDefault<BasicSettingEntity>(sql);
        return bASExampleEntity;
    }
}