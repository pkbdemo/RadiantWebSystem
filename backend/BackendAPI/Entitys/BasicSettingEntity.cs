namespace BackendAPI.Entitys;

public class BasicSettingEntity
{
    public string Port_Name { get; set; }
    public int Baud_Rate { get; set; }
    public int Data_Bits { get; set; }
    public string Stop_Bits { get; set; }
    public string Parity { get; set; }
    public decimal Threshhold_Temp_Setting1 { get; set; }
    public decimal Threshhold_Temp_Setting2 { get; set; }
    public decimal Threshhold_Temp_Setting3 { get; set; }
    public string Enable_Third_Sensor { get; set; }
    public int Timer_Second { get; set; }
    public string Usb_Dir_Location { get; set; }
    public string Cold_Input1 { get; set; }
    public string Cold_Output1 { get; set; }
    public string Cool_Down_Input1 { get; set; }
    public string Cool_Down_Output1 { get; set; }
    public string Cold_Input2 { get; set; }
    public string Cold_Output2 { get; set; }
    public string Cool_Down_Input2 { get; set; }
    public string Cool_Down_Output2 { get; set; }
    public string Cold_Input3 { get; set; }
    public string Cold_Output3 { get; set; }
    public string Cool_Down_Input3 { get; set; }
    public string Cool_Down_Output3 { get; set; }
    public string Gate1_Open { get; set; }
    public string Gate1_Close { get; set; }
    public string Gate2_Open { get; set; }
    public string Gate2_Close { get; set; }
    public string Gate3_Open { get; set; }
    public string Gate3_Close { get; set; }
}