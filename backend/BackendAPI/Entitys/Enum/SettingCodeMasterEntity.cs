namespace BackendAPI.Entitys.Enum;

public class SettingCodeMasterEntity
{
    public string? Kind_id { get; set; }
    public string? Code_id { get; set; }
    public string? Kind_Description { get; set; }
    public bool? Enabled { get; set; }
    public string? Create_User { get; set; }
    public DateTime? Create_Date { get; set; }
    public string? Update_User { get; set; }
    public DateTime? Update_Date { get; set; }
}
