package fr.greta91.boutique3.model;
//package fr.greta91.boutique3.model;
//
//import java.io.Serializable;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.Table;
//
//@Entity
//@Table(name = "produit")
//public class Product implements Serializable {
//
//	/**
//	 * 
//	 */
//	private static final long serialVersionUID = 1L;
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "id_produit")
//	private int productId;
//	@Column(name = "nom")
//	private String productName;
//	@Column(name = "stock")
//	private int stock;
//	@Column(name = "description")
//	private String description;
//	@Column(name = "url_image")
//	private String urlImage;
//	@ManyToOne
//	@JoinColumn(name = "id_categorie")
//	private Category category;
//	@Column(name = "prix_actuel")
//	private Double price;
//
//	public Product() {
//	}
//
//	public Category getCategory() {
//		return category;
//	}
//
//	public void setCategory(Category category) {
//		this.category = category;
//	}
//
//	public int getProductId() {
//		return productId;
//	}
//
//	public void setProductId(int productId) {
//		this.productId = productId;
//	}
//
//	public String getProductName() {
//		return productName;
//	}
//
//	public void setProductName(String productName) {
//		this.productName = productName;
//	}
//
//	public int getStock() {
//		return stock;
//	}
//
//	public void setStock(int stock) {
//		this.stock = stock;
//	}
//
//	public String getDescription() {
//		return description;
//	}
//
//	public void setDescription(String description) {
//		this.description = description;
//	}
//
//	public String getUrlImage() {
//		return urlImage;
//	}
//
//	public void setUrlImage(String urlImage) {
//		this.urlImage = urlImage;
//	}
//
//	public Double getPrice() {
//		return price;
//	}
//
//	public void setPrice(Double price) {
//		this.price = price;
//	}
//
//}
