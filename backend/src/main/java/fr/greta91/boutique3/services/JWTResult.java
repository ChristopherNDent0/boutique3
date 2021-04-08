package fr.greta91.boutique3.services;

import fr.greta91.boutique3.dtos.UserDTO;

//import com.ls.dtos.UserDTO;

public class JWTResult {
	private String login;
	private UserDTO userDTO;
	private boolean ok;

	private JWTResult(String login, UserDTO userDTO, boolean ok) {
		this.login = login;
		this.userDTO = userDTO;
		this.ok = ok;
	}

	public String getLogin() {
		return login;
	}

	public UserDTO getUserDTO() {
		return userDTO;
	}

	public boolean isOk() {
		return ok;
	}

	public boolean isEmploye() {
		return userDTO.getRoles().contains("ROLE_EMPLOYE");
	}

	public boolean isUser() {
		return userDTO.getRoles().contains("ROLE_USER");
	}

	public static JWTResult buildFail() {
		return new JWTResult(null, null, false);
	}

	public static JWTResult buildInfo(String login, UserDTO userDTO) {
		return new JWTResult(login, userDTO, true);
	}
}
