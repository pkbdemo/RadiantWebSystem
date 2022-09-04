namespace BackendAPI.Repositorys;

using BackendAPI.Entitys.Enum;
using BackendAPI.Models.Response;
using System.Collections.Generic;

public class TableListRepository : ITableListRepository
{
    private IDBHelper _dbHelper;

    public TableListRepository(IDBHelper dbHelper)
    {
        this._dbHelper = dbHelper;
    }

    public IList<TableListEntity> QueryAll()
    {
            IDbConnection dbConn = _dbHelper.GetIMSConnection();
            string sql = @"
            with decision as( 
            select 
            dd_no, max(decision_date) as max_decision_date 
            from 
            dd_decision 
            group by dd_no) 
            select  
            im.name, emp.emplid user_Id, emp.name_a user_Name,im.contact_ao, to_char(dm.build_date::date, 'MM/DD/YYYY') as build_date_format,  
            dm.status,
            searchcodename('014', dm.status) status_name, --用db fn轉換成code_name 
            STRING_AGG( dt.type, ',' order by dt.type) DDType,
            STRING_AGG (searchcodename('001', dt.type) , ',' order by dt.type), --用db fn轉換成code_name 
            dm.frozen_type,
            searchcodename('015', dm.frozen_type)  Frozen_Type_Name,
            dd.decision_result
            from 
            invest_main im 
            inner join dd_main dm  
            on 
            im.invest_no = dm.invest_no 
            left join dd_type dt  
            on 
            dm.dd_no = dt.dd_no 
            left join decision ddm  
            on 
            dm.dd_no = ddm.dd_no 
            left join dd_decision dd  
            on 
            dm.dd_no = dd.dd_no 
            and dd.dd_no = ddm.dd_no 
            and dd.decision_date = ddm.max_decision_date 
            left join findw_hcm_employee emp on 
            emp.emplid = im.contact_ao 
            group by 
            im.name, 
            emp.emplid,
            im.contact_ao, 
            emp.name_a, 
            dm.build_date, 
            dm.status, 
            dd.decision_result, 
            dm.frozen_type;";
            var bASExampleEntity = dbConn.Query<TableListEntity>(sql).ToList();
            return bASExampleEntity;
    }
}
