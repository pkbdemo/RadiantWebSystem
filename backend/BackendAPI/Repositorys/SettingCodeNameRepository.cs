namespace BackendAPI.Repositorys;

using BackendAPI.Entitys.Enum;
using System.Collections.Generic;

public class SettingCodeNameRepository : ISettingCodeListRepository
{
    private IDBHelper _dbHelper;

    public SettingCodeNameRepository(IDBHelper dbHelper)
    {
        this._dbHelper = dbHelper;
    }

    public IList<SearchCodeListEntity> Query(ReqSettingCodeName req)
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = @"select 
            scd.code_id, --用於儲存的欄位 
            scd.code_name, --用於顯示的欄位 
            scd.code_extend_a, 
            scd.code_extend_b, 
            scd.code_extend_c  
            from 
            setting_code_master scm 
            inner join setting_code_detail scd  
            on 
            scm.kind_id = scd.kind_id 
            where 
            scm.enabled = true 
            and scd.enabled = true ";
        if (req != null)
        {
            if (!string.IsNullOrEmpty(req.Kind_Id))
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
        sql += "order by  scd.code_sort; ";
        var bASExampleEntity = dbConn.Query<SearchCodeListEntity>(sql, req).ToList();
        return bASExampleEntity;
    }
}
