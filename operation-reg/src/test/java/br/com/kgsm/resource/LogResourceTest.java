package br.com.kgsm.resource;

import br.com.kgsm.dto.OperationDTO;
import br.com.kgsm.model.operation.Request;
import br.com.kgsm.model.operation.Response;
import br.com.kgsm.service.OperationService;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.net.URL;

import static io.restassured.RestAssured.given;

@QuarkusTest
class LogResourceTest {
    @TestHTTPResource("/logs")
    URL apiURL;

    @Inject
    OperationService operationService;

    Long operationId;

    @BeforeEach
    @Transactional
    public void setup(){
        OperationDTO operation = new OperationDTO();

        operation.setName("Test");
        operation.setCategory("Test");
        operation.setDescription("Test");
        operation.setPermissions("Test");
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(false);
        operation.setRequest(new Request());
        operation.setResponse(new Response());

        operationService.create(operation);

        operationId = operation.toOperation().getId();
    }

    @Test
    @DisplayName("Should list all logs")
    public void findAllLogsTest(){
        given()
                .contentType(ContentType.JSON)
        .when()
                .get(apiURL)
        .then()
                .statusCode(200)
                .body("size()", Matchers.greaterThan(0));
    }

    @Test
    @DisplayName("Should list all logs of an operation by its id")
    public void findLogsByOperationIdTest(){
        given()
                .contentType(ContentType.JSON)
        .when()
                .get(apiURL + "/" + operationId)
        .then()
                .statusCode(200)
                .body("id[0]", Matchers.is(operationId.intValue()));
    }

}