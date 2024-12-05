package br.com.kgsm.model.log;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModifiedField {
    private String fieldName;
    private String oldValue;
    private String newValue;

}