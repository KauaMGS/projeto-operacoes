import { ActionType } from "./action-type";
import { ModifiedField } from "./modified-field";

export interface Log {
    id: number;
    operation: number;
    operationName: string;
    type: ActionType;
    modifiedFields: ModifiedField[];
    timestamp: string; 
}