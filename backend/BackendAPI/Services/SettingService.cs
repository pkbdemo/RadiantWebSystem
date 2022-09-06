namespace BackendAPI.Services;

public class SettingService : ISettingService
{
    private readonly ISettingRepository _settingRepository;
    SerialPort SerialPort = new SerialPort();
    Int32 count = 1;//拿來判斷當前號機的第幾個Sensor
    Int32 machine_num = 1;//拿來判斷當前取得的返回值是第幾號機
    WaterTemp temp = new WaterTemp();
    BasicSettingEntity setting;
    public SettingService(ISettingRepository settingRepository)
    {
        this._settingRepository = settingRepository;
    }

    public void QueryAll()
    {
        setting = _settingRepository.QueryAll();
        //串口名稱
        SerialPort.PortName = setting.Port_Name;
        //波特率
        SerialPort.BaudRate = setting.Baud_Rate;
        //數據位
        SerialPort.DataBits = setting.Data_Bits;
        //停止位
        SerialPort.StopBits = Enum.Parse<StopBits>(setting.Stop_Bits);
        //SerialPort.StopBits = StopBits.One;
        //校驗位
        SerialPort.Parity = Enum.Parse<Parity>(setting.Parity);
        //SerialPort.Parity = Parity.None;
        //打開串口
        SerialPort.Open();

        SerialPort.DataReceived += new SerialDataReceivedEventHandler(port_DataReceived);

        //string cmd = "01-03-00-00-00-01-84-0A";//溫度值
        //string cmd = "09-05-00-00-FF-00-8D-72";//ID 1 繼電器開啟
        //string cmd = "09-05-00-00-00-00-cc-82"; //ID 1 繼電器關閉
        //string cmd = "09-02-00-00-00-08-78-84"; //狀態值

        string cmd = "";
        byte[] hexValues;
        byte[] outBuffer;

        cmd = setting.Cold_Input1; //第一組裝置冷水入水設定
        hexValues = ToByte(cmd);
        outBuffer = hexValues;
        SerialPort.Write(outBuffer, 0, outBuffer.Length);
    }
    private void port_DataReceived(object sender, SerialDataReceivedEventArgs e)
    {
        // var setting = _settingRepository.QueryAll();
        // Show all the incoming data in the port's buffer
        SerialPort sp = (SerialPort)sender;
        int length = sp.BytesToRead;
        byte[] buf = new byte[length];
        sp.Read(buf, 0, length);

        //接收七組16進制號碼 ex: 01 03 02 01 43 F8 25
        //01:ID
        //03:讀取
        //02:功能
        //01:溫度值-個位數乘256
        //43:溫度值-十位數乘16, 個位數就是原本數
        //計算出的三個溫度值進行加總 256+64+3=323 =>32.3度C
        //F8:CRC值
        //25:CRC值
        //step1 針對接收到的buff資料，先進行初步處理
        var num1 = Convert.ToInt32(buf[3].ToString()) * 256;
        var num2 = Convert.ToInt32(buf[4].ToString("00").Substring(0, 1)) * 16;
        var num3 = Convert.ToInt32(buf[4].ToString("00").Substring(0, 1));
        decimal resultNum = (num1 + num2 + num3) / 10;

        //判斷當前的ID感測器是幾號
        switch (buf[0].ToString())
        {
            case "1":
                temp.Cool_input = resultNum;
                break;
            case "2":
                temp.Cool_output = resultNum;
                break;
            case "3":
                temp.Cool_down_input = resultNum;
                break;
            case "4":
                temp.Cool_down_output = resultNum;
                break;
        }


        string cmd = "";
        byte[] hexValues;
        byte[] outBuffer;
        if (machine_num == 1)
        {
            if (count == 5)//湊滿號機底下的四組感測溫度值，寫入DB
            {
                count = 1;
                temp.Machine_num = 1;
                _settingRepository.AddData(temp);
                temp = new WaterTemp();

                machine_num++;
                cmd = setting.Cold_Input2; //第二組裝置冷水入水設定
                hexValues = ToByte(cmd);
                outBuffer = hexValues;
                SerialPort.Write(outBuffer, 0, outBuffer.Length);
            }
            else
            {
                count++;
                if (count == 2)
                {
                    cmd = setting.Cold_Output1; //第一組裝置冷水出水設定
                    hexValues = ToByte(cmd);
                    outBuffer = hexValues;
                    SerialPort.Write(outBuffer, 0, outBuffer.Length);
                }
                if (count == 3)
                {
                    cmd = setting.Cool_Down_Input1; //第一組裝置冷卻水入水設定
                    hexValues = ToByte(cmd);
                    outBuffer = hexValues;
                    SerialPort.Write(outBuffer, 0, outBuffer.Length);
                }
                if (count == 4)
                {
                    cmd = setting.Cool_Down_Output1;//第一組裝置冷卻水出水設定
                    hexValues = ToByte(cmd);
                    outBuffer = hexValues;
                    SerialPort.Write(outBuffer, 0, outBuffer.Length);
                }
                if (count == 5)
                {
                    //判斷是否冷卻水超過設定溫度，超過的話，就啟動繼電器
                    CheckOverTemp(machine_num, temp);
                }
            }
        }
        else if (machine_num == 2)
        {

            if (count == 5)//湊滿號機底下的四組感測溫度值，寫入DB
            {
                count = 1;
                temp.Machine_num = 2;
                _settingRepository.AddData(temp);
                //寫入DB後，判斷是否冷卻水超過設定溫度，超過的話，就啟動繼電器
                temp = new WaterTemp();

                if (setting.Enable_Third_Sensor == "true")
                {
                    machine_num++;
                    cmd = setting.Cold_Input3; //第三組裝置冷水入水設定
                    hexValues = ToByte(cmd);
                    outBuffer = hexValues;
                    SerialPort.Write(outBuffer, 0, outBuffer.Length);
                }
                else
                {
                    machine_num = 1;
                    SerialPort.Close();
                    SerialPort.Dispose();
                }

            }
            else
            {
                count++;
                if (count == 2)
                {
                    cmd = setting.Cold_Output2; //第二組裝置冷水出水設定
                    hexValues = ToByte(cmd);
                    outBuffer = hexValues;
                    SerialPort.Write(outBuffer, 0, outBuffer.Length);
                }
                if (count == 3)
                {
                    cmd = setting.Cool_Down_Input2; //第二組裝置冷卻水入水設定
                    hexValues = ToByte(cmd);
                    outBuffer = hexValues;
                    SerialPort.Write(outBuffer, 0, outBuffer.Length);
                }
                if (count == 4)
                {
                    cmd = setting.Cool_Down_Output2; //第二組裝置冷卻水出水設定
                    hexValues = ToByte(cmd);
                    outBuffer = hexValues;
                    SerialPort.Write(outBuffer, 0, outBuffer.Length);
                }
                if (count == 5)
                {
                    //判斷是否冷卻水超過設定溫度，超過的話，就啟動繼電器
                    CheckOverTemp(machine_num, temp);
                }
            }
        }
        else if (machine_num == 3)
        {

            if (count == 5)//湊滿號機底下的四組感測溫度值，寫入DB
            {
                count = 1;
                temp.Machine_num = 3;
                _settingRepository.AddData(temp);
                //寫入DB後，判斷是否冷卻水超過設定溫度，超過的話，就啟動繼電器
                temp = new WaterTemp();
                machine_num = 1;
                SerialPort.Close();
                SerialPort.Dispose();
            }
            else
            {
                count++;
                if (count == 2)
                {
                    cmd = setting.Cold_Output3; //第三組裝置冷水出水設定
                    hexValues = ToByte(cmd);
                    outBuffer = hexValues;
                    SerialPort.Write(outBuffer, 0, outBuffer.Length);
                }
                if (count == 3)
                {
                    cmd = setting.Cool_Down_Input3; //第三組裝置冷卻水入水設定
                    hexValues = ToByte(cmd);
                    outBuffer = hexValues;
                    SerialPort.Write(outBuffer, 0, outBuffer.Length);
                }
                if (count == 4)
                {
                    cmd = setting.Cool_Down_Output3; //第三組裝置冷卻水出水設定
                    hexValues = ToByte(cmd);
                    outBuffer = hexValues;
                    SerialPort.Write(outBuffer, 0, outBuffer.Length);
                }
                if (count == 5)
                {
                    //判斷是否冷卻水超過設定溫度，超過的話，就啟動繼電器
                    CheckOverTemp(machine_num, temp);
                }
            }
        }
    }

