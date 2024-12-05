package br.com.kgsm.service;

import br.com.kgsm.dto.OperationDTO;
import br.com.kgsm.exception.exceptions.*;
import br.com.kgsm.model.operation.Operation;
import br.com.kgsm.repository.OperationRepository;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class OperationService {
    @Inject
    OperationRepository operationRepository;

    @Inject
    LogService logService;

    public void create(OperationDTO operation){
        Operation newOperation = new Operation();

        newOperation.setName(operation.getName());
        newOperation.setDescription(operation.getDescription());
        newOperation.setCategory(operation.getCategory());
        newOperation.setPermissionsNeeded(operation.getPermissionsNeeded());
        newOperation.setPermissions(operation.getPermissions());
        newOperation.setRestrictAccess(operation.getRestrictAccess());
        newOperation.setRequest(operation.getRequest());
        newOperation.setResponse(operation.getResponse());

        verifyConstraintExceptions(newOperation);

        operationRepository.persist(newOperation);
        logService.addCreateTypeLog(newOperation);
    }

    public PanacheQuery<Operation> findAll(){
        return operationRepository.findAll();
    }

    public Operation findById(Long id){
        if(operationRepository.findById(id) == null) throw new InexistentOperationException();

        return operationRepository.findById(id);
    }

    public PanacheQuery<Operation> findWithFilter(String text){
        return operationRepository.filter(text);
    }

    public void update(Long id, OperationDTO operation){
        if(operationRepository.findById(id) == null) throw new InexistentOperationException();
        verifyConstraintExceptions(operation.toOperation());

        Operation oldOperation = operationRepository.findById(id);

        logService.addUpdateTypeLog(oldOperation, operation);

        oldOperation.setName(operation.getName());
        oldOperation.setDescription(operation.getDescription());
        oldOperation.setCategory(operation.getCategory());
        oldOperation.setPermissionsNeeded(operation.getPermissionsNeeded());
        oldOperation.setPermissions(operation.getPermissions());
        oldOperation.setRestrictAccess(operation.getRestrictAccess());
        oldOperation.setRequest(operation.getRequest());
        oldOperation.setResponse(operation.getResponse());

        operationRepository.persist(oldOperation);
    }

    public void delete(Long id){
        if(operationRepository.findById(id) == null) throw new InexistentOperationException();

        logService.addDeleteTypeLog(operationRepository.findById(id));

        operationRepository.deleteById(id);
    }

    private void verifyConstraintExceptions(Operation operation){
        if(operation.getName() == null || operation.getName().isBlank()) throw new BlankNameException();
        if(operation.getDescription() == null || operation.getDescription().isBlank()) throw new BlankDescriptionException();
        if(operation.getCategory() == null || operation.getCategory().isBlank()) throw new BlankCategoryException();
        if(operation.getRestrictAccess() == null) throw new NullRestrictAccessException();
        if(operation.getPermissionsNeeded() == null) throw new NullPermissionsNeededException();
        if(operation.getPermissions() == null) throw new NullPermissionsException();
        if(operation.getRequest() == null) throw new NullRequestException();
        if(operation.getResponse() == null) throw new NullResponseException();
    }

}