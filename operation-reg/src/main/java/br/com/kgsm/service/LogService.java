package br.com.kgsm.service;

import br.com.kgsm.dto.OperationDTO;
import br.com.kgsm.exception.exceptions.InexistentOperationException;
import br.com.kgsm.model.log.ActionType;
import br.com.kgsm.model.log.Log;
import br.com.kgsm.model.log.ModifiedField;
import br.com.kgsm.model.operation.Operation;
import br.com.kgsm.repository.LogRepository;
import br.com.kgsm.repository.OperationRepository;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class LogService {
    @Inject
    LogRepository logRepository;

    @Inject
    OperationRepository operationRepository;

    public void addCreateTypeLog(Operation operation){
        Log log = new Log();

        log.setTimestamp(log.getTimestamp());
        log.setType(ActionType.CREATE);
        log.setOperation(operation.getId());
        log.setOperationName(operation.getName());

        logRepository.persist(log);
    }

    public List<Log> findLogsByOperationId(Long id){
        if(logRepository.findLogsByOperationId(id) == null || logRepository.findLogsByOperationId(id).isEmpty()) throw new InexistentOperationException();

        return logRepository.findLogsByOperationId(id);
    }

    public PanacheQuery<Log> findAllLogs(){
        return logRepository.findAll();
    }

    public void addUpdateTypeLog(Operation oldOperation, OperationDTO newOperation){
        Log log = new Log();
        List<ModifiedField> modifiedFields = new ArrayList<>();

        checkAndAddModifiedField(modifiedFields, "name", oldOperation.getName(), newOperation.getName());
        checkAndAddModifiedField(modifiedFields, "description", oldOperation.getDescription(), newOperation.getDescription());
        checkAndAddModifiedField(modifiedFields, "category", oldOperation.getCategory(), newOperation.getCategory());
        checkAndAddModifiedField(modifiedFields, "restrictAccess", oldOperation.getRestrictAccess().toString(), newOperation.getRestrictAccess().toString());
        checkAndAddModifiedField(modifiedFields, "permissionsNeeded", oldOperation.getPermissionsNeeded().toString(), newOperation.getPermissionsNeeded().toString());
        checkAndAddModifiedField(modifiedFields, "permissions", oldOperation.getPermissions(), newOperation.getPermissions());
        checkAndAddModifiedField(modifiedFields, "request", oldOperation.getRequest().toString(), newOperation.getRequest().toString());
        checkAndAddModifiedField(modifiedFields, "response", oldOperation.getResponse().toString(), newOperation.getResponse().toString());

        log.setTimestamp(log.getTimestamp());
        log.setType(ActionType.UPDATE);
        log.setOperation(oldOperation.getId());
        log.setOperationName(oldOperation.getName());
        log.setModifiedFields(modifiedFields);

        logRepository.persist(log);
    }

    public void addDeleteTypeLog(Operation operation){
        Log log = new Log();

        log.setTimestamp(log.getTimestamp());
        log.setType(ActionType.DELETE);
        log.setOperation(operation.getId());
        log.setOperationName(operation.getName());

        logRepository.persist(log);
    }

    private void checkAndAddModifiedField(List<ModifiedField> modifiedFields, String fieldName, String oldValue, String newValue) {
        if (!oldValue.equals(newValue)) {
            modifiedFields.add(new ModifiedField(fieldName, oldValue, newValue));
        }
    }

}