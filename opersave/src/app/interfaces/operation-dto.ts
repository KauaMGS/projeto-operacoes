import { Field } from './field'; 
import { RequestOp } from './request';
import { ResponseOp } from './response';

export interface OperationDTO {
    name: string;
    description: string;
    category: string;
    restrictAccess: boolean;
    permissionsNeeded: boolean;
    permissions: string;
    request: RequestOp;
    response: ResponseOp;
}