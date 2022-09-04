namespace BackendAPI.Entitys.Enum;

public class SettingHistoryRateEntity
{
    public string? Currency_From { get; set; }
    public string? Currency_To { get; set; }
    public string? Date_From { get; set; }
    public string? Date_To { get; set; }
    public decimal? Exchange_Rate { get; set; }
    public string? Create_User { get; set; }
    public DateTime? Create_Date { get; set; }
    public string? Update_User { get; set; }
    public DateTime? Update_Date { get; set; }
}
