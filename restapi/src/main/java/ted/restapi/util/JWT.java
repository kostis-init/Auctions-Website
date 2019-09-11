package ted.restapi.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

public class JWT {

    private static String SECRET_KEY = "gfgHYJYukiKUI6746g4TTtrgJYUhGFTyHyuIkikfssssdgfvDWFSedsVEdTZNOuOyqEGhXEbdJI-Z";
    private static long TTL_MILLIS = 1000000;

    public static String createJWT(String username){
        //The JWT signature algorithm we will be using to sign the token
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //We will sign our JWT with our ApiKey secret
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //Let's set the JWT Claims
        JwtBuilder builder = Jwts.builder()
                .setIssuedAt(now)
                .setSubject(username)
                .signWith(signatureAlgorithm, signingKey);

        //expiration
        if (TTL_MILLIS > 0) {
            long expMillis = nowMillis + TTL_MILLIS;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        //Builds the JWT and serializes it to a compact, URL-safe string
        return builder.compact();
    }

    public static String getUsername(String jwt){
        //This line will throw an exception if it is not a signed JWS (as expected)
        Claims claims;
        try{
            claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                    .parseClaimsJws(jwt).getBody();
        }catch(Exception e){
            return null;
        }
        return claims.getSubject();
    }
}
