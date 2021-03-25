package fr.greta91.boutique3.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.greta91.boutique3.model.Category;
import fr.greta91.boutique3.model.Product;
import fr.greta91.boutique3.repos.CategoryRepository;
import fr.greta91.boutique3.repos.ProductRepository;

@CrossOrigin(maxAge = 3600, origins = "http://localhost:3000")
@RestController
@RequestMapping("/categories")
public class CategoryController {
	@Autowired
	CategoryRepository categoryRepo;

	@GetMapping("")
	public List<Category> getCategories() {
		List<Category> list = categoryRepo.findAll();

		return list;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Category> getProduct(@PathVariable int id) {
		Optional<Category> optional = categoryRepo.findById(id);
		if (optional.isPresent()) {
			return ResponseEntity.ok(optional.get());
		} else {
			return ResponseEntity.notFound().build();
		}

	}
//	@PostMapping("/edit")
//	public ResponseEntity<Product> createProduct(@RequestBody Product product){
//		try {
//			Product res = categoryRepo.save(product);
//			return ResponseEntity.ok(res);
//		}
//		catch(Exception ex) {
//			return ResponseEntity.notFound().build();
//		}
//	}
//
//	@DeleteMapping("/edit/{id}")  // A revoir url
//	public ResponseEntity<Product> deleteProduct(@PathVariable int id) {
//		try {
//			Product product = categoryRepo.findById(id).get();
//			if(null != product) {
//				categoryRepo.delete(product);
//				return ResponseEntity.ok(product);
//			}
//			else {
//				return ResponseEntity.notFound().build();
//			}
//		}
//		catch(Exception ex) {
//			System.out.println("In ProductController.deleteProduct(), exception : " + ex); // not sure if needed
//			return ResponseEntity.notFound().build();
//		}
//	}
//	
//	@PutMapping("/edit/{id}") // A revoir url
//	public ResponseEntity<Product> modifyProduct(@PathVariable int id, @RequestBody Product product) {
//		try {
//			Product res = categoryRepo.save(product);
//			return ResponseEntity.ok(res);
//		}
//		catch(Exception ex) {
//			return ResponseEntity.notFound().build();
//		}
//	}

}
