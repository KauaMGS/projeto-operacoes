import { RequestOp } from "./request";
import { ResponseOp } from "./response";

export interface Operation {
    id: number;
    name: string;
    description: string;
    category: string;
    restrictAccess: boolean;
    permissionsNeeded: boolean;
    permissions: string;
    request: RequestOp;
    response: ResponseOp;
}