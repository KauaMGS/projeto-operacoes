package br.com.kgsm.resource;

import br.com.kgsm.dto.OperationDTO;
import br.com.kgsm.model.operation.Operation;
import br.com.kgsm.model.operation.Request;
import br.com.kgsm.model.operation.Response;
import br.com.kgsm.repository.OperationRepository;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;

import java.net.URL;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class OperationResourceTest {
    @TestHTTPResource("/operations")
    URL apiURL;

    @Inject
    OperationRepository operationRepository;

    Long operationId;

    @BeforeEach
    @Transactional
    public void setup(){
        Operation operation = new Operation();

        operation.setName("Test");
        operation.setCategory("Test");
        operation.setDescription("Test");
        operation.setPermissions("Test");
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(false);
        operation.setRequest(new Request());
        operation.setResponse(new Response());

        operationRepository.persist(operation);
        operationRepository.flush();

        operationId = operation.getId();
    }

    @Test
    @DisplayName("Should create an operation")
    @Order(1)
    public void createOperationTest(){
        OperationDTO operation = new OperationDTO();

        operation.setName("Test");
        operation.setCategory("Test");
        operation.setDescription("Test");
        operation.setPermissions("Test");
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(false);
        operation.setRequest(new Request());
        operation.setResponse(new Response());

        var response = given()
                .contentType(ContentType.JSON)
                .body(operation)
        .when()
                .post(apiURL)
        .then()
                .extract().response();

        assertEquals(201, response.statusCode());
    }

    @Test
    @DisplayName("Should list all operations")
    @Order(2)
    public void findAllTest(){
        given()
                .contentType(ContentType.JSON)
        .when()
                .get(apiURL)
        .then()
                .statusCode(200)
                .body("size()", Matchers.greaterThan(0));
    }

    @Test
    @DisplayName("Should list an operation by its id")
    @Order(3)
    public void findByIdTest(){
        given()
                .contentType(ContentType.JSON)
        .when()
                .get(apiURL + "/" + operationId)
        .then()
                .statusCode(200)
                .body("id", Matchers.is(operationId.intValue()));
    }

    @Test
    @DisplayName("Should update an operation")
    @Order(4)
    public void updateOperationTest(){
        OperationDTO newOperation = new OperationDTO();

        newOperation.setName("Test");
        newOperation.setCategory("Test");
        newOperation.setDescription("Test");
        newOperation.setPermissions("Test");
        newOperation.setRestrictAccess(false);
        newOperation.setPermissionsNeeded(false);
        newOperation.setRequest(new Request());
        newOperation.setResponse(new Response());

        var response = given()
                .contentType(ContentType.JSON)
                .body(newOperation)
        .when()
                .put(apiURL + "/" + operationId)
        .then()
                .extract().response();

        assertEquals(200, response.statusCode());
    }

    @Test
    @DisplayName("Should delete an operation by its id")
    @Order(5)
    public void deleteOperationTest(){
        var response = given()
                .contentType(ContentType.JSON)
        .when()
                .delete(apiURL + "/" + operationId)
        .then()
                .extract().response();

        assertEquals(204, response.statusCode());
    }

    @Test
    @DisplayName("Should return a 400 while trying to create an operation without name")
    @Order(6)
    public void createOperationWithNullNameErrorTest(){
        OperationDTO operation = new OperationDTO();

        operation.setCategory("Test");
        operation.setDescription("Test");
        operation.setPermissions("Test");
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(false);
        operation.setRequest(new Request());
        operation.setResponse(new Response());

        var response = given()
                .contentType(ContentType.JSON)
                .body(operation)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(400, response.statusCode());
    }

    @Test
    @DisplayName("Should return a 400 while trying to create a null operation")
    @Order(7)
    public void createOperationNullErrorTest(){
        OperationDTO operation = new OperationDTO();

        var response = given()
                .contentType(ContentType.JSON)
                .body(operation)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(400, response.statusCode());
    }

    @Test
    @DisplayName("Should return a 400 while trying to create an operation with blank name")
    @Order(8)
    public void createOperationWithBlankNameErrorTest() {
        OperationDTO operation = new OperationDTO();

        operation.setName("");
        operation.setCategory("Test");
        operation.setDescription("Test");
        operation.setPermissions("Test");
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(false);
        operation.setRequest(new Request());
        operation.setResponse(new Response());

        var response = given()
                .contentType(ContentType.JSON)
                .body(operation)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(400, response.statusCode());
    }

    @Test
    @DisplayName("Should return a 400 while trying to create an operation with blank category")
    @Order(9)
    public void createOperationWithBlankCategoryErrorTest() {
        OperationDTO operation = new OperationDTO();

        operation.setName("Test");
        operation.setCategory("");
        operation.setDescription("Test");
        operation.setPermissions("Test");
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(false);
        operation.setRequest(new Request());
        operation.setResponse(new Response());

        var response = given()
                .contentType(ContentType.JSON)
                .body(operation)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(400, response.statusCode());
    }

    @Test
    @DisplayName("Should return a 400 while trying to create an operation with blank description")
    @Order(10)
    public void createOperationWithBlankDescriptionErrorTest() {
        OperationDTO operation = new OperationDTO();

        operation.setName("Test");
        operation.setCategory("Test");
        operation.setDescription("");
        operation.setPermissions("Test");
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(false);
        operation.setRequest(new Request());
        operation.setResponse(new Response());

        var response = given()
                .contentType(ContentType.JSON)
                .body(operation)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(400, response.statusCode());
    }

    @Test
    @DisplayName("Should return a 400 while trying to create an operation with null restrictAccess")
    @Order(11)
    public void createOperationWithNullRestrictAccessErrorTest() {
        OperationDTO operation = new OperationDTO();

        operation.setName("Test");
        operation.setCategory("Test");
        operation.setDescription("Test");
        operation.setPermissions("Test");
        operation.setRestrictAccess(null);
        operation.setPermissionsNeeded(false);
        operation.setRequest(new Request());
        operation.setResponse(new Response());

        var response = given()
                .contentType(ContentType.JSON)
                .body(operation)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(400, response.statusCode());
    }

    @Test
    @DisplayName("Should return a 400 while trying to create an operation with null permissionsNeeded")
    @Order(12)
    public void createOperationWithNullPermissionsNeededErrorTest() {
        OperationDTO operation = new OperationDTO();

        operation.setName("Test");
        operation.setCategory("Test");
        operation.setDescription("Test");
        operation.setPermissions("Test");
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(null);
        operation.setRequest(new Request());
        operation.setResponse(new Response());

        var response = given()
                .contentType(ContentType.JSON)
                .body(operation)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(400, response.statusCode());
    }

    @Test
    @DisplayName("Should return a 400 while trying to create an operation with null permissions")
    @Order(13)
    public void createOperationWithNullPermissionsErrorTest() {
        OperationDTO operation = new OperationDTO();

        operation.setName("Test");
        operation.setCategory("Test");
        operation.setDescription("Test");
        operation.setPermissions(null);
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(false);
        operation.setRequest(new Request());
        operation.setResponse(new Response());

        var response = given()
                .contentType(ContentType.JSON)
                .body(operation)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(400, response.statusCode());
    }

    @Test
    @DisplayName("Should return a 400 while trying to create an operation with null request")
    @Order(14)
    public void createOperationWithNullRequestErrorTest() {
        OperationDTO operation = new OperationDTO();

        operation.setName("Test");
        operation.setCategory("Test");
        operation.setDescription("Test");
        operation.setPermissions("Test");
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(false);
        operation.setRequest(null);
        operation.setResponse(new Response());

        var response = given()
                .contentType(ContentType.JSON)
                .body(operation)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(400, response.statusCode());
    }

    @Test
    @DisplayName("Should return a 400 while trying to create an operation with null response")
    @Order(15)
    public void createOperationWithNullResponseErrorTest() {
        OperationDTO operation = new OperationDTO();

        operation.setName("Test");
        operation.setCategory("Test");
        operation.setDescription("Test");
        operation.setPermissions("Test");
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(false);
        operation.setRequest(new Request());
        operation.setResponse(null);

        var response = given()
                .contentType(ContentType.JSON)
                .body(operation)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(400, response.statusCode());
    }

    @Test
    @DisplayName("Should return a 404 when trying to get a non-existent operation")
    @Order(16)
    public void findByInexistentIdTest(){
        Long nonExistentId = 999999L;

        given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/" + nonExistentId)
                .then()
                .statusCode(404)
                .body("error", Matchers.is("This operation do not exist"));
    }

    @Test
    @DisplayName("Should return a 404 when trying to update a non-existent operation")
    @Order(17)
    public void updateInexistentOperationTest(){
        Long nonExistentId = 999999L;

        OperationDTO operation = new OperationDTO();
        operation.setName("Updated Name");
        operation.setCategory("Updated Category");
        operation.setDescription("Updated Description");
        operation.setPermissions("Updated Permissions");
        operation.setRestrictAccess(false);
        operation.setPermissionsNeeded(false);
        operation.setRequest(new Request());
        operation.setResponse(new Response());

        given()
                .contentType(ContentType.JSON)
                .body(operation)
                .when()
                .put(apiURL + "/" + nonExistentId)
                .then()
                .statusCode(404)
                .body("error", Matchers.is("This operation do not exist"));
    }

    @Test
    @DisplayName("Should return a 404 when trying to delete a non-existent operation")
    @Order(18)
    public void deleteInexistentOperationTest(){
        Long nonExistentId = 999999L;

        given()
                .contentType(ContentType.JSON)
                .when()
                .delete(apiURL + "/" + nonExistentId)
                .then()
                .statusCode(404)
                .body("error", Matchers.is("This operation do not exist"));
    }

    @Test
    @DisplayName("Should return empty list when no operations match the filter")
    @Order(19)
    public void filterOperationNoMatchesTest() {
        String nonMatchingText = "Nonexistent";

        var response = given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/search?text=" + nonMatchingText)
                .then()
                .extract().response();

        assertEquals(200, response.statusCode());
        assertEquals(0, response.jsonPath().getList("").size());
    }

    @Test
    @DisplayName("Should return a list of the operations based on the text filter")
    @Order(20)
    public void filterOperationTest() {
        String filterText = "Tes";

        var response = given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/search?text=" + filterText)
                .then()
                .extract().response();

        assertEquals(200, response.statusCode());
        assertTrue(response.jsonPath().getList("").size() > 0);
    }

    @Test
    @DisplayName("Should return a list of the operations based on the ID filter")
    @Order(21)
    public void filterOperationIdTest() {
        Long filterText = 1L;

        var response = given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/search?text=" + filterText)
                .then()
                .extract().response();

        assertEquals(200, response.statusCode());
        assertTrue(response.jsonPath().getList("").size() > 0);
    }

}