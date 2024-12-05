package br.com.kgsm.model.operation;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
public class Request {
    @ElementCollection
    @CollectionTable(name = "operationRequestFields", joinColumns = @JoinColumn(name = "operationId"))
    private List<Field> fields;

}