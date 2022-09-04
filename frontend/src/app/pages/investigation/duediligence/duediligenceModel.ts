export interface tableListItem {
    name: string;
    contact_Ao: string;
    user_Id: string;
    user_Name: string;
    build_Date_Format: string;
    status: string;
    status_Name: string;
    string_Agg: string;
    dDType: string;
    frozen_Type: string;
    frozen_Type_Name: string;
    decision_Result: string;
}

export interface SearchCodeList {
    Code_id: string;
    Code_Name: string;
    Code_Extend_A: string;
    Code_Extend_B: string;
    Code_Extend_C: string;
}

export interface SelectValue {
    label: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
}
export interface emitObj {
    type: string;
    Notfrozen: number;
}