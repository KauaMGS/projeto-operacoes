package br.com.kgsm.repository;

import br.com.kgsm.model.operation.Operation;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class OperationRepository implements PanacheRepository<Operation> {
    public PanacheQuery<Operation> filter(String text) {
        if (text.matches("\\d+")) {
            Long id = Long.parseLong(text);
            return find("id = ?1", id);
        }

        return find("name LIKE ?1 OR description LIKE ?1 OR category LIKE ?1", text + "%");
    }

}