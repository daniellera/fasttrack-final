package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import javax.swing.text.html.Option;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;
    private final CompanyMapper companyMapper;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Override
    public Set<TeamDto> getTeams() {
        Set<Team> teams = new HashSet<Team>(teamRepository.findAll());

        return teamMapper.entitiesToDtos(teams);
    }

    @Override
    public TeamDto getTeamById(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if(team.isEmpty()){

        }
        return teamMapper.entityToDto(team.get());
    }

    @Override
    public TeamDto createTeam(TeamRequestDto teamRequestDto) {

        if(teamRequestDto.getCompany() == null)
            throw new BadRequestException("Company not in request body");
        if(teamRequestDto.getTeammates() == null)
            throw new BadRequestException("Teammates is null");

        Team teamToAdd = teamMapper.requestDtoToEntity(teamRequestDto);
        Optional<Company> company = companyRepository.findById(teamRequestDto.getCompany().getId());

        if(company.isEmpty())
            throw new BadRequestException("Company does not exist");
//        Optional<Company> company = companyRepository.findById(teamRequestDto.getCompanyId());
        teamToAdd.setName(teamRequestDto.getName());
        teamToAdd.setDescription(teamRequestDto.getDescription());
        teamToAdd.setCompany(company.get());

        Set<User> teammates = new HashSet<>();
        Set<BasicUserDto> tempSet = teamRequestDto.getTeammates();
        for(BasicUserDto x: tempSet){
            Optional<User> user = userRepository.findById(x.getId());
            if(user.isEmpty()){

            }else
                teammates.add(user.get());
        }

        teamToAdd.setTeammates(teammates);

        return teamMapper.entityToDto(teamRepository.saveAndFlush(teamToAdd));
    }

    @Override
    public Set<TeamDto> getTeamsByUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty())
            throw new BadRequestException("User with id " + userId + " does not exist");

        return teamMapper.entitiesToDtos(user.get().getTeams());
    }


}
