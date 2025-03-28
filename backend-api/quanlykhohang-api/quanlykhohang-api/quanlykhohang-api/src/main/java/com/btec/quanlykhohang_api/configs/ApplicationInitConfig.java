package com.btec.quanlykhohang_api.configs;

import com.btec.quanlykhohang_api.entities.User;
import com.btec.quanlykhohang_api.enums.Role;
import com.btec.quanlykhohang_api.repositories.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByEmail("admin@gmail.com").isEmpty()){
                        var roles = new HashSet<String>();
                        roles.add(Role.ADMIN.name());

                        User user = User.builder()
                                .email("admin@gmail.com")
                                .password(passwordEncoder.encode("admin"))
                                .roles(roles)
                                .createdAt(LocalDateTime.now())
                                .build();

                        userRepository.save(user);
                        log.warn("Admin user has been created with default password: admin, please change it.");
            }
        };
    }
}
