namespace BackendAPI.Repositorys;

using BackendAPI.Entitys;
using System.Collections.Generic;

public class InvestMainRepository : IInvestMainRepository
{
    private IDBHelper _dbHelper;

    public InvestMainRepository(IDBHelper dbHelper)
    {
        this._dbHelper = dbHelper;
    }

    /// <summary>
    /// 获取投资主档资料  
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public IList<InvestMainEntity> Query(string userId)
    {
        IDbConnection dbConn = _dbHelper.GetIMSConnection();
        string sql = "select * from invest_main im ";
        if (userId != "" && userId != null)
        {
            sql += " where im.contact_ao  =:userId ";
        }
        var bASExampleEntity = dbConn.Query<InvestMainEntity>(sql, new { userId }).ToList();
        return bASExampleEntity;
    }
}
