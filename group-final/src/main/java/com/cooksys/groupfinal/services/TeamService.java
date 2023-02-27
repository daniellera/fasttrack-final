package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.TeamDto;

import java.util.List;
import java.util.Set;

public interface TeamService {

    Set<TeamDto> getTeams();

    TeamDto getTeamById(long id);

    TeamDto createTeam(TeamDto teamDto);
}
