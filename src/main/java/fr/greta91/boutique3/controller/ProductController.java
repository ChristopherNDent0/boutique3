package fr.greta91.boutique3.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import fr.greta91.boutique3.model.Product;
import fr.greta91.boutique3.repos.ProductRepository;

@CrossOrigin(maxAge = 3600, origins = "http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	ProductRepository productRepo;

	@GetMapping("")
	public List<Product> getProducts() {
		List<Product> list = productRepo.findAll();
//		list.add("produit1");
//		list.add("produit2");
//		list.add("produit3");
//		list.add("produit4");
//		list.add("produit5");
		return list;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable int id) {
		Optional<Product> optional = productRepo.findById(id);
		if (optional.isPresent()) {
			return ResponseEntity.ok(optional.get());
		} else {
			return ResponseEntity.notFound().build();
		}

	}

}
