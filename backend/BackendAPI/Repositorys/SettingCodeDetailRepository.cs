namespace BackendAPI.Repositorys;

using BackendAPI.Entitys.Enum;
using System.Collections.Generic;

public class SettingCodeDetailRepository : ISettingCodeDetailRepository
{
    private IDBHelper _dbHelper;

    public SettingCodeDetailRepository(IDBHelper dbHelper)
    {
        this._dbHelper = dbHelper;
    }

    public IList<SettingCodeDetailEntity> Search(ReqSettingCodeDetail req)
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = @"select *
                    from  setting_code_detail scd  
                    where scd.enabled = true ";
        if (req != null)
        {
            if (!string.IsNullOrEmpty(req.Kind_id))
            {
                sql += " and scd.kind_id = :Kind_Id  ";
            }
            if (!string.IsNullOrEmpty(req.Code_Extend_A))
            {
                sql += " and scd.code_extend_a = :Code_Extend_A  ";
            }
            if (!string.IsNullOrEmpty(req.Code_Extend_B))
            {
                sql += " and scd.code_extend_b = :Code_Extend_B  ";
            }
            if (!string.IsNullOrEmpty(req.Code_Extend_C))
            {
                sql += " and scd.code_extend_c = :Code_Extend_C  ";
            }
        }
        sql += "order by scd.code_sort; ";
        var bASExampleEntity = dbConn.Query<SettingCodeDetailEntity>(sql, req).ToList();
        return bASExampleEntity;
    }
}
