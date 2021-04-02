package fr.greta91.boutique3.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotNull
	@Column(nullable = false, unique = true, length = 25)
	private String username;
	
	@NotNull
	@Column(nullable = false, length = 255)
	private String password;
	
	@NotNull
	@Column(nullable = false)
	private String nom;
	
	@NotNull
	@Column(nullable = false)
	private String prenom;
	
//	@NotNull
//	@Column(nullable = false, unique = true, length = 255)
//	private String mail;
//	
//	@Column(nullable = true, length = 25)
//	private String telephone;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Role> roles;
	
//	@OneToMany(mappedBy = "user")
//	private Set<Adresse> adresses;
	
	public User() {
		roles = new HashSet<>();
//		adresses = new HashSet<>();
//		adresses.add(new Adresse());
//		adresses.add(new Adresse());
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

//	public String getMail() {
//		return mail;
//	}
//
//	public void setMail(String mail) {
//		this.mail = mail;
//	}
//
//	public String getTelephone() {
//		return telephone;
//	}
//
//	public void setTelephone(String telephone) {
//		this.telephone = telephone;
//	}
	
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
//	public Set<Adresse> getAdresses() {
//		return adresses;
//	}
//
//	public void setAdresses(HashSet<Adresse> adresses) {
//		this.adresses = adresses;
//	}
//	
//	public void addAdresse(Adresse adresse) {
//		this.adresses.add(adresse);
//	}
	
}

