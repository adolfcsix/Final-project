package com.btec.quanlikhohang_api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.logging.Logger;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private static final Logger logger = Logger.getLogger(JwtFilter.class.getName());

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7).trim();

            if (!token.isEmpty()) {
                String username = jwtUtil.extractUsername(token);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    try {
                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                        if (jwtUtil.validateToken(token, userDetails)) {
                            UsernamePasswordAuthenticationToken authentication =
                                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                            // Cách thiết lập SecurityContext mới theo Spring Security 6
                            SecurityContext context = SecurityContextHolder.createEmptyContext();
                            context.setAuthentication(authentication);
                            SecurityContextHolder.setContext(context);
                        }
                    } catch (UsernameNotFoundException e) {
                        logger.warning("User not found: " + e.getMessage());
                    }
                }
            }
        }
        chain.doFilter(request, response);
    }
}
