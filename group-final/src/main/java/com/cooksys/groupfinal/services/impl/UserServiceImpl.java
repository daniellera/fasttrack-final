package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final FullUserMapper fullUserMapper;
	private final CredentialsMapper credentialsMapper;
	
	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	private boolean usernameExists(String username) {
		Optional<User> usernameCheck = userRepository.findByCredentialsUsername(username);
		if(usernameCheck.isPresent()) {
			throw new BadRequestException("The username is already taken. Please chose another and try again.");
		}
		return false;
	}
	
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

	@Override
	public FullUserDto createUser(UserRequestDto userRequestDto) {
		User userToCreate = fullUserMapper.requestDtoToEntity(userRequestDto);
		
		if(usernameExists(userToCreate.getCredentials().getUsername()) != false) {
			throw new BadRequestException("Username is already taken. Please choose another and try again.");
		}

		userToCreate.getCredentials().setUsername(userRequestDto.getCredentials().getUsername());
		userToCreate.getCredentials().setPassword(userRequestDto.getCredentials().getPassword());
		userToCreate.getProfile().setFirstName(userRequestDto.getProfile().getFirstName());
		userToCreate.getProfile().setLastName(userRequestDto.getProfile().getLastName());
		userToCreate.getProfile().setEmail(userRequestDto.getProfile().getEmail());
		userToCreate.getProfile().setPhone(userRequestDto.getProfile().getPhone());
		userToCreate.setActive(true);
		
		if(userRequestDto.isAdmin() == true) {
			userToCreate.setAdmin(userRequestDto.isAdmin());
			userRepository.saveAndFlush(userToCreate);
		} else {
			userToCreate.setAdmin(false);
			userRepository.saveAndFlush(userToCreate);
		}
		
		return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(userToCreate));
		}
			
}
