package fr.greta91.boutique3.services;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Map;

//import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import fr.greta91.boutique3.dtos.UserDTO;

//import com.ls.dtos.UserDTO;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {
	private Key secretKey;

//    @Value("${jwt.token.secret}")
//    private String secret;

	private Key getSigningKey() {
	  byte[] keyBytes = Decoders.BASE64.decode("bXktc2VjcmV0LWtleSBteS1zZWNyZXQta2V5IG15LXNlY3JldC1rZXkgbXktc2VjcmV0LWtleSBteS1zZWNyZXQta2V5IG15LXNlY3JldC1rZXkgbXktc2VjcmV0LWtleSBteS1zZWNyZXQta2V5IG15LXNlY3JldC1rZXkgbXktc2VjcmV0LWtleSBteS1zZWNyZXQta2V5");
	  return Keys.hmacShaKeyFor(keyBytes);
	}

	public JwtService() {
		// Les clefs sont créés Ã  chaque lancement...
		//this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
		this.secretKey = getSigningKey();
	}

	/**
	 * Crée un token. 
	 * @param login
	 * @param admin
	 * @return
	 */
	public String getJWT(String login, UserDTO userDTO) {
		return Jwts.builder().setSubject(login).setExpiration(Date.from(Instant.now().plus(60, ChronoUnit.MINUTES)))
				.claim("userDTO", userDTO).signWith(secretKey).compact();
	}

	public JWTResult checkAutorisation(String autorisation) {
		try {
			JwtParser parser = Jwts.parserBuilder().setSigningKey(secretKey).build();
			Jws<Claims> parsed = parser.parseClaimsJws(autorisation);
			System.out.println("body : " +parsed.getBody().toString());
			String login = parsed.getBody().getSubject();
			System.out.println(login);
			System.out.println(parsed.getBody().get("userDTO"));
			Map<String, Object> userMap = (Map<String, Object>)parsed.getBody().get("userDTO");
			UserDTO userDTO = new UserDTO();
			userDTO.setNom((String)userMap.get("nom"));
			userDTO.setPrenom((String)userMap.get("prenom"));
			userDTO.setUsername((String)userMap.get("username"));
			List<String> roles = (List<String>)userMap.get("roles");
			userDTO.setRoles(roles);
//			UserDTO userDTO = parsed.getBody().get("userDTO", UserDTO.class);
			return JWTResult.buildInfo(login, userDTO);
		} catch (Exception e) {
			e.printStackTrace();
			return JWTResult.buildFail();
		}

	}

}

