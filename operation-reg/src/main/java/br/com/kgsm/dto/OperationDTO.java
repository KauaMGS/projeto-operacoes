package br.com.kgsm.dto;

import br.com.kgsm.model.operation.Operation;
import br.com.kgsm.model.operation.Request;
import br.com.kgsm.model.operation.Response;
import lombok.Data;

@Data
public class OperationDTO {
    private String name;
    private String description;
    private String category;
    private Boolean restrictAccess;
    private Boolean permissionsNeeded;
    private String permissions;
    private Request request;
    private Response response;

    public Operation toOperation(){
        return new Operation(1L ,getName(), getDescription(), getCategory(), getRestrictAccess(), getPermissionsNeeded(), getPermissions(), getRequest(), getResponse());
    }

}