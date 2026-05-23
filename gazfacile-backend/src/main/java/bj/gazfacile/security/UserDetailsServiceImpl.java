package bj.gazfacile.security;

import bj.gazfacile.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Implémentation de UserDetailsService qui charge les utilisateurs par numéro de téléphone.
 */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Charge un utilisateur par son numéro de téléphone.
     * Le téléphone sert d'identifiant unique dans GazFacile.
     *
     * @param telephone le numéro de téléphone de l'utilisateur
     * @throws UsernameNotFoundException si aucun utilisateur trouvé
     */
    @Override
    public UserDetails loadUserByUsername(String telephone) throws UsernameNotFoundException {
        return userRepository.findByTelephone(telephone)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Aucun utilisateur trouvé avec le numéro : " + telephone
                ));
    }
}
