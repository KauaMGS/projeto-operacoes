package br.com.kgsm.resource;

import br.com.kgsm.dto.OperationDTO;
import br.com.kgsm.model.operation.Operation;
import br.com.kgsm.service.OperationService;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("operations")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Operations", description = "Endpoints for create, update, find, and delete operations")
public class OperationResource {
    @Inject
    OperationService operationService;

    @GET
    @org.eclipse.microprofile.openapi.annotations.
            Operation(summary = "Retrieve all operations", description = "Fetches all operations from the database")
    @APIResponse(responseCode = "200", description = "List of operations retrieved successfully")
    public Response findAll(){
        PanacheQuery<Operation> query = operationService.findAll();

        return Response.ok(query.list()).build();
    }

    @GET
    @Path("{id}")
    @org.eclipse.microprofile.openapi.annotations.
            Operation(summary = "Retrieve operation by id", description = "Find an operation by its ID")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Operation retrieved successfully"),
            @APIResponse(responseCode = "404", description = "No operation found for the specified ID")
    })
    public Response findById(
            @Parameter(description = "ID of the operation to retrieve", required = true)
            @PathParam("id") Long id){

        Operation query = operationService.findById(id);

        return Response.ok(query).build();
    }

    @GET
    @Path("search")
    @org.eclipse.microprofile.openapi.annotations.
            Operation(summary = "Search operations with filters", description = "Search for operations based on id, name, category or description.")
    @APIResponse(responseCode = "200", description = "Filtered operations retrieved successfully")
    public Response findWithFilter(
            @Parameter(description = "Text to filter the operations")
            @QueryParam("text") String text){

        PanacheQuery<Operation> query = operationService.findWithFilter(text);

        return Response.ok(query.list()).build();
    }

    @POST
    @Transactional
    @org.eclipse.microprofile.openapi.annotations.
            Operation(summary = "Create a new operation", description = "Creates a new operation with the provided data")
    @APIResponses({
            @APIResponse(responseCode = "201", description = "Operation created successfully"),
            @APIResponse(responseCode = "400", description = "Invalid input data")
    })
    public Response createOperation(
            @Parameter(description = "Operation data to create", required = true)
            OperationDTO operationDTO){

        operationService.create(operationDTO);

        return Response.status(Response.Status.CREATED).entity(operationDTO).build();
    }

    @PUT
    @Path("{id}")
    @Transactional
    @org.eclipse.microprofile.openapi.annotations.
            Operation(summary = "Update an existing operation", description = "Updates an existing operation by its ID with the provided data.")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Operation updated successfully"),
            @APIResponse(responseCode = "400", description = "Invalid input data"),
            @APIResponse(responseCode = "404", description = "No operation found for the specified ID")
    })
    public Response updateOperation(
            @Parameter(description = "ID of the operation to update", required = true)
            @PathParam("id") Long id,
            @Parameter(description = "Updated operation data", required = true)
            OperationDTO operation){

        operationService.update(id, operation);

        return Response.ok().entity(operation).build();
    }

    @DELETE
    @Path("{id}")
    @Transactional
    @org.eclipse.microprofile.openapi.annotations.
            Operation(summary = "Delete an operation", description = "Deletes the operation with the specified ID.")
    @APIResponses({
            @APIResponse(responseCode = "204", description = "Operation deleted successfully"),
            @APIResponse(responseCode = "404", description = "No operation found for the specified ID")
    })
    public Response deleteOperation(
            @Parameter(description = "ID of the operation to delete", required = true)
            @PathParam("id") Long id){

        operationService.delete(id);

        return Response.noContent().build();
    }

}