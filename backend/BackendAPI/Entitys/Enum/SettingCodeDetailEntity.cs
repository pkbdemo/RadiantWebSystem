namespace BackendAPI.Entitys.Enum;

public class SettingCodeDetailEntity
{
    public string? Kind_id { get; set; }
    public string? Code_id { get; set; }
    public string? Code_Name { get; set; }
    public string? Code_Description { get; set; }
    public string? Code_Extend_A { get; set; }
    public string? Code_Extend_B { get; set; }
    public string? Code_Extend_C { get; set; }
    public int? Code_Sort { get; set; }
    public bool? Enabled { get; set; }
    public string? Create_User { get; set; }
    public DateTime? Create_Date { get; set; }
    public string? Update_User { get; set; }
    public DateTime? Update_Date { get; set; }
}
public class ReqSettingCodeDetail {
    public string? Kind_id { get; set; }
    public string? Code_Extend_A { get; set; }
    public string? Code_Extend_B { get; set; }
    public string? Code_Extend_C { get; set; }
}
