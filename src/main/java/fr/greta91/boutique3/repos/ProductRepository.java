package fr.greta91.boutique3.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.greta91.boutique3.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
