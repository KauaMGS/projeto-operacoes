package br.com.kgsm.model.log;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Entity
@Table(name = "log")
@Data
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "logId")
    private Long id;

    @Column(name = "operationId")
    private Long operation;

    @Column(name = "operationName")
    private String operationName;

    @Column(name = "actionType")
    @Enumerated(EnumType.STRING)
    private ActionType type;

    @ElementCollection
    @CollectionTable(name = "modifiedFields", joinColumns = @JoinColumn(name = "logId"))
    private List<ModifiedField> modifiedFields;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @PrePersist
    public void prePersist(){
        setTimestamp(LocalDateTime.now(ZoneId.of("America/Sao_Paulo")));
    }

    public ModifiedField addModifiedField(String fieldName, String oldValue, String newValue){
        return new ModifiedField(fieldName, oldValue, newValue);
    }

}