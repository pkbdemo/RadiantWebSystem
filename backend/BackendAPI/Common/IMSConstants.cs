namespace BackendAPI.Common;

public class IMSConstants
{
    public const string DatetimeFormat = "yyyy-MM-dd HH:mm:ss";
    public const string Header_Authorization = "Authorization";
    public const string ControllerRoute = "api/[controller]/[action]";
    public const string ControllerProducesContentType = "application/json";
    public const int DefaultPageSize = 10;

    public static readonly Dictionary<string, string> EntityTypeNameMappingTable
        = new Dictionary<string, string>
    {
        {"Wistron.Budget.BusinessModel.BudgetDept,Wistron.Budget", "BudgetDept|BDG_BudgetDept|Title" },
        {"Wistron.Budget.BusinessModel.BudgetSite,Wistron.Budget","BudgetSite|BDG_BudgetSite|Title"},
        {"Wistron.Budget.BusinessModel.BudgetYear,Wistron.Budget","BudgetYear|BDG_BudgetYear|Title"},
        {"Wistron.Budget.BusinessModel.Company,Wistron.Budget","Company|BDG_Company|Title"},
        {"Wistron.LongtermInvest.BusinessModel.LTI_Company,Wistron.LongtermInvest","LTI_Company|LTI_Company|BriefName"},
        {"Wistron.LongtermInvest.BusinessModel.LTI_CompanyGroup,Wistron.LongtermInvest","LTI_CompanyGroup|LTI_CompanyGroup|BriefName"},
        {"Wistron.LongtermInvest.BusinessModel.LTI_CompanyType,Wistron.LongtermInvest","LTI_CompanyType|LTI_CompanyType|Type"},
        {"Wistron.LongtermInvest.BusinessModel.LTI_InvestNode,Wistron.LongtermInvest","LTI_InvestNode|LTI_InvestNode|BriefName"},
    };

    public enum SortDirection
    {
        ASC,
        DESC
    }
    public enum ExcelDataType
    {
        /// <summary>
        /// String Type of Data
        /// </summary>
        String = 0,
        /// <summary>
        /// Number Type of Data include integer, float, doube
        /// </summary>
        Numeric = 1,
        /// <summary>
        /// DateTime Type of Data
        /// </summary>
        Datetime = 2,
        /// <summary>
        /// Boolean Type of Data
        /// </summary>
        Boolean = 3
    }
    public enum ValidationResultType
    {
        Pass = 0,
        Fail = 1,
        Warning = 2
    }
    /// <summary>
    /// MessageType Enum
    /// </summary>
    public enum MessageType
    {
        Info = 0,
        Warning = 1,
        Error = 2
    }
}