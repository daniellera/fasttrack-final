package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {

	private final TeamService teamService;

	@GetMapping
	public Set<TeamDto> getTeams(){return teamService.getTeams();}

	@GetMapping("/{id}")
	public TeamDto getTeamById(@RequestBody long id){return teamService.getTeamById(id);}

//	@GetMapping("/{company}")
//	public Set<TeamDto> getTeamsByCompany(@RequestBody CompanyDto companyDto){return teamService.getTeamsByCompany(companyDto);}

	@PostMapping
	public TeamDto createTeam(@RequestBody TeamRequestDto teamRequestDto){return teamService.createTeam(teamRequestDto);}

}
