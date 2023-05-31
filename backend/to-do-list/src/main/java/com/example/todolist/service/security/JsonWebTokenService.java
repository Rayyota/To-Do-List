package com.example.todolist.service.security;

import com.example.todolist.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class JsonWebTokenService implements JwtTokenService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final JwtSettings settings;
    private static final String ROLES = "roles";
    private static final String USER_ID = "user_id";

    public JsonWebTokenService(final JwtSettings settings) {
        this.settings = settings;
    }

    @Override
    public String createToken(User user) {
        logger.debug("Generating token for {}", user.getUsername());

        Instant now = Instant.now();

        Claims claims = Jwts.claims()
                .setIssuer(settings.getTokenIssuer())
                .setIssuedAt(Date.from(now))
                .setSubject(user.getUsername())
                .setExpiration(Date.from(now.plus(settings.getTokenExpiredIn())));
        claims.put(ROLES, user.getRoles());
        claims.put(USER_ID, user.getId());

        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, settings.getTokenSigningKey())
                .compact();
    }

    @Override
    @SuppressWarnings("unchecked")
    public UserCredentials parseToken(String token) {
        logger.debug("Parsing token {}", token);

        Jws<Claims> claims = Jwts.parser().setSigningKey(settings.getTokenSigningKey()).parseClaimsJws(token);

        String subject = claims.getBody().getSubject();
        List<String> roles = claims.getBody().get(ROLES, List.class);
        UUID userId = UUID.fromString(claims.getBody().get(USER_ID, String.class));

        return new UserCredentialsImpl(subject, Collections.unmodifiableList(roles),
                userId);
    }

}


