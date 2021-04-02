package fr.greta91.boutique3.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.greta91.boutique3.model.Category;
import fr.greta91.boutique3.model.Product;
import fr.greta91.boutique3.repos.CategoryRepository;
import fr.greta91.boutique3.repos.ProductRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@CrossOrigin(maxAge = 3600, origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ProductController {
	@Autowired
	ProductRepository productRepo;
	
	@Autowired
	CategoryRepository categoryRepo;
	
	@GetMapping("/public/produits")
	public List<Product> getProduits(@RequestParam(value = "pageNumber", required = false, defaultValue = "0") int pageNumber, 
											@RequestParam(value = "perPage", required = false, defaultValue = "10") int perPage, 
											@RequestParam(value = "searchWord", required = false, defaultValue = "") String searchWord
											){
		Pageable page = PageRequest.of(pageNumber, perPage);
		List<Product> list = null;
		if (searchWord.length() > 0) {
			list = productRepo.findAllByProductNameContainingIgnoreCase(searchWord, page);
		}
		else {
			Page<Product> pageProduit = productRepo.findAll(page);
			list = pageProduit.getContent();
		}
//		List<String> list = new ArrayList<String>();
//		list.add("Produit 1");
//		list.add("Produit 2");
//		list.add("Produit 3");
//		list.add("Produit 4");
		return list;
	}
	
	@PostMapping("/employe/produits/create")
	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
		try {
			Product newProduct = productRepo.save(product);
			return ResponseEntity.ok(newProduct);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/public/count")
	public HashMap<String, Integer> getProduitsCount(@RequestParam(value = "searchWord", required = false, defaultValue = "") String searchWord
			) {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		if (searchWord.length() > 0) {
			map.put("produitsCount", productRepo.getProduitsCountByProductName(searchWord));
		} else {
			map.put("produitsCount", productRepo.getProduitsCount());
		}
		
		return map;
	}

	@GetMapping("/public/produits/{id}")
	public ResponseEntity<Product> getProduit(@PathVariable int id) {
		Optional<Product> optional = productRepo.findById(id);
		if(optional.isPresent()) {
			return ResponseEntity.ok(optional.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/edit")
	public ResponseEntity<Product> editProduct(@RequestBody Product product) {
		try {
			Product newProduct = productRepo.save(product);
			return ResponseEntity.ok(newProduct);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> DeleteProduct(@PathVariable("id") int productId) {
		try {
			productRepo.deleteById(productId);
			return ResponseEntity.ok("OK");
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
}