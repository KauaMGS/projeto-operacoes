package br.com.kgsm.model.operation;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "operation")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Operation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "operationId")
    private Long id;

    @Column(name = "name")
    @NotBlank
    private String name;

    @Column(name = "description")
    @NotBlank
    private String description;

    @Column(name = "category")
    @NotBlank
    private String category;

    @Column(name = "restrictAccess")
    @NotNull
    private Boolean restrictAccess;

    @Column(name = "permissionsNeeded")
    @NotNull
    private Boolean permissionsNeeded;

    @Column(name = "permissions")
    @NotNull
    private String permissions;

    @Column(name = "request")
    @NotNull
    @Embedded
    private Request request;

    @Column(name = "response")
    @NotNull
    @Embedded
    private Response response;

}