    /// <summary>
    /// 寫入DB後，判斷是否冷卻水超過設定溫度，超過的話，就啟動繼電器
    /// </summary>
    /// <param name="machine_num"></param>
    /// <param name="temp"></param>
    /// <returns></returns>
    private void CheckOverTemp(int machine_num, WaterTemp temp)
    {
        decimal threshhold_temp = 0;
        if (machine_num == 1)
            threshhold_temp = setting.Threshhold_Temp_Setting1; //第一組冷卻水入水觸發繼電器溫度值
        if (machine_num == 2)
            threshhold_temp = setting.Threshhold_Temp_Setting2; //第二組冷卻水入水觸發繼電器溫度值
        if (machine_num == 3)
            threshhold_temp = setting.Threshhold_Temp_Setting3; //第三組冷卻水入水觸發繼電器溫度值
        if (temp.Cool_down_input > threshhold_temp)
            StartGate(machine_num);
        else
            CloseGate(machine_num);
    }

    /// <summary>
    /// 啟動繼電器
    /// </summary>
    /// <param name="machine_num"></param>
    private void StartGate(int machine_num)
    {
        byte[] hexValues;
        byte[] outBuffer;
        string cmd = "";
        if (machine_num == 1)
            cmd = setting.Gate1_Open; //第一組裝置繼電器開啟
        if (machine_num == 2)
            cmd = setting.Gate2_Open;  //第二組裝置繼電器開啟
        if (machine_num == 3)
            cmd = setting.Gate3_Open;  //第三組裝置繼電器開啟

        hexValues = ToByte(cmd);
        outBuffer = hexValues;
        SerialPort.Write(outBuffer, 0, outBuffer.Length);
    }
    /// <summary>
    /// 關閉繼電器
    /// </summary>
    /// <param name="machine_num"></param>
    private void CloseGate(int machine_num)
    {
        byte[] hexValues;
        byte[] outBuffer;
        string cmd = "";
        if (machine_num == 1)
            cmd = setting.Gate1_Close; //第一組裝置繼電器關閉
        if (machine_num == 2)
            cmd = setting.Gate2_Close; //第二組裝置繼電器關閉
        if (machine_num == 3)
            cmd = setting.Gate3_Close; //第三組裝置繼電器關閉

        hexValues = ToByte(cmd);
        outBuffer = hexValues;
        SerialPort.Write(outBuffer, 0, outBuffer.Length);
    }


    /// <summary>
    /// 把按-分割的字符串轉成byte[]
    /// </summary>
    /// <param name="s">string原數據</param>
    /// <returns></returns>
    public byte[] ToByte(string s)
    {
        return s.Split('-').AsParallel().Select(x => Convert.ToByte(x, 16)).ToArray();
    }
}