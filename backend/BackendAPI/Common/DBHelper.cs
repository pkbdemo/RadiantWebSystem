namespace BackendAPI.Common;
using System.Data.SQLite;
public interface IDBHelper
{
    enum ConditionOperator
    {
        Equal,
        Like
    }
    IDbConnection GetIMSConnection();
    void CloseConnection(IDbConnection conn);
    PageModel<T> GetPageList<T>(string tableName, string? where, int page, int pageSize, string? sortProperty, IMSConstants.SortDirection? sortDirection, DynamicParameters? queryParams);
    void AssembleWhere4GetPageList(ref string where, DynamicParameters dynParams, string columnName, DbType columnType, object? columnValue, ConditionOperator conditionOperator);
}

public class PostgreSQLHelper : IDBHelper
{
    private static string? IMSConnectionString = null;
    private static string? SqliteConnectionString = null;
    /// <summary>
    /// Get the finacne portal DB connection
    /// </summary>
    /// <returns></returns>
    public IDbConnection GetIMSConnection()
    {
        // if (IMSConnectionString == null)
        // {
        //     AppSettingsHelper appSettingsHelper = new AppSettingsHelper();
        //     string encryptPassword = appSettingsHelper.GetAppSettings("IMSConnectionStringPassword");
        //     string password = EncryptionHelper.AESDecrypt(encryptPassword);

        //     string sIMSConnectionString = appSettingsHelper.GetAppSettings("IMSConnectionString");
        //     IMSConnectionString = string.Format(sIMSConnectionString, password);
        // }
        AppSettingsHelper appSettingsHelper = new AppSettingsHelper();
        string SqliteConnectionString = appSettingsHelper.GetAppSettings("SqliteConnectionString");
        return new SQLiteConnection(SqliteConnectionString);
    }

    /// <summary>
    /// Close the db connection
    /// </summary>
    /// <param name="conn"></param>
    public void CloseConnection(IDbConnection conn)
    {
        if (conn.State == ConnectionState.Open || conn.State == ConnectionState.Broken)
            conn.Close();
    }

    public PageModel<T> GetPageList<T>(string tableName, string? where, int page, int pageSize, string? sortProperty, IMSConstants.SortDirection? sortDirection, DynamicParameters? queryParams)
    {
        PageModel<T> pageModel = new PageModel<T>();

        if (page < 1)
        {
            page = 1;
        }

        if (!string.IsNullOrEmpty(where))
        {
            where = "where " + where;
        }

        string sOrderBy = string.Empty;
        if (sortProperty != null)
        {
            sOrderBy = string.Format("order by {0} {1}", sortProperty, sortDirection);
        }

        string sql = @"select count(1) from {0} {1};
                       select * from {0} {1} {2} limit {3} offset {4};";
        sql = string.Format(sql, tableName, where, sOrderBy, pageSize, (page - 1) * pageSize);

        IDbConnection dbConnection = GetIMSConnection();
        using (var multi = dbConnection.QueryMultiple(sql, queryParams))
        {
            var total = multi.ReadFirst<int>();
            var content = multi.Read<T>().ToList();

            pageModel.Total = total;
            pageModel.Content = content;
        }

        return pageModel;
    }

    public void AssembleWhere4GetPageList(ref string where, DynamicParameters queryParams, string columnName, DbType columnType, object? columnValue, IDBHelper.ConditionOperator conditionOperator)
    {
        if (columnValue == null)
        {
            return;
        }

        if (columnValue.GetType() == typeof(string))
        {
            if (columnValue?.ToString()?.Trim() == string.Empty)
            {
                return;
            }

            columnValue = columnValue?.ToString()?.Trim();
        }

        if (!string.IsNullOrEmpty(where))
        {
            where += " and ";
        }

        string condition = string.Empty;
        if (conditionOperator == IDBHelper.ConditionOperator.Like)
        {
            condition = "upper({0}) like upper(:{0})";
            columnValue = string.Format("%{0}%", columnValue);
        }
        else
        {
            condition = "{0}=:{0}";
        }

        where += string.Format(condition, columnName);
        queryParams.Add(":" + columnName, columnValue, columnType);
    }
}