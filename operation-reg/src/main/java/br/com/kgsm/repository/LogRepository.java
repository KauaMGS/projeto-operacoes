package br.com.kgsm.repository;

import br.com.kgsm.model.log.Log;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class LogRepository implements PanacheRepository<Log> {
    public List<Log> findLogsByOperationId(Long id){
        return find("operation", id).list();
    }
}
