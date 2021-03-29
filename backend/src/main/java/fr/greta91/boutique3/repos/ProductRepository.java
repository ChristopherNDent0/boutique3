package fr.greta91.boutique3.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.greta91.boutique3.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	public List<Product> findByProductName(String productName);
}
