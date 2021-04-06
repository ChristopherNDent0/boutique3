package fr.greta91.boutique3.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fr.greta91.boutique3.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	public List<Product> findByProductName(String productName);

	@Query("SELECT COUNT(p.productId) from Product p")
	int getProduitsCount();

	List<Product> findAllByProductNameContainingIgnoreCase(String searchWord, Pageable page);

	@Query("SELECT COUNT(p.productId) from Product p where p.productName LIKE %?1%")
	int getProduitsCountByProductName(String searchWord);
	
	@Query("SELECT COUNT(p.productId) from Product p where p.category.categoryId = ?1")
	int getProduitsCountByCategoryId(int categoryId);
	
	@Query("SELECT COUNT(p.productId) from Product p where p.price <= ?1")
	int getProduitsCountByPrice(double price);
	
	@Query("SELECT p from Product p where p.category.categoryId = ?1")
	List<Product> findAllByCategoryId(int categoryId, Pageable page);
	
	List<Product> findByPriceLessThanEqual(double price,Pageable page);
}
