package br.com.kgsm.resource;

import br.com.kgsm.model.log.Log;
import br.com.kgsm.service.LogService;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

@Path("logs")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Logs", description = "Logs of all actions performed from Operation (CREATED, DELETED AND UPDATED)")
public class LogResource {
    @Inject
    LogService logService;

    @GET
    @Operation(summary = "Retrieve all logs", description = "Fetches all logs from the database")
    @APIResponse(responseCode = "200", description = "List of logs retrieved successfully")
    public Response findAllLogs(){
        PanacheQuery<Log> logs = logService.findAllLogs();

        return Response.ok(logs.list()).build();
    }

    @GET
    @Path("{id}")
    @Operation(summary = "Retrieve logs by id", description = "Fetches all logs from an Operation by the Operation ID")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Logs retrieved successfully"),
            @APIResponse(responseCode = "404", description = "No operation was found for the specified operation ID")
    })
    public Response findLogsByOperationId(@PathParam("id") Long id){
        List<Log> logs = logService.findLogsByOperationId(id);

        return Response.ok(logs).build();
    }

}