package br.com.kgsm.model.operation;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Field {
    private String fieldName;
    private String fieldType;

}