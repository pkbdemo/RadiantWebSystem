namespace BackendAPI.Repositorys;

using BackendAPI.Entitys.Enum;

public class SettingCodeMasterRepository : ISettingCodeMasterRepository
{
    private IDBHelper _dbHelper;

    public SettingCodeMasterRepository(IDBHelper dbHelper)
    {
        this._dbHelper = dbHelper;
    }

    public SettingCodeMasterEntity Find(string kind_Id)
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = "SELECT * FROM setting_code_master scm WHERE kind_id=:kind_Id and scm.enabled = true ";
        var bASExampleEntity = dbConn.QuerySingleOrDefault<SettingCodeMasterEntity>(sql, new { kind_Id });
        return bASExampleEntity;
    }

}
