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

    public int AddData(WaterTemp param)
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = @"
            INSERT INTO water_temp (cool_input,cool_output ,cool_down_input, cool_down_output, upd_time, machine_num)
            VALUES  (" + param.Cool_input.ToString() + ", " + param.Cool_output.ToString() + ", " + param.Cool_down_input.ToString() + ", " + param.Cool_down_output.ToString() + ", '" + DateTime.Now.ToString("u") + "', " + param.Machine_num + ")";
        return dbConn.Execute(sql);
    }
}