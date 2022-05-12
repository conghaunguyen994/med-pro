package com.haunc.medpro;

import com.haunc.medpro.Models.Doctor;
import com.haunc.medpro.Models.DoctorUserDetails;
import com.haunc.medpro.Repositories.DoctorRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .cors()
                .and()
                .authorizeRequests()
                .antMatchers("/customer/**").permitAll()
                .antMatchers(HttpMethod.POST, "/doctor/login").permitAll()
                .antMatchers(HttpMethod.GET, "/doctor/uploads/avatars/**").permitAll()
                .antMatchers(HttpMethod.GET, "/admin/**").permitAll()
                .anyRequest().authenticated()
                .and();

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}

class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = getJwtFromRequest(request);

        if (StringUtils.hasText(jwt)) {
            try {
                // Xác minh token đúng + chưa hết hạn
                Jwts.parser().setSigningKey("medprovn").parseClaimsJws(jwt);

                // Lấy thông tin từ token
                Claims claims = Jwts.parser()
                        .setSigningKey("medprovn")
                        .parseClaimsJws(jwt)
                        .getBody();

                // Truy vấn database bằng thông tin từ token
                Optional<Doctor> _doctorOptional = doctorRepository.findByUsername(claims.getSubject());

                // Lỗi không tìm thấy trong database
                if (_doctorOptional.isEmpty()) {
                    throw new UsernameNotFoundException("Doctor not found.");
                }

                UserDetails details = new DoctorUserDetails(_doctorOptional.get());

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(details, null, details.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println(details.getUsername());
            } catch (MalformedJwtException ex) {
                System.out.println("Invalid JWT token");
            } catch (ExpiredJwtException ex) {
                System.out.println("Expired JWT token");
            } catch (UnsupportedJwtException ex) {
                System.out.println("Unsupported JWT token");
            } catch (IllegalArgumentException ex) {
                System.out.println("JWT claims string is empty.");
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}