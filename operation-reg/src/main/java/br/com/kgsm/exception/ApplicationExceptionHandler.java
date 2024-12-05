package br.com.kgsm.exception;

import br.com.kgsm.exception.exceptions.*;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ApplicationExceptionHandler implements ExceptionMapper<Throwable> {
    @Override
    public Response toResponse(Throwable exception) {
        ErrorBody error = new ErrorBody();

        if (exception instanceof BlankNameException){
            error.setCode(400);
            error.setStatus("BAD_REQUEST");
            error.setError(exception.getMessage());

            return Response.status(error.getCode()).entity(error).build();
        }

        if (exception instanceof BlankDescriptionException){
            error.setCode(400);
            error.setStatus("BAD_REQUEST");
            error.setError(exception.getMessage());

            return Response.status(error.getCode()).entity(error).build();
        }

        if (exception instanceof BlankCategoryException){
            error.setCode(400);
            error.setStatus("BAD_REQUEST");
            error.setError(exception.getMessage());

            return Response.status(error.getCode()).entity(error).build();
        }

        if (exception instanceof NullRestrictAccessException){
            error.setCode(400);
            error.setStatus("BAD_REQUEST");
            error.setError(exception.getMessage());

            return Response.status(error.getCode()).entity(error).build();
        }

        if (exception instanceof NullPermissionsNeededException){
            error.setCode(400);
            error.setStatus("BAD_REQUEST");
            error.setError(exception.getMessage());

            return Response.status(error.getCode()).entity(error).build();
        }

        if (exception instanceof NullPermissionsException){
            error.setCode(400);
            error.setStatus("BAD_REQUEST");
            error.setError(exception.getMessage());

            return Response.status(error.getCode()).entity(error).build();
        }

        if (exception instanceof NullRequestException){
            error.setCode(400);
            error.setStatus("BAD_REQUEST");
            error.setError(exception.getMessage());

            return Response.status(error.getCode()).entity(error).build();
        }

        if (exception instanceof NullResponseException){
            error.setCode(400);
            error.setStatus("BAD_REQUEST");
            error.setError(exception.getMessage());

            return Response.status(error.getCode()).entity(error).build();
        }


        if (exception instanceof InexistentOperationException){
            error.setCode(404);
            error.setStatus("NOT_FOUND");
            error.setError(exception.getMessage());

            return Response.status(error.getCode()).entity(error).build();
        }


        error.setCode(500);
        error.setStatus("INTERNAL_SERVER_ERROR");
        error.setError("Unexpected error: " + exception.getMessage());

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
    }

}