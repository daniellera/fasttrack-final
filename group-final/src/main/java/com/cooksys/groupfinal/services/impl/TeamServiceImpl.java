package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.TeamRepository;
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

    @Override
    public Set<TeamDto> getTeams() {
        Set<Team> teams = new HashSet<Team>(teamRepository.findAll());

        return teamMapper.entitiesToDtos(teams);
    }

    @Override
    public TeamDto getTeamById(long id) {
        Optional<Team> team = teamRepository.findById(id);
        if(team.isEmpty()){

        }
        return teamMapper.entityToDto(team.get());
    }

    @Override
    public TeamDto createTeam(TeamDto teamDto) {
        Team teamToAdd = teamMapper.DtoToEntity(teamDto);
        teamRepository.saveAndFlush(teamToAdd);
        return teamMapper.entityToDto(teamToAdd);
    }
}
