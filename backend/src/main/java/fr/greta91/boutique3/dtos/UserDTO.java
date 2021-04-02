package fr.greta91.boutique3.dtos;

import java.util.ArrayList;
import java.util.List;

public class UserDTO { //Data Transfer Object
	
	private String username;
	private String nom;
	private String prenom;
	private List<String> roles;
	private String accessToken;
	
	public UserDTO() {
		this.roles = new ArrayList<String>();
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	
	public void addRole(String role) {
		this.roles.add(role);
	}
	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	@Override
	public String toString() {
		return "UserDTO [username=" + username + ", nom=" + nom + ", prenom=" + prenom + ", roles=" + roles + "]";
	}

}